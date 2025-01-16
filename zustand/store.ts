import { createStore } from "zustand/vanilla";

// Initial value
export type StoreState = {
  isOpen: boolean;
  isDelete: boolean;
  productId: string;
  customerId: string;
  transactionId: number;
  fullName: string;
  type: string;
};

// Actions
export type StoreActions = {
  setIsOpen: (isOpen: boolean) => void;
  setIsDelete: (isDelete: boolean) => void;
  setProductId: (productId: string) => void;
  setCustomerId: (customerId: string) => void;
  setTransactionId: (transactionId: number) => void;
  setFullName: (firstName: string, lastName: string) => void;
  setType: (type: string) => void;
};

export type MainStore = StoreState & StoreActions;

export const defaultInitState: StoreState = {
  isOpen: false,
  isDelete: false,
  productId: "",
  customerId: "",
  transactionId: 0,
  fullName: "",
  type: "create",
};

export const createMainStore = (initState: StoreState = defaultInitState) => {
  return createStore<MainStore>()((set) => ({
    ...initState,
    setIsOpen: (isOpen) => set({ isOpen }),
    setIsDelete: (isDelete) => set({ isDelete }),
    setProductId: (productId) => set({ productId }),
    setCustomerId: (customerId) => set({ customerId }),
    setTransactionId: (transactionId) => set({ transactionId }),
    setFullName: (firstName, lastName) =>
      set({ fullName: `${firstName} ${lastName}` }),
    setType: (type) => set({ type }),
  }));
};
