import React from "react";

import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dialog from "@mui/material/Dialog";

import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import makeStyles from "@mui/styles/makeStyles";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

import useStore from "./store";
import { Box } from "@mui/system";

const formatPhoneNumber = (num) => {
  num = num?.toString();
  var formatted = [num?.slice(0, 3), "-", num?.slice(3)].join("");
  return formatted;
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

const AddContactDialog = (props) => {
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");

  const [numberCorrect, setNumberCorrect] = React.useState(false);
  const [nameCorrect, setNameCorrect] = React.useState(false);

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
          Name
        </InputLabel>

        <Input
          autoComplete="off"
          id="standard-adornment-amount"
          value={name}
          onChange={(event) => {
            if (event.target.value.length >= 3) {
              setNameCorrect(true);
            } else {
              setNameCorrect(false);
            }

            setName(event.target.value);
          }}
          startAdornment={
            <InputAdornment position="start">
              <PersonIcon style={{ color: "white" }} />
            </InputAdornment>
          }
        />
      </FormControl>
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
          Phone Number
        </InputLabel>

        <Input
          autoComplete="off"
          id="standard-adornment-amount"
          value={number}
          onChange={(event) => {
            const onlyNums = event.target.value.replace(/[^0-9]/g, "");
            if (onlyNums.length === 7) {
              setNumberCorrect(true);
            } else {
              setNumberCorrect(false);
            }

            setNumber(onlyNums);
          }}
          inputProps={{ maxLength: 7 }}
          startAdornment={
            <InputAdornment position="start">
              <TagIcon style={{ color: "white" }} />
            </InputAdornment>
          }
        />
      </FormControl>
      <div style={{ display: "flex", margin: "8px" }}>
        <Button
          style={{
            width: "50%",
            marginRight: "5px",
            backgroundColor:
              numberCorrect && nameCorrect ? "#259351" : "rgb(19 80 43)",
            color: "white",
          }}
          onClick={() => {
            props.NUI("addContact", { name, number }, true).then(() => {
              props.reloadPage();
            });

            props.openModal(false);
          }}
          disabled={!numberCorrect || !nameCorrect}
        >
          ADD
        </Button>
        <Button
          style={{
            width: "50%",
            marginLeft: "5px",
            backgroundColor: "#a62d2d",
            color: "white",
          }}
          onClick={() => {
            props.openModal(false);
          }}
        >
          CANCEL
        </Button>
      </div>
    </div>
  );
};

const Contact = (props) => {
  const [showButtons, setShowButtons] = React.useState(false);

  const call = () => {};

  const message = () => {};

  const remove = () => {
    props.NUI("removeContact", { id: props.id }).then(() => {
      props.reloadPage();
    });
  };

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(43 60 76)",
        display: "flex",
        flexDirection: "row",
        marginTop: "3px",
        marginBottom: "3px",
        position: "relative",
        borderRadius: "8px",
      }}
      onMouseOver={() => {
        setShowButtons(true);
      }}
      onMouseLeave={() => {
        setShowButtons(false);
      }}
    >
      {showButtons && (
        <div
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            backgroundColor: "#000000b3",
            borderRadius: "8px",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton style={{}} onClick={call}>
            <PhoneIcon style={{ color: "white" }} fontSize="medium" />
          </IconButton>
          <IconButton style={{}} onClick={message}>
            <MessageIcon style={{ color: "white" }} fontSize="medium" />
          </IconButton>
          <IconButton style={{}} onClick={remove}>
            <PersonRemoveIcon style={{ color: "white" }} fontSize="medium" />
          </IconButton>
        </div>
      )}
      <div
        style={{
          width: "30%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AccountCircleIcon style={{ fontSize: "48px" }} />
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.name} ({formatPhoneNumber(props.number)})
        </div>
      </div>
    </div>
  );
};

function Contacts(props) {
  const [search, setSearch] = React.useState("");
  const [modalOpen, openModal] = React.useState(false);
  const { character } = useStore();
  const dialogClasses = useDialogStyles();

  const { NUI } = { ...props };

  const [pageData, setPageData] = React.useState({});

  function reloadPage() {
    NUI(
      "fetchContactsPage",
      {},
      {
        contacts: [
          { id: 1, name: "mingi vend", number: "8717211" },
          { id: 2, name: "mingi vend2", number: "8717212" },
          { id: 3, name: "mingi vend3", number: "8717213" },
          { id: 4, name: "mingi vend4", number: "8717214" },
          { id: 5, name: "mingi vend5", number: "8717215" },
          { id: 6, name: "mingi vend6", number: "8717216" },
          { id: 7, name: "mingi vend7", number: "8717217" },
          { id: 8, name: "mingi vend8", number: "8717218" },
          { id: 9, name: "mingi vend9", number: "8717219" },
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
        backgroundColor: "hsla(213, 18%, 12%, 1.0)",
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

            flexDirection: "row",
          }}
        >
          <div style={{ width: "100%" }}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel
                htmlFor="standard-adornment-amount"
                style={{ color: "white" }}
              >
                Search
              </InputLabel>

              <Input
                id="standard-adornment-amount"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon style={{ color: "white" }} />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

          <IconButton
            style={{ marginLeft: "16px" }}
            onClick={() => {
              openModal(true);
            }}
          >
            <PersonAddAlt1Icon style={{ color: "white" }} fontSize="large" />
          </IconButton>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
          overflowY: "scroll",
          margin: "4px",
        }}
      >
        {pageData?.contacts?.map((contact) => {
          if (
            contact.name.toLowerCase().includes(search.toLowerCase()) ||
            contact.number.toString().includes(search)
          ) {
            return (
              <Contact
                name={contact.name}
                number={contact.number}
                id={contact.id}
                reloadPage={reloadPage}
                NUI={props.NUI}
              />
            );
          }
        })}
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
          <AddContactDialog
            openModal={openModal}
            NUI={props.NUI}
            reloadPage={reloadPage}
          />
        </StyledDialog>
      )}
    </div>
  );
}

export default Contacts;
