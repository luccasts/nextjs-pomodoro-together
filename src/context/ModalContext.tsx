"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ModalProviderProps {
  children: ReactNode;
}
export interface ModalContextProps {
  isTheModalOpen: boolean | ModalContextProps;
  setIsTheModalOpen: Dispatch<SetStateAction<boolean>>;

  isTheUserModalOpen: boolean | ModalContextProps;
  setIsTheUserModalOpen: Dispatch<SetStateAction<boolean>>;

  isTheStudyReportModalOpen: boolean | ModalContextProps;
  setIsTheStudyReportOpen: Dispatch<SetStateAction<boolean>>;
}
export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);
ModalContext.displayName = "Modal";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModalProvider({ children }: ModalProviderProps) {
  const [isTheModalOpen, setIsTheModalOpen] = useState(false);
  const [isTheUserModalOpen, setIsTheUserModalOpen] = useState(false);
  const [isTheStudyReportModalOpen, setIsTheStudyReportOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        isTheModalOpen,
        setIsTheModalOpen,
        isTheUserModalOpen,
        setIsTheUserModalOpen,
        isTheStudyReportModalOpen,
        setIsTheStudyReportOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "Erro na recuperação de dados no contexto da abrir e fechar modal"
    );
  }
  return context;
};
