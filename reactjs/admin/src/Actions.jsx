import React from "react";
import { useForm } from "react-hook-form";

import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useMainStore } from "./store";
import { styled } from "@mui/system";

const SmallButton = styled(Button)`
  width: 250px;
  color: black;
`;

const ActionButton = (props) => {
  return (
    <SmallButton
      style={{
        marginTop: "8px",
        backgroundColor: "#dedede",
      }}
      onClick={props.onClick}
    >
      {props.text}
    </SmallButton>
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
                padding: "8px",
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
                  padding: "8px",
                  background:
                    "linear-gradient(0deg, rgba(81,96,111,1) 0%, rgba(97,116,134,1) 100%)",
                  color: "white",
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
  const { selectedPlayer, setSelectedPlayer, players } = useMainStore();
  const { plrInputValue, setPlrInputValue } = useMainStore();

  return (
    <div>
      Selected Player:{" "}
      {selectedPlayer
        ? `(${selectedPlayer.source}) [${selectedPlayer.citizen_id}] ${selectedPlayer.character_name} | ${selectedPlayer.display_name} | ${selectedPlayer.hex}`
        : "none"}
      <Autocomplete
        style={{ marginTop: "4px" }}
        options={players}
        getOptionLabel={(option) =>
          `(${option.source}) [${option.citizen_id}] ${option.character_name} | ${option.display_name} | ${option.hex}`
        }
        onChange={(event, value) => {
          setSelectedPlayer(value);
        }}
        onInputChange={(e, newValue) => {
          setPlrInputValue(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Target Player" variant="standard" />
        )}
      />
    </div>
  );
};

const Actions = (props) => {
  const { setPlayers } = useMainStore();
  const reloadPage = () => {
    props
      .NUI("fetchPlayersList", {}, [
        {
          source: 9,
          citizen_id: 3,
          display_name: "Klicer",
          character_name: "Pede Homo",
          phone: "1234567",
          hex: "steam:12345678",
          faction: {
            group: { faction_name: "LSPD" },
            member: { rank_name: "Admin", rank_level: 1000 },
          },
        },
      ])
      .then((resp) => {
        setPlayers(resp);
      });
  };

  React.useEffect(() => {
    reloadPage();
  }, []);

  const { selectedPlayer } = useMainStore();

  const { register, handleSubmit } = useForm();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const { register: register3, handleSubmit: handleSubmit3 } = useForm();
  const { register: register4, handleSubmit: handleSubmit4 } = useForm();
  const { register: register5, handleSubmit: handleSubmit5 } = useForm();
  const { register: register6, handleSubmit: handleSubmit6 } = useForm();

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
        <div style={{ color: "var(--yellow)" }}>Isik peab olema linnas</div>
        <ActionButton
          text="Bring Player"
          onClick={() => {
            if (!selectedPlayer || !selectedPlayer.source) {
              return;
            }
            props.NUI("bringPlayer", { selectedPlayer });
          }}
        />
      </Action>
      <Action level={1} name="Teleport To">
        <SelectedPlayer />
        <div style={{ color: "var(--yellow)" }}>Isik peab olema linnas</div>
        <ActionButton
          text="Teleport To Player"
          onClick={() => {
            if (!selectedPlayer || !selectedPlayer.source) {
              return;
            }
            props.NUI("teleportToPlayer", { selectedPlayer });
          }}
        />
      </Action>
      <Action level={5} name="Unjail">
        <SelectedPlayer />
        <div style={{ color: "var(--yellow)" }}>
          Isik peab olema linnas ja vanglas
        </div>
        <ActionButton
          text="Unjail Player"
          onClick={() => {
            if (!selectedPlayer) {
              return;
            }
            props.NUI("unjailPlayer", { selectedPlayer });
          }}
        />
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
          <input
            type="submit"
            value="GIVE VEHICLE"
            style={{ marginTop: "4px" }}
          />
        </form>
      </Action>
      <Action level={5} name="Give License">
        <SelectedPlayer />
        <form
          autoComplete="off"
          style={{ marginTop: "16px" }}
          onSubmit={handleSubmit5((data) => {
            if (selectedPlayer && selectedPlayer.source) {
              props.NUI("giveLicense", {
                selectedPlayer,
                license: data.license,
              });
            }
          })}
        >
          <div>
            License:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register5("license", {
                required: {
                  value: true,
                  message: "Väli on tühi :/!",
                },
              })}
            />
          </div>
          <input
            type="submit"
            value="GIVE LICENSE"
            style={{ marginTop: "4px" }}
          />
        </form>
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
      <Action level={1} name="Spawn Vehicle">
        <form
          autoComplete="off"
          onSubmit={handleSubmit6((data) => {
            props.NUI("spawnVehicle", {
              model: data.model,
            });
          })}
        >
          <div>
            Model:
            <input
              type="text"
              style={{ marginLeft: "4px" }}
              {...register6("model", {
                required: {
                  value: true,
                  message: "Väli on tühi :/!",
                },
              })}
            />
          </div>
          <input
            type="submit"
            value="SPAWN VEHICLE"
            style={{ marginTop: "4px" }}
          />
        </form>
      </Action>
      <Action level={1} name="Vehicle Actions">
        <div style={{ color: "var(--yellow)" }}>Sa pead istuma sõidukis</div>
        <ActionButton
          text="Give Keys"
          onClick={() => {
            props.NUI("giveKeys");
          }}
        />
        <ActionButton
          text="Fix Vehicle"
          onClick={() => {
            props.NUI("fixVehicle");
          }}
        />
        <ActionButton
          text="Delete Vehicle"
          onClick={() => {
            props.NUI("deleteVehicle");
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
    </div>
  );
};

export default Actions;
