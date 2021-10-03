import React from "react";
import { Button, Tooltip } from "@mui/material";

import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import ContactsIcon from "@mui/icons-material/Contacts";
import HomeIcon from "@mui/icons-material/Home";
import SmsIcon from "@mui/icons-material/Sms";
import CallIcon from "@mui/icons-material/Call";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlagIcon from "@mui/icons-material/Flag";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";

import Noti from "../Noti.jsx";

const capitalizeFirst = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

function AppButton(props) {
  return (
    <div>
      <Tooltip followCursor title={capitalizeFirst(props.name)}>
        <div
          onClick={() => {
            props.setPage(props.name);
          }}
          style={{
            backgroundImage: props.gradient,
            margin: "6px",
            width: "58px",
            height: "58px",
            borderRadius: "18px",
            boxShadow: "rgb(0 0 0 / 47%) 0px 2px 2px 1px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          size="large"
        >
          {props.content}
        </div>
      </Tooltip>
    </div>
  );
}

function MainPage(props) {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div className="NotiContainer">
        {/* <Noti
          name="CURRENT"
          description="Deliver the cheetos to the bitch ass nigga (1/5). Deliver the cheetos to the bitch ass nigga (1/5)."
        />
        <Noti
          name="CURRENT"
          description="Deliver the cheetos to the bitch ass nigga (1/5)."
        /> */}
      </div>
      <div className="MainPageButtons">
        <AppButton
          gradient="linear-gradient(#85e5ec, #21aaec)"
          content={<InfoIcon style={{ color: "white", fontSize: "2.5em" }} />}
          name="details"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#17171f, #17171f)"
          content={
            <TwitterIcon style={{ color: "white", fontSize: "2.5em" }} />
          }
          name="twitter"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#395a7c, #091735)"
          content={
            <ContactsIcon style={{ color: "white", fontSize: "2.5em" }} />
          }
          name="contacts"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#5bba96, #137b47)"
          content={<CallIcon style={{ color: "white", fontSize: "2.5em" }} />}
          name="calls"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#87ea65, #05a316)"
          content={<SmsIcon style={{ color: "white", fontSize: "2.5em" }} />}
          name="messages"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#9b17ef, #5b6ff2)"
          content={
            <LocationOnIcon style={{ color: "white", fontSize: "2.5em" }} />
          }
          name="ping"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#21aaec, #85e5ec)"
          content={<MailIcon style={{ color: "white", fontSize: "2.5em" }} />}
          name="mail"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#ff9280, #c54463)"
          content={
            <DirectionsCarIcon style={{ color: "white", fontSize: "2.5em" }} />
          }
          name="garage"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#c06331, #da8a37)"
          content={<FlagIcon style={{ color: "white", fontSize: "2.5em" }} />}
          name="races"
          setPage={props.setPage}
        />
        <AppButton
          gradient="linear-gradient(#7ed48b, #2d6736)"
          content={<HomeIcon style={{ color: "white", fontSize: "2.5em" }} />}
          name="apartments"
          setPage={props.setPage}
        />
      </div>
    </div>
  );
}

export default MainPage;
