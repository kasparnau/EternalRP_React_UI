import React from "react";
import "../App.css";
import { useVariableStore } from "../store";

export const Input = (props) => {
  const { inputs, setInput } = useVariableStore();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "4px",
        ...props.style,
      }}
    >
      {props.title}:
      <input
        className="CustomInput"
        style={{}}
        type={props.type}
        value={inputs[props.id]}
        onChange={(e) => {
          setInput(props.id, e.target.value);
        }}
      />
    </div>
  );
};
