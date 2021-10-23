import { create, reset } from "./zustandWrapper";
const IS_PROD = process.env.NODE_ENV === "production";

const debugCharacter = {
  bank: { account_id: 145, account_balance: 91635 },
  phone_number: 4598672,
  cid: 1694,
  licenses: [{ name: "Drivers License" }, { name: "Hunting License" }],
};

let mainStore = (set) => ({
  character: IS_PROD ? {} : debugCharacter,
  setCharacter: (pCharacter) => set((state) => ({ character: pCharacter })),

  currentPage: "main",
  setPage: (name) => set((state) => ({ currentPage: name })),
});

export const useMainStore = create(mainStore);

let contactsStore = (set) => ({
  contacts: undefined,
  setContacts: (contacts) => set((state) => ({ contacts })),
  search: "",
  setSearch: (value) => set((state) => ({ search: value })),

  modalOpen: false,
  openModal: (value) => set((state) => ({ modalOpen: value })),

  numberCorrect: false,
  setNumberCorrect: (value) => set((state) => ({ numberCorrect: value })),
  nameCorrect: false,
  setNameCorrect: (value) => set((state) => ({ nameCorrect: value })),
  name: "",
  setName: (value) => set((state) => ({ name: value })),
  number: "",
  setNumber: (value) => set((state) => ({ number: value })),
});

export const useContactsStore = create(contactsStore);

let twitterStore = (set) => ({
  pageData: [],
  setPageData: (data) => set((state) => ({ pageData: data })),

  modalOpen: false,
  openModal: (value) => set((state) => ({ modalOpen: value })),

  text: "",
  setText: (value) => set((state) => ({ text: value })),

  textCorrect: false,
  setTextCorrect: (value) => set((state) => ({ textCorrect: value })),
});

export const useTwitterStore = create(twitterStore);

let pingStore = (set) => ({
  target: "",
  setTarget: (value) => set((state) => ({ target: value })),

  canSend: false,
  setCanSend: (value) => set((state) => ({ canSend: value })),
});

export const usePingStore = create(pingStore);

let detailsStore = (set) => ({
  pageData: {},
  setPageData: (pageData) => set((state) => ({ pageData })),
});

export const useDetailsStore = create(detailsStore);

export const resetState = () => {
  reset();
};
