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

const Player = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const { player } = { ...props };

  return (
    <div className="Action">
      <div className="ActionInner">
        <div
          onClick={() => {
            setOpen(!isOpen);
          }}
          style={{
            cursor: "pointer",
            userSelect: "none",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>{`(${player.source}) [${player.citizen_id}] ${player.character_name} | ${player.display_name} | ${player.hex}`}</div>
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
            <div>Phone: {player.phone}</div>
            <div>Faction: {player.faction}</div>
            <ActionButton
              text="SELECT"
              onClick={() => {
                props.setSelectedPlayer(player);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Page = (props) => {
  const { NUI } = { ...props };
  const { selectedPlayer, setSelectedPlayer } = useMainStore();
  const [search, setSearch] = React.useState("");

  const [players, setPlayers] = React.useState(undefined);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const reloadPage = () => {
    setPlayers(undefined);

    NUI("fetchPlayersList", {}, [
      {
        source: 9,
        citizen_id: 3,
        display_name: "Klicer",
        character_name: "Pede Homo",
        phone: "1234567",
        hex: "steam:12345678",
        faction: "LSPD",
      },
    ]).then((resp) => {
      console.log(resp);
      setPlayers(resp);
    });
  };

  React.useEffect(() => {
    reloadPage();
  }, []);

  const onSubmit = (data) => {
    NUI("selectCharacterFromCID", { cid: data.cid }).then((data) => {
      setSelectedPlayer(data);
    });
  };

  return (
    <div
      className="PageContent"
      style={{ display: props.show ? "flex" : "none" }}
    >
      {players !== undefined && (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <div>
            Selected Player:{" "}
            {selectedPlayer
              ? `(${selectedPlayer.source}) [${selectedPlayer.citizen_id}] ${selectedPlayer.character_name} | ${selectedPlayer.display_name} | ${selectedPlayer.hex}`
              : "none"}
          </div>
          <form
            style={{ marginTop: "16px", marginBottom: "8px", display: "flex" }}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            Select From CID:
            <input
              style={{ marginLeft: "4px" }}
              type="number"
              {...register("cid", {
                required: {
                  value: true,
                  message: "CID on tühi :/!",
                },
              })}
            />
            <input type="submit" value="SELECT" style={{ marginLeft: "4px" }} />
            {errors["cid"] && (
              <div style={{ color: "var(--yellow)", marginLeft: "4px" }}>
                {errors["cid"].message}
              </div>
            )}
          </form>

          {players.map((player) => {
            return (
              <Player player={player} setSelectedPlayer={setSelectedPlayer} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
