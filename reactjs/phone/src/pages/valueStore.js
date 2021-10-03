import create from "zustand";
const IS_PROD = process.env.NODE_ENV === "production";

const useValueStore = create((set) => ({
  contactsValues: {},
  setContactsValue: (name, value) =>
    set((state) => ({ ...state, contactsValues[name]: value })),
}));

export default useValueStore;
