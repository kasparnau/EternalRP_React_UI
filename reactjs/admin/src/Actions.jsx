import { Button } from "@mui/material";
import React from "react";
import { useMainStore } from "./store";
import { useForm } from "react-hook-form";

const ActionButton = (props) => {
  return (
    <Button
      style={{
        color: "white",
        backgroundColor: "var(--success)",
        marginTop: "8px",
      }}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

const Action = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const { adminLevel } = useMainStore();

  return (
    <React.Fragment>
      {adminLevel >= props.level && (
        <div className="Action">
          <div className="ActionInner">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={() => {
                setOpen(!isOpen);
              }}
            >
              <div>{props.name}</div>
              <div>{isOpen ? `👇` : `👆`}</div>
            </div>
            {isOpen && (
              <div
                style={{
                  paddingTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {props.children}
              </div>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const SelectedPlayer = () => {
  const { selectedPlayer } = useMainStore();

  return (
    <div>
      Selected Player:{" "}
      {selectedPlayer
        ? `(${selectedPlayer.source}) [${selectedPlayer.citizen_id}] ${selectedPlayer.character_name} | ${selectedPlayer.display_name} | ${selectedPlayer.hex}`
        : "none"}
    </div>
  );
};

const Actions = (props) => {
  const { selectedPlayer } = useMainStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div
      className="PageContent"
      style={{ display: props.show ? "flex" : "none" }}
    >
      <Action level={1} name="Ban">
        <SelectedPlayer />
      </Action>
      <Action level={1} name="Kick">
        <SelectedPlayer />
      </Action>
      <Action level={1} name="Warn">
        <SelectedPlayer />
      </Action>
      <Action level={1} name="Warnings">
        <SelectedPlayer />
      </Action>
      <Action level={1} name="Slay">
        <SelectedPlayer />
      </Action>

      <Action level={1} name="Bring">
        <SelectedPlayer />
      </Action>
      <Action level={1} name="Teleport To">
        <SelectedPlayer />
      </Action>

      <Action level={5} name="Give Property">
        <SelectedPlayer />
      </Action>
      <Action level={5} name="Give Vehicle">
        <SelectedPlayer />
        <form
          autoComplete="off"
          style={{ marginTop: "16px" }}
          onSubmit={handleSubmit((data) => {
            if (selectedPlayer) {
              props.NUI("giveVehicle", {
                selectedPlayer,
                model: data.model,
                plate: data.plate,
              });
            }
          })}
        >
          <div>
            Model:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register("model", {
                required: {
                  value: true,
                  message: "Väli on tühi :/!",
                },
              })}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            Plate:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register("plate", {
                required: {
                  value: true,
                  message: "Väli on tühi :/!",
                },
              })}
            />
          </div>
          <input
            type="submit"
            value="GIVE VEHICLE"
            style={{ marginTop: "4px" }}
          />
        </form>
      </Action>
      <Action level={5} name="Give License">
        <SelectedPlayer />
      </Action>
      <Action level={5} name="Give Item">
        <SelectedPlayer />
        <div style={{ color: "var(--yellow)" }}>Isik peab olema linnas</div>
        <form
          autoComplete="off"
          style={{ marginTop: "16px" }}
          onSubmit={handleSubmit((data) => {
            if (selectedPlayer && selectedPlayer.source) {
              props.NUI("giveItem", {
                selectedPlayer,
                amount: data.amount,
                itemId: data.item_id,
              });
            }
          })}
        >
          <div>
            Item ID:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register("item_id", {
                required: {
                  value: true,
                  message: "Väli on tühi :/!",
                },
              })}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            Amount:
            <input
              type="number"
              style={{ marginLeft: "4px" }}
              {...register("amount", {
                required: {
                  value: true,
                  message: "Väli on tühi :/!",
                },
                max: {
                  value: 100000,
                  message: "Max 100000",
                },
              })}
            />
          </div>
          <input type="submit" value="GIVE ITEM" style={{ marginTop: "4px" }} />
        </form>
      </Action>
      <Action level={5} name="Open Inventory">
        <SelectedPlayer />
        <ActionButton
          text="Open Player Inventory"
          onClick={() => {
            if (!selectedPlayer) {
              return;
            }
            props.NUI("closeNui", {}, () => {});
            props.NUI("openInventory", { selectedPlayer });
          }}
        />
      </Action>

      <Action level={1} name="Revive Player">
        <SelectedPlayer />
        <div style={{ color: "var(--yellow)" }}>Isik peab olema linnas</div>
        <ActionButton
          text="Revive"
          onClick={() => {
            if (!selectedPlayer) {
              return;
            }
            props.NUI("revive", { selectedPlayer });
          }}
        />
      </Action>
      <Action level={1} name="Hunger / Thirst Max">
        <SelectedPlayer />
      </Action>
      <Action level={1} name="Clothes">
        <SelectedPlayer />
        <div style={{ color: "var(--yellow)" }}>Isik peab olema linnas</div>
        <ActionButton
          text="Open Clothes Menu For Player"
          onClick={() => {
            if (!selectedPlayer) {
              return;
            }
            props.NUI("openClothes", { selectedPlayer });
          }}
        />
      </Action>
      <Action level={1} name="Fix Vehicle">
        <div style={{ color: "var(--yellow)" }}>Sa pead olema autos</div>
      </Action>
    </div>
  );
};

export default Actions;
