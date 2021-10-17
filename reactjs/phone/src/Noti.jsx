import React from "react";
import { Button } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import CallIcon from "@mui/icons-material/Call";
import TwitterIcon from "@mui/icons-material/Twitter";
import { DriveFileRenameOutline } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
export default function Noti(props) {
  const NotiIcon = ({ Icon }) => {
    return (
      <Icon
        fontSize="large"
        style={{
          color: "white",
          height: "90%",
          width: "90%",
          position: "relative",
        }}
      />
    );
  };

  const getNotiBackground = (icon) => {
    switch (icon) {
      case 1: // IMPORTANT
        return "linear-gradient(0deg, rgba(122,30,30,1) 0%, rgba(171,30,30,1) 100%)";
      case 2: // CALL
        return "linear-gradient(0deg, rgba(30,122,53,1) 0%, rgba(30,171,61,1) 100%)";
      case 3: // TWITTER
        return "linear-gradient(0deg, #08a0e9 0%, #0084b4 100%)";
      default:
        return "linear-gradient(0deg, rgba(93,178,251,1) 0%, rgba(63,130,204,1) 100%)";
    }
  };

  const icon = props.icon;

  return (
    <motion.div
      className="Noti"
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      exit={{ y: "-100%" }}
    >
      <div style={{ color: "white", margin: "6px" }}>
        <div className="NotiTopRow">
          <div
            style={{
              backgroundImage: getNotiBackground(icon),
              height: "1vw",
              width: "1vw",
              borderRadius: "3px",
              marginRight: "4px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NotiIcon
              Icon={
                icon === 1
                  ? NotificationImportantIcon
                  : icon === 2
                  ? CallIcon
                  : icon === 3
                  ? TwitterIcon
                  : MoreHorizIcon
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
            }}
          >
            {props.name}
          </div>
        </div>
        <div className="NotiBottomRow">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              fontFamily: "Arial, sans-serif",
              fontSize: "12px",
              marginLeft: "4px",
              marginRight: "4px",
            }}
          >
            {props.description}
            {props.buttons && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {props.buttons.yes && (
                  <div
                    onClick={() => {
                      props.NUI(
                        "notiButton",
                        { value: "yes", id: props.id },
                        true,
                        true
                      );
                    }}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#58a35e",
                      display: "flex",
                      justifyContent: "flex",
                      alignItems: "flex",
                      marginRight: "4px",
                      cursor: "pointer",
                      pointerEvents: "all",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "10px",
                      }}
                    >
                      ✔️
                    </div>
                  </div>
                )}
                {props.buttons.no && (
                  <div
                    onClick={() => {
                      props.NUI("notiButton", { value: "no", id: props.id });
                    }}
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#a57529",
                      display: "flex",
                      justifyContent: "flex",
                      alignItems: "flex",
                      cursor: "pointer",
                      pointerEvents: "all",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "10px",
                      }}
                    >
                      ❌
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
