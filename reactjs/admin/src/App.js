import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useMainStore } from "./store";
import sendNUI from "./sendNUI";
import { Button, createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";

import Actions from "./Actions.jsx";
import Players from "./Players.jsx";

const IS_PROD = process.env.NODE_ENV === "production";

const Main = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [canShow, updateShow] = React.useState(!IS_PROD);

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
    <div className="Main">
      <div className="Categories">
        <Button
          className="CategoryButton"
          style={{
            backgroundColor: props.page === "actions" ? "#292929" : "#3e4652",
            color: "white",
            borderRadius: "0px",
          }}
          onClick={() => {
            props.setPage("actions");
          }}
        >
          ACTIONS
        </Button>
        <Button
          className="CategoryButton"
          style={{
            backgroundColor: props.page === "players" ? "#292929" : "#3e4652",
            color: "white",
            borderRadius: "0px",
          }}
          onClick={() => {
            props.setPage("players");
          }}
        >
          PLAYERS
        </Button>
        <Button
          className="CategoryButton"
          style={{
            backgroundColor: props.page === "logs" ? "#292929" : "#3e4652",
            color: "white",
            borderRadius: "0px",
          }}
          onClick={() => {
            props.setPage("logs");
          }}
        >
          LOGS
        </Button>
      </div>
      <div className="Content">
        <Actions NUI={doNuiAction} show={props.page === "actions"} />
        <Players NUI={doNuiAction} show={props.page === "players"} />
        {props.page === "logs" && <div>LOGID</div>}
      </div>
    </div>
  );
};

function App() {
  const [canShow, updateShow] = React.useState(!IS_PROD);
  const { adminLevel, setAdminLevel } = useMainStore();
  const [page, setPage] = React.useState("actions");

  const darkTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  React.useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.show !== undefined) {
        updateShow(event.data.show);
      }
      if (event.data.admin_level !== undefined) {
        setAdminLevel(event.data.admin_level);
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        sendNUI("closeNui", {}, () => {});
      }
    });
  }, []);

  return (
    <div className="App" style={{ display: canShow ? "flex" : "none" }}>
      {adminLevel && (
        <ThemeProvider theme={darkTheme}>
          <Main page={page} setPage={setPage} />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
