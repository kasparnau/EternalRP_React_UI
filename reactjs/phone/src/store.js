import create from 'zustand'

const useStore = create((set) => ({
    people: ['test']
}))

export default useStore