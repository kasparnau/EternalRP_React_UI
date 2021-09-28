import create from 'zustand'
const IS_PROD = process.env.NODE_ENV === 'production'

const debugCharacter = {
    bank: {account_id: 145, account_balance: 91635},
    phone_number: 4598672,
    cid: 1694
}

const useStore = create((set) => ({
    character: IS_PROD ? {} : debugCharacter,
    setCharacter: (pCharacter) =>
        set((state) => ({character: pCharacter}))
}))

export default useStore