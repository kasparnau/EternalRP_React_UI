import React from "react";
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

import background from "./img/background.png";

import Spinner from "react-spinners/RotateLoader";

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

  return (
    <div className="PhoneHolder">
      <div
        className="Phone"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "100% 100%",
        }}
      >
        <TopRow />
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
          {props.currentPage == "main" && (
            <MainPage setPage={props.setPage} NUI={doNuiAction} />
          )}
          {props.currentPage == "detailid" && <Details NUI={doNuiAction} />}
          {props.currentPage == "twitter" && <Twitter NUI={doNuiAction} />}
          {props.currentPage == "ping" && <Ping NUI={doNuiAction} />}
          {props.currentPage == "kontaktid" && <Contacts NUI={doNuiAction} />}
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
    </div>
  );
}

export default Phone;
