import React from "react";
import { Button } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

function BottomRow(props) {
  return (
    <div className="BottomRow">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            props.setPage("main");
          }}
          style={{ width: "100%" }}
        >
          <RadioButtonUncheckedIcon style={{ color: "white", width: "100%" }} />
        </Button>
      </div>
    </div>
  );
}

export default BottomRow;
