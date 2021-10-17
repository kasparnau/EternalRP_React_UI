import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import BottomRow from "./BottomRow.jsx";
import TopRow from "./TopRow.jsx";

import MainPage from "./pages/MainPage.jsx";
import Twitter from "./pages/Twitter.jsx";
import Ping from "./pages/Ping.jsx";
import Details from "./pages/Details.jsx";
import Apartments from "./pages/Apartments.jsx";
import Messages from "./pages/Messages.jsx";
import Calls from "./pages/Calls.jsx";
import Garage from "./pages/Garage.jsx";
import Races from "./pages/Races.jsx";
import Mail from "./pages/Mail.jsx";
import Contacts from "./pages/Contacts.jsx";

import background from "./img/wallpaper.webp";

import Spinner from "react-spinners/RotateLoader";
import Noti from "./Noti.jsx";

import sendNUI from "./sendNUI";

function Phone(props) {
  const [loading, setLoading] = React.useState(false);

  async function doNuiAction(action, data, mockAnswer, skipLoading) {
    if (!skipLoading) {
      setLoading(true);
    }

    const result = await sendNUI(action, data, mockAnswer);

    if (!skipLoading) {
      setLoading(false);
    }

    return result;
  }

  const framerVariants = {
    open: { bottom: "1%" },
    closed: { bottom: "-50%" },
  };

  return (
    <motion.div
      className="PhoneHolder"
      initial={{ bottom: "-100%" }}
      transition={{ duration: 0.5 }}
      exit={{ bottom: "-100%" }}
      animate={props.canShow ? "open" : "closed"}
      variants={framerVariants}
    >
      <div
        className="Phone"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "100% 100%",
        }}
      >
        <TopRow clock={props.clock} />
        {loading && (
          <div
            className="AppPage"
            style={{ backgroundColor: "rgb(25, 30, 36)" }}
          >
            <div className="Spinner">
              <Spinner color="white" size={15} loading={loading} />
            </div>
          </div>
        )}

        <div
          className="AppPage"
          style={{ display: !loading ? "block" : "none" }}
        >
          <div className="NotiContainer">
            <AnimatePresence>
              {props.notis &&
                props.notis
                  .slice(0)
                  .reverse()
                  .map((noti) => {
                    return (
                      <Noti
                        name={noti.title}
                        description={noti.desc}
                        buttons={noti.buttons}
                        NUI={doNuiAction}
                        id={noti.id}
                        icon={noti.icon}
                      />
                    );
                  })}
            </AnimatePresence>
          </div>

          {props.currentPage == "main" && (
            <MainPage
              setPage={props.setPage}
              NUI={doNuiAction}
              notiCircles={props.notiCircles}
            />
          )}
          {props.currentPage == "detailid" && <Details NUI={doNuiAction} />}
          {props.currentPage == "twitter" && <Twitter NUI={doNuiAction} />}
          {props.currentPage == "ping" && (
            <Ping NUI={doNuiAction} setPage={props.setPage} />
          )}
          {props.currentPage == "kontaktid" && (
            <Contacts NUI={doNuiAction} setPage={props.setPage} />
          )}
          {props.currentPage == "kinnisvara" && (
            <Apartments NUI={doNuiAction} />
          )}
          {props.currentPage == "sõnumid" && <Messages NUI={doNuiAction} />}
          {props.currentPage == "kõned" && <Calls NUI={doNuiAction} />}
          {props.currentPage == "garaaž" && <Garage NUI={doNuiAction} />}
          {props.currentPage == "rallid" && <Races NUI={doNuiAction} />}
          {props.currentPage == "mail" && <Mail NUI={doNuiAction} />}
        </div>
        <BottomRow setPage={props.setPage} />
      </div>
    </motion.div>
  );
}

export default Phone;
