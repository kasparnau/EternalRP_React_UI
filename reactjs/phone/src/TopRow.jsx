import React from "react";
import SignalCellular3BarIcon from "@mui/icons-material/SignalCellular3Bar";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
function TopRow(props) {
  return (
    <div className="TopRow">
      <div
        style={{
          position: "absolute",
          width: "100%",
          top: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            backgroundColor: "black",
          }}
        />
      </div>
      <div className="TopRowLeft">{props.clock}</div>
      <div className="TopRowRight">
        <BatteryFullIcon style={{ marginRight: "8px", fontSize: "20px" }} />
        <SignalCellular3BarIcon style={{ fontSize: "18px" }} />
      </div>
    </div>
  );
}

export default TopRow;
