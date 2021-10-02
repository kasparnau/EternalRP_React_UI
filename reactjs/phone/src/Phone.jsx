import React from "react";
import MainPage from "./MainPage.jsx";
import BottomRow from "./BottomRow.jsx";
import TopRow from "./TopRow.jsx";

import Twitter from "./Twitter.jsx";
import Ping from "./Ping.jsx";
import Details from "./Details.jsx";

import background from "./img/background.png";
import Contacts from "./Contacts.jsx";

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
          {props.currentPage == "details" && <Details NUI={doNuiAction} />}
          {props.currentPage == "twitter" && <Twitter NUI={doNuiAction} />}
          {props.currentPage == "ping" && <Ping NUI={doNuiAction} />}
          {props.currentPage == "contacts" && <Contacts NUI={doNuiAction} />}
        </div>
        <BottomRow setPage={props.setPage} />
      </div>
    </div>
  );
}

export default Phone;
