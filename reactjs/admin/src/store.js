import create from "zustand";
const IS_PROD = process.env.NODE_ENV === "production";

let mainStore = (set) => ({
  selectedPlayer: undefined,
  setSelectedPlayer: (player) => set((state) => ({ selectedPlayer: player })),
  adminLevel: !IS_PROD ? 100 : false,
  setAdminLevel: (admin_level) => set((state) => ({ adminLevel: admin_level })),
});

export const useMainStore = create(mainStore);
