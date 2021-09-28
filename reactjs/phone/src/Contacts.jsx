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

function Contacts(props) {
  const [search, setSearch] = React.useState("");

  return (
    <div
      style={{ backgroundColor: "hsla(213, 18%, 12%, 1.0)", height: "100%" }}
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

          <IconButton style={{ marginLeft: "16px" }}>
            <PersonAddAlt1Icon style={{ color: "white" }} fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
