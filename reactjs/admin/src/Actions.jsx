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

  const { register, handleSubmit } = useForm();
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();
  const { register: register3, handleSubmit: handleSubmit3 } = useForm();
  const { register: register4, handleSubmit: handleSubmit4 } = useForm();

  return (
    <div
      className="PageContent"
      style={{ display: props.show ? "flex" : "none" }}
    >
      <Action level={1} name="Ban">
        <SelectedPlayer />
        <form
          autoComplete="off"
          style={{ marginTop: "16px" }}
          onSubmit={handleSubmit3((data) => {
            if (!data.hours && !data.minutes && !data.days) {
              return;
            }
            if (selectedPlayer) {
              props.NUI("banPlayer", {
                selectedPlayer,
                days: data.days,
                hours: data.hours,
                minutes: data.minutes,
                reason: data.reason,
                secret_reason: data.reason,
              });
            }
          })}
        >
          <div>
            Days:
            <input
              type="number"
              style={{ marginLeft: "4px" }}
              {...register3("days", {})}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            Hours:
            <input
              type="number"
              style={{ marginLeft: "4px" }}
              {...register3("hours", {})}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            Minutes:
            <input
              type="number"
              style={{ marginLeft: "4px" }}
              {...register3("minutes", {})}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            Reason:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register3("reason", {})}
            />
          </div>
          <div style={{ marginTop: "4px" }}>
            Secret Reason:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register3("secret_reason", {})}
            />
          </div>
          <input
            type="submit"
            value="BAN PLAYER"
            style={{ marginTop: "8px" }}
          />
        </form>
      </Action>
      <Action level={1} name="Kick">
        <SelectedPlayer />
        <div style={{ color: "var(--yellow)" }}>Isik peab olema linnas</div>
        <form
          autoComplete="off"
          style={{ marginTop: "16px" }}
          onSubmit={handleSubmit4((data) => {
            if (selectedPlayer && selectedPlayer.source) {
              props.NUI("kickPlayer", {
                selectedPlayer,
                reason: data.reason,
              });
            }
          })}
        >
          <div>
            Reason:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register4("reason", {})}
            />
          </div>
          <input
            type="submit"
            value="KICK PLAYER"
            style={{ marginTop: "8px" }}
          />
        </form>
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
          onSubmit={handleSubmit2((data) => {
            if (selectedPlayer) {
              props.NUI("giveVehicle", {
                selectedPlayer,
                model: data.model,
              });
            }
          })}
        >
          <div>
            Model:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register2("model", {
                required: {
                  value: true,
                  message: "Väli on tühi :/!",
                },
              })}
            />
          </div>
          {/* <div style={{ marginTop: "4px" }}>
            Plate:
            <input
              type="text"
              pattern="[a-zA-Z0-9]+"
              style={{ marginLeft: "4px" }}
              {...register2("plate", {
                required: {
                  value: true,
                },
                minLength: {
                  value: 8,
                  message: "Numbrimärk peab olema 8 tähte",
                },
                maxLength: {
                  value: 8,
                  message: "Numbrimärk peab olema 8 tähte",
                },
              })}
            />
          </div>
          <div> {errors2["plate"] && errors2["plate"].message}</div> */}
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
            if (!selectedPlayer || !selectedPlayer.source) {
              return;
            }
            props.NUI("revivePlayer", { selectedPlayer });
          }}
        />
      </Action>
      <Action level={1} name={`Max Hunger & Thirst`}>
        <SelectedPlayer />
        <div style={{ color: "var(--yellow)" }}>Isik peab olema linnas</div>
        <ActionButton
          text={`Max Hunger & Thirst`}
          onClick={() => {
            if (!selectedPlayer) {
              return;
            }
            props.NUI("maxHungerAndThirst", { selectedPlayer });
          }}
        />
      </Action>
      <Action level={1} name="Clothes Menu">
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
      <Action level={1} name="Barber Menu">
        <SelectedPlayer />
        <div style={{ color: "var(--yellow)" }}>Isik peab olema linnas</div>
        <ActionButton
          text="Open Barber Menu For Player"
          onClick={() => {
            if (!selectedPlayer) {
              return;
            }
            props.NUI("openBarber", { selectedPlayer });
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
