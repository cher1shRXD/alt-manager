import { create } from 'zustand'

interface LoadingStore {
  isLoading : boolean;
  setIsLoading : (val : boolean) => void;
}

export const loadingStore = create<LoadingStore>((set)=>({
  isLoading : false,
  setIsLoading : (isLoading) => set({isLoading})
}))
