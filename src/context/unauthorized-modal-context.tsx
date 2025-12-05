"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UnauthorizedModalContextType {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const UnauthorizedModalContext = createContext<
  UnauthorizedModalContextType | undefined
>(undefined);

// Global callback untuk akses dari axios interceptor
let openModalCallback: (() => void) | null = null;

export const setOpenUnauthorizedModal = () => {
  if (openModalCallback) {
    openModalCallback();
  }
};

export const UnauthorizedModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    // Set global callback saat component mount
    openModalCallback = openModal;

    return () => {
      openModalCallback = null;
    };
  }, []);

  return (
    <UnauthorizedModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </UnauthorizedModalContext.Provider>
  );
};

export const useUnauthorizedModal = () => {
  const context = useContext(UnauthorizedModalContext);
  if (context === undefined) {
    throw new Error(
      "useUnauthorizedModal must be used within UnauthorizedModalProvider"
    );
  }
  return context;
};
