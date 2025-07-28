import { create } from "zustand";

const useCounter = create((set) => {
  return {
    counter: 0,
    incrCounter: () => set((state) => ({ counter: state.counter + 1 })),
    decrCounter: () => set((state) => ({ counter: state.counter - 1 })),
    resetCounter: () => set({ counter: 0 }),
  };
});

export default useCounter;
