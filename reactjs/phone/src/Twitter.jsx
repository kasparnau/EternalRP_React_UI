import React from "react";
import {
  Button,
  Dialog,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { styled } from "@mui/system";

const Tweet = (props) => {
  const tweet = props.tweet;
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        backgroundColor: "#205797",
        marginTop: "8px",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ height: "100%", margin: "6px" }}>
        <div style={{ width: "100%", textAlign: "left" }}>{tweet.poster}</div>
        <div
          style={{
            width: "100%",
            textAlign: "left",
            marginTop: "4px",
            overflowWrap: "anywhere",
          }}
        >
          {tweet.text}
        </div>
        <div style={{ width: "100%", textAlign: "right", marginTop: "4px" }}>
          {formatDistanceToNow(new Date(tweet.date * 1000), new Date(), {
            includeSeconds: true,
          })}{" "}
          ago
        </div>
      </div>
    </div>
  );
};

const useDialogStyles = makeStyles({
  root: {
    position: "absolute",
    "& .MuiPaper-root": {
      margin: "16px",
      width: "100%",
    },
  },
  backdrop: {
    position: "absolute",
  },
});

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: #23374e;
    color: white;
  }
`;

const AddTweetModal = (props) => {
  const [text, setText] = React.useState("");
  const [textCorrect, setTextCorrect] = React.useState(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormControl
        style={{ width: "90%" }}
        fullWidth
        sx={{ m: 1 }}
        variant="standard"
      >
        <InputLabel
          htmlFor="standard-adornment-amount"
          style={{ color: "white" }}
        >
          Tweet ({text.length}/225)
        </InputLabel>

        <Input
          autoComplete="off"
          id="standard-adornment-amount"
          value={text}
          inputProps={{ maxLength: 225 }}
          multiline
          onChange={(event) => {
            if (event.target.value.length > 0) {
              setTextCorrect(true);
            } else {
              setTextCorrect(false);
            }

            setText(event.target.value);
          }}
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
      </FormControl>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            width: "50%",
            marginRight: "5px",
            backgroundColor: textCorrect ? "#259351" : "rgb(19 80 43)",
            color: "white",
            margin: "8px",
          }}
          onClick={() => {
            props.NUI("addTweet", { text }, true).then(() => {
              props.reloadPage();
            });

            props.openModal(false);
          }}
          disabled={!textCorrect}
        >
          TWEET
        </Button>
      </div>
    </div>
  );
};

function Twitter(props) {
  const { NUI } = { ...props };
  const [pageData, setPageData] = React.useState({});
  const dialogClasses = useDialogStyles();
  const [modalOpen, openModal] = React.useState(false);

  function reloadPage() {
    NUI(
      "fetchTwitterPage",
      {},
      {
        tweets: [
          {
            date: 1633150100,
            text: "Test tweettrhfgkjrtfheojrfhenjirfswngrfsjs",
            poster: "@Random_Taun",
          },
          { date: 1633190512, text: "Test tweet3", poster: "@Random_Taun" },
          { date: 1633190616, text: "Test tweet4", poster: "@Random_Taun" },
          { date: 1633190482, text: "Test tweet", poster: "@Random_Taun" },
          { date: 1633190933, text: "Test tweet3", poster: "@Random_Taun" },
          { date: 1633190160, text: "Test tweet4", poster: "@Random_Taun" },
          { date: 1633190464, text: "Test tweet", poster: "@Random_Taun" },
          { date: 1633190617, text: "Test tweet3", poster: "@Random_Taun" },
          { date: 1633194911, text: "Test tweet4", poster: "@Random_Taun" },
        ],
      }
    ).then((resp) => {
      setPageData(resp);
    });
  }

  React.useEffect(() => {
    reloadPage();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#212731",
        height: "100%",
        color: "white",

        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <IconButton
            style={{ marginLeft: "16px" }}
            onClick={() => {
              openModal(true);
            }}
          >
            <AddCircleIcon style={{ color: "white" }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          height: "100%",
          overflowY: "scroll",
          margin: "8px",
        }}
      >
        {pageData?.tweets?.map((tweet) => (
          <Tweet tweet={tweet} />
        ))}
      </div>
      {modalOpen && (
        <StyledDialog
          disableAutoFocus //disables rescrolling the window when the dialog is opened
          disableEnforceFocus //allows user to interact outside the dialog
          disableScrollLock //prevents the div from shrinking to make room for a scrollbar
          disablePortal
          onClose={() => {
            openModal(false);
          }}
          open={modalOpen}
          fullWidth
          className={dialogClasses.root}
          classes={{
            root: dialogClasses.root,
          }}
          BackdropProps={{
            classes: { root: dialogClasses.backdrop },
          }}
          style={{ position: "absolute" }}
        >
          <AddTweetModal
            openModal={openModal}
            NUI={props.NUI}
            reloadPage={reloadPage}
          />
        </StyledDialog>
      )}
    </div>
  );
}

export default Twitter;
