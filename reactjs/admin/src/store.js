import { set } from "date-fns";
import create from "zustand";
import { devtools } from "zustand/middleware";

const IS_PROD = process.env.NODE_ENV === "production";

let mainStore = (set) => ({
  selectedPlayer: undefined,
  setSelectedPlayer: (player) => set((state) => ({ selectedPlayer: player })),
  itemList: [],
  setItemList: (itemList) => set((state) => ({ itemList })),
  adminLevel: !IS_PROD ? 100 : false,
  setAdminLevel: (admin_level) => set((state) => ({ adminLevel: admin_level })),
  players: [],
  setPlayers: (players) => set((state) => ({ players })),
  plrInputValue: "",
  setPlrInputValue: (plrInputValue) => set((state) => ({ plrInputValue })),
});

export const useMainStore = create(mainStore);

let variableStore = (set) => ({
  variables: {},
  setVariable: (name, value) =>
    set((state) => ({ variables: { ...state.variables, [name]: value } })),

  inputs: {},
  setInput: (name, value) =>
    set((state) => ({ inputs: { ...state.inputs, [name]: value } })),
});

export const useVariableStore = create(devtools(variableStore));
