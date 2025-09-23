import { create } from 'zustand'

const useStore = create((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}))

export default useStore
