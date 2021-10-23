import logo from "./logo.svg";
import "./App.css";
import Phone from "./Phone.jsx";
import React from "react";
import { useMainStore, resetState } from "./store";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/private-theming";
import sendNUI from "./sendNUI";
import { AnimatePresence } from "framer-motion";

import ringtoneSound from "./sound/ringtone.ogg";

const IS_PROD = process.env.NODE_ENV === "production";

function App() {
  const [canShow, updateShow] = React.useState(!IS_PROD);
  const [notiCircles, setNotiCircles] = React.useState({});
  const [notis, setNotis] = React.useState([
    // {
    //   id: 1,
    //   title: "Noti",
    //   desc: "Random noti accept decline",
    //   buttons: { yes: true, no: true },
    //   icon: 1,
    // },
    // {
    //   id: 2,
    //   title: "other noti",
    //   desc: "ikrfwejnrgfsewjiog",
    // },
  ]);
  const [clock, updateClock] = React.useState("00:00");
  const [hasPhone, setHasPhone] = React.useState(!IS_PROD);

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

  const removeNotiCircle = (app) => {
    setNotiCircles({ ...notiCircles, [app]: undefined });
  };

  const addNotiCircle = (app) => {
    setNotiCircles({ ...notiCircles, [app]: true });
  };

  const removeNoti = (notiId) => {
    setNotis((notis) => {
      let copy = [...notis];

      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === notiId) {
          copy.splice(i, 1);
        }
      }

      return copy;
    });
  };

  const addNoti = (noti) => {
    setNotis((notis) => {
      let copy = [...notis];
      if (copy === undefined) {
        copy = [];
      }
      return [...copy, noti];
    });
  };

  const updateNoti = (noti) => {
    setNotis((notis) => {
      let copy = [...notis];
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].id === noti.id) {
          copy[i] = noti;
          return copy;
        }
      }
    });
  };

  const ringtone = new Audio(ringtoneSound);
  ringtone.loop = true;
  ringtone.volume = 0.015;

  React.useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.show !== undefined) {
        updateShow(event.data.show);
      }
      if (event.data.character !== undefined) {
        setCharacter(event.data.character);
      }
      if (event.data.addNotiCircle !== undefined) {
        addNotiCircle(event.data.addNotiCircle);
      }
      if (event.data.addNoti !== undefined) {
        addNoti(event.data.addNoti);
      }
      if (event.data.removeNoti !== undefined) {
        removeNoti(event.data.removeNoti);
      }
      if (event.data.updateNoti !== undefined) {
        updateNoti(event.data.updateNoti);
      }
      if (event.data.playRingtone !== undefined) {
        if (event.data.playRingtone) {
          ringtone.currentTime = 0;
          ringtone.play();
        } else {
          ringtone.pause();
        }
      }
      if (event.data.clock !== undefined) {
        updateClock(event.data.clock);
      }
      if (event.data.hasPhone !== undefined) {
        setHasPhone(event.data.hasPhone);
      }
      if (event.data.resetData !== undefined) {
        resetState();
      }
    });

    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        sendNUI("closeNui", {}, () => {});
      }
      // if (event.key === "a") {
      //   console.log(JSON.stringify(notis));
      // }
    });
  }, []);

  return (
    <div className="App">
      <AnimatePresence>
        {hasPhone && (canShow || notis.length > 0) && (
          <ThemeProvider theme={darkTheme}>
            <Phone
              notiCircles={notiCircles}
              currentPage={currentPage}
              setPage={(page) => {
                removeNotiCircle(page);
                setPage(page);
              }}
              notis={notis}
              canShow={canShow}
              clock={clock}
            />
          </ThemeProvider>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
