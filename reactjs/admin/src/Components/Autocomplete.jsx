import { Autocomplete, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import "../App.css";
import { useVariableStore } from "../store";

const WhiteTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
      backgroundColor: "white",
    },
  },
})(TextField);

export const AutoInput = (props) => {
  const { inputs, setInput } = useVariableStore();
  const { variables, setVariable } = useVariableStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "4px",
        ...props.style,
      }}
    >
      <Autocomplete
        value={inputs[`${props.id}`]}
        style={{ color: "white" }}
        options={props.options}
        getOptionLabel={(option) => {
          if (props.getOptionLabel) {
            return props.getOptionLabel(option);
          } else {
            return option;
          }
        }}
        onChange={(event, value) => {
          setInput(`${props.id}`, value);
        }}
        onInputChange={(e, newValue) => {
          setInput(`inner_${props.id}`, newValue);
        }}
        renderInput={(params) => (
          <WhiteTextField
            {...params}
            label={props.label}
            variant="outlined"
            size="small"
          />
        )}
      />
    </div>
  );
};
