import React from "react";
import {
  Button,
  FilledInput,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import ping from "../img/ping.png";
import { usePingStore } from "../store";

function Ping(props) {
  const { NUI } = { ...props };
  const { target, setTarget } = usePingStore();
  const { canSend, setCanSend } = usePingStore();

  async function sendTarget() {
    setTarget("");
    NUI("sendPing", {}, true).then((resp) => {});
  }

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          height: "100%",
          backgroundImage: `url(${ping})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div style={{ width: "100%" }}>
            <FormControl
              style={{
                width: "90%",
                marginBottom: "8px",
                backgroundColor: "hsla(213, 18%, 12%, 0.992)",
              }}
              variant="filled"
            >
              <InputLabel
                htmlFor="filled-adornment-amount"
                style={{ color: "white" }}
              >
                Target ID
              </InputLabel>
              <FilledInput
                value={target}
                inputProps={{ maxLength: 5 }}
                onChange={(event) => {
                  const onlyNums = event.target.value.replace(/[^0-9]/g, "");

                  if (onlyNums.length > 0) {
                    setCanSend(true);
                  } else {
                    setCanSend(false);
                  }

                  setTarget(onlyNums);
                }}
                style={{ color: "white" }}
              />
            </FormControl>

            <Button
              style={{
                backgroundColor: "hsla(213, 18%, 12%, 0.992)",
                color: canSend ? "white" : "rgb(255 255 255 / 30%)",
                width: "90%",
                fontWeight: "700",
              }}
              onClick={sendTarget}
              disabled={!canSend}
            >
              SEND PING
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ping;
