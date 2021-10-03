import logo from "./logo.svg";
import "./App.css";
import Phone from "./Phone.jsx";
import React from "react";
import { useMainStore } from "./store";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import sendNUI from "./sendNUI";

const IS_PROD = process.env.NODE_ENV === "production";

function App() {
  const [canShow, updateShow] = React.useState(!IS_PROD);

  const { currentPage, setPage } = useMainStore();
  const { setCharacter } = useMainStore();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
    styleOverrides: {
      MuiBackdrop: {
        root: {
          backgroundColor: "rgba(0,0,0,0.2)",
        },
      },
    },
  });

  React.useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.show !== undefined) {
        updateShow(event.data.show);
      }
      if (event.data.character !== undefined) {
        setCharacter(event.data.character);
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        sendNUI("closeNui", {}, () => {});
      }
    });
  }, []);

  return (
    <div className="App" style={{ display: canShow ? "block" : "none" }}>
      {canShow && (
        <ThemeProvider theme={darkTheme}>
          <Phone
            currentPage={currentPage}
            setPage={(page) => {
              setPage(page);
            }}
          />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
