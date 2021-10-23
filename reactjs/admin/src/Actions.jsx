import React from "react";
import { useForm } from "react-hook-form";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Input } from "./Components/Input";
import { AutoInput } from "./Components/Autocomplete";

import { useMainStore, useVariableStore } from "./store";
import { styled } from "@mui/system";
import { withStyles } from "@mui/styles";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SmallButton = styled(Button)`
  width: 300px;
  color: black;
`;

const WhiteTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
      backgroundColor: "white",
    },
  },
})(TextField);

const Disclaimer = (props) => {
  const disclaimers = {
    1: "Isik peab olema linnas!",
    2: "Sa pead istuma sõidukis",
  };
  return (
    <div style={{ color: "var(--yellow)", marginBottom: "8px" }}>
      {disclaimers[props.id] || props.text}
    </div>
  );
};

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
  const { binds } = useMainStore();

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
                position: "relative",
                alignItems: "center",
              }}
              onClick={() => {
                if (!props.event) {
                  setOpen(!isOpen);
                } else {
                  props.NUI(props.event);
                }
              }}
            >
              <div>{props.name}</div>
              <div
                style={{
                  position: "absolute",
                  right: "1%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!props.event ? (
                  isOpen ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )
                ) : (
                  ""
                )}
              </div>
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
  const { players } = useMainStore();

  return (
    <div>
      {/* Selected Player:{" "} */}
      {/* {selectedPlayer
        ? `(${selectedPlayer.source}) [${selectedPlayer.citizen_id}] ${selectedPlayer.character_name} | ${selectedPlayer.display_name} | ${selectedPlayer.hex}`
        : "none"} */}
      {/* <Autocomplete
        value={selectedPlayer}
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
          <WhiteTextField
            {...params}
            label="Select Target"
            variant="outlined"
            size="small"
          />
        )}
      /> */}
      <AutoInput
        label="Select Target"
        id={"selectedPlayer"}
        options={players}
        getOptionLabel={(option) => {
          return `(${option.source}) [${option.citizen_id}] ${option.character_name} | ${option.display_name} | ${option.hex}`;
        }}
      />
    </div>
  );
};

