import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import useStore from "./store";
import { Fade, Tooltip } from "@mui/material";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Details(props) {
  const { character } = useStore();

  const formatPhoneNumber = (num) => {
    num = num?.toString();
    var formatted = [num?.slice(0, 3), "-", num?.slice(3)].join("");
    return formatted;
  };

  return (
    <div
      style={{
        backgroundColor: "hsla(213, 18%, 12%, 1.0)",
        height: "100%",
        width: "100%",
        color: "white",
      }}
    >
      <div style={{ padding: "8px" }}>
        <Tooltip followCursor title="Citizen ID">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <PersonIcon style={{ color: "white" }} fontSize="large" />
            </div>
            <div style={{ textAlign: "left", paddingLeft: "8px" }}>
              {character?.cid}
            </div>
          </div>
        </Tooltip>
        <Tooltip followCursor title="Phone Number">
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <PhoneIphoneIcon style={{ color: "white" }} fontSize="large" />
            </div>
            <div style={{ textAlign: "left", paddingLeft: "8px" }}>
              {formatPhoneNumber(character?.phone_number)}
            </div>
          </div>
        </Tooltip>
        <Tooltip followCursor title="Bank Account ID">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <AccountBalanceIcon style={{ color: "white" }} fontSize="large" />
            </div>
            <div style={{ textAlign: "left", paddingLeft: "8px" }}>
              {character.bank?.account_id}
            </div>
          </div>
        </Tooltip>
        <Tooltip followCursor title="Bank Account Balance">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <SavingsIcon style={{ color: "white" }} fontSize="large" />
            </div>
            <div style={{ textAlign: "left", paddingLeft: "8px" }}>
              {formatter.format(character.bank?.account_balance)}
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

export default Details;