const Actions = (props) => {
  const { setPlayers } = useMainStore();
  const { binds, setBinds, setBind } = useMainStore();
  const { selectedPlayer, itemList } = useMainStore();
  // const { setSelectedWeather, setWeatherInputValue } = useVariableStore();
  const { variables, setVariable } = useVariableStore();
  const { inputs, setInput } = useVariableStore();

  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const { register: register5, handleSubmit: handleSubmit5 } = useForm();

  const reloadPage = () => {
    let storedBinds = window.localStorage.getItem("binds");
    if (storedBinds) {
      setBinds(JSON.parse(storedBinds));
    }

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

  return (
    <div
      className="PageContent"
      style={{ display: props.show ? "flex" : "none" }}
    >
      <Action level={1} name="Ban">
        <SelectedPlayer />
        <Input title="Days" id={"banPlayer_days"} type="number" />
        <Input title="Hours" id={"banPlayer_hours"} type="number" />
        <Input title="Minutes" id={"banPlayer_minutes"} type="number" />
        <Input title="Reason" id={"banPlayer_reason"} />
        <Input title="Secret Reason" id={"banPlayer_secretReason"} />

        <ActionButton
          text="Ban Player"
          onClick={() => {
            if (
              !inputs.banPlayer_days &&
              !inputs.banPlayer_minutes &&
              !inputs.banPlayer_hours
            ) {
              return;
            }
            if (inputs.selectedPlayer) {
              props.NUI("banPlayer", {
                selectedPlayer: inputs.selectedPlayer,
                days: inputs.banPlayer_days,
                hours: inputs.banPlayer_hours,
                minutes: inputs.banPlayer_minutes,
                reason: inputs.banPlayer_reason,
                secret_reason: inputs.banPlayer_secretReason,
              });
            }
          }}
        />
        {/* <form
          autoComplete="off"
          style={{ marginTop: "16px" }}
          onSubmit={handleSubmit3((data) => {
            if (!data.hours && !data.minutes && !data.days) {
              return;
            }
            if (inputs.selectedPlayer) {
              props.NUI("banPlayer", {
                selectedPlayer: inputs.selectedPlayer,
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
        </form> */}
      </Action>
      <Action level={1} name="Kick">
        <Disclaimer id={1} />
        <SelectedPlayer />
        <Input title="Reason" id={"kickPlayer_reason"} />
        <ActionButton
          text="Kick Player"
          onClick={() => {
            if (!inputs.selectedPlayer || !inputs.selectedPlayer.source) {
              return;
            }
            props.NUI("kickPlayer", {
              selectedPlayer: inputs.selectedPlayer,
              reason: inputs.kickPlayer_reason || "",
            });
          }}
        />
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
        <Disclaimer id={1} />
        <SelectedPlayer />
        <ActionButton
          text="Bring Player"
          onClick={() => {
            if (!inputs.selectedPlayer || !inputs.selectedPlayer.source) {
              return;
            }
            props.NUI("bringPlayer", { selectedPlayer: inputs.selectedPlayer });
          }}
        />
      </Action>
      <Action level={1} name="Teleport To Player">
        <Disclaimer id={1} />
        <SelectedPlayer />
        <ActionButton
          text="Teleport To Player"
          onClick={() => {
            if (!inputs.selectedPlayer || !inputs.selectedPlayer.source) {
              return;
            }
            props.NUI("teleportToPlayer", {
              selectedPlayer: inputs.selectedPlayer,
            });
          }}
        />
      </Action>
      <Action level={1} name="Teleport To Coords">
        <Input title="X" id={"teleportToCoords_X"} type={"number"} />
        <Input title="Y" id={"teleportToCoords_Y"} type={"number"} />
        <Input title="Z" id={"teleportToCoords_Z"} type={"number"} />
        <ActionButton
          text="Teleport To Coords"
          onClick={() => {
            if (
              !inputs.teleportToCoords_X ||
              !inputs.teleportToCoords_Y ||
              !inputs.teleportToCoords_Z
            ) {
              return;
            }

            props.NUI("teleportToCoords", {
              x: inputs.teleportToCoords_X,
              y: inputs.teleportToCoords_Y,
              z: inputs.teleportToCoords_Z,
            });
          }}
        />
      </Action>
      <Action
        level={1}
        name="Teleport To Marker"
        event="teleportToMarker"
        NUI={props.NUI}
      />
      <Action
        level={1}
        name="Toggle Player Blips"
        event="playerBlips"
        NUI={props.NUI}
      />
      <Action level={1} name="Toggle Noclip" event="noclip" NUI={props.NUI} />
      <Action level={5} name="Unjail">
        <div style={{ color: "var(--yellow)" }}>
          Isik peab olema linnas ja vanglas
        </div>

        <SelectedPlayer />
        <ActionButton
          text="Unjail Player"
          onClick={() => {
            if (!inputs.selectedPlayer) {
              return;
            }
            props.NUI("unjailPlayer", {
              selectedPlayer: inputs.selectedPlayer,
            });
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
            if (inputs.selectedPlayer) {
              props.NUI("giveVehicle", {
                selectedPlayer: inputs.selectedPlayer,
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
            if (inputs.selectedPlayer) {
              props.NUI("giveLicense", {
                selectedPlayer: inputs.selectedPlayer,
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
        <Disclaimer id={1} />
        <SelectedPlayer />
        <AutoInput
          label="Item ID"
          id={"giveItem_itemId"}
          options={itemList}
          getOptionLabel={(option) => {
            return `${option.itemId} [${option.label}]`;
          }}
        />
        <Input title="Amount" id={"giveItem_amount"} type={"number"} />
        <ActionButton
          text="Give Item"
          onClick={() => {
            if (
              !inputs.selectedPlayer ||
              !inputs["giveItem_amount"] ||
              !inputs["giveItem_itemId"]
            ) {
              return;
            }

            props.NUI("giveItem", {
              selectedPlayer: inputs.selectedPlayer,
              amount: inputs["giveItem_amount"],
              itemId: inputs["giveItem_itemId"]?.itemId,
            });
          }}
        />
      </Action>
      <Action level={5} name="Open Inventory">
        <SelectedPlayer />
        <ActionButton
          text="Open Player Inventory"
          onClick={() => {
            if (!inputs.selectedPlayer) {
              return;
            }
            props.NUI("closeNui", {}, () => {});
            props.NUI("openInventory", {
              selectedPlayer: inputs.selectedPlayer,
            });
          }}
        />
      </Action>
      <Action level={1} name="Spawn Vehicle">
        <Input title="Model" id={"spawnVehicle_model"} />
        <ActionButton
          text="Spawn Vehicle"
          onClick={() => {
            if (!inputs["spawnVehicle_model"]) {
              return;
            }

            props.NUI("spawnVehicle", {
              model: inputs["spawnVehicle_model"],
            });
          }}
        />
      </Action>
      <Action level={1} name="Vehicle Actions">
        <Disclaimer id={2} />
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
      <Action level={1} name="Vehicle Data">
        <div style={{ color: "var(--yellow)" }}>Sa pead istuma sõidukis</div>
        <ActionButton
          text="Get Vehicle Data"
          onClick={() => {
            props.NUI("getVehicleData");
          }}
        />
      </Action>
      <Action level={1} name={`Weather / Time`}>
        <div>
          <AutoInput
            label="New Weather"
            id={"selectedWeather"}
            options={[
              "BLIZZARD",
              "CLEAR",
              "CLEARING",
              "CLOUDS",
              "EXTRASUNNY",
              "FOGGY",
              "HALLOWEEN",
              "OVERCAST",
              "RAIN",
              "SMOG",
              "SNOWLIGHT",
              "THUNDER",
              "XMAS",
            ]}
          />
          <ActionButton
            text="Set Weather"
            onClick={() => {
              console.log(1);
              if (!inputs.selectedWeather) {
                return;
              }
              console.log(2);
              props.NUI("setWeather", { weather: inputs.selectedWeather });
            }}
          />
        </div>
        <Input
          title="Hours"
          id={"time_hours"}
          type={"number"}
          style={{ marginTop: "24px" }}
        />
        <ActionButton
          text="Set Time"
          onClick={() => {
            if (!inputs.time_hours) return;

            props.NUI("setTime", {
              hours: inputs.time_hours,
              minutes: inputs.time_minutes,
            });
          }}
        />
      </Action>
      <Action level={1} name="Revive Player">
        <Disclaimer id={1} />
        <SelectedPlayer />
        <ActionButton
          text="Revive"
          onClick={() => {
            if (!inputs.selectedPlayer || !inputs.selectedPlayer.source) {
              return;
            }
            props.NUI("revivePlayer", {
              selectedPlayer: inputs.selectedPlayer,
            });
          }}
        />
      </Action>
      <Action
        level={1}
        name="Revive Nearest"
        event="reviveNearest"
        NUI={props.NUI}
      />
      <Action level={1} name={`Max Hunger & Thirst`}>
        <Disclaimer id={1} />
        <SelectedPlayer />
        <ActionButton
          text={`Max Hunger & Thirst`}
          onClick={() => {
            if (!inputs.selectedPlayer) {
              return;
            }
            props.NUI("maxHungerAndThirst", {
              selectedPlayer: inputs.selectedPlayer,
            });
          }}
        />
      </Action>
      <Action level={1} name="Clothes Menu">
        <Disclaimer id={1} />
        <SelectedPlayer />
        <ActionButton
          text="Open Clothes Menu For Player"
          onClick={() => {
            if (!inputs.selectedPlayer) {
              return;
            }
            props.NUI("openClothes", { selectedPlayer: inputs.selectedPlayer });
          }}
        />
      </Action>
      <Action level={1} name="Barber Menu">
        <Disclaimer id={1} />
        <SelectedPlayer />
        <ActionButton
          text="Open Barber Menu For Player"
          onClick={() => {
            if (!inputs.selectedPlayer) {
              return;
            }
            props.NUI("openBarber", { selectedPlayer: inputs.selectedPlayer });
          }}
        />
      </Action>
    </div>
  );
};

export default Actions;
