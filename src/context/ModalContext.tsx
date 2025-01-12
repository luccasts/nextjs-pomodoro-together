"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ModalProviderProps {
    children: ReactNode;
}
interface ModalContextProps {
    isOpenModal: boolean | ModalContextProps;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>

    isOpenUserModal: boolean | ModalContextProps;
    setIsOpenUserModal: Dispatch<SetStateAction<boolean>>
    // setIsOpenModal: Dispatch<SetStateAction<false | ModalContextProps>>
}
export const ModalContext = createContext<ModalContextProps | undefined>(undefined)
ModalContext.displayName = "Modal"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModalProvider({ children }: ModalProviderProps) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isOpenUserModal, setIsOpenUserModal] = useState(false)
    return (
        <ModalContext.Provider value={{ isOpenModal, setIsOpenModal ,
            isOpenUserModal, setIsOpenUserModal
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext = (): ModalContextProps => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error("Erro na recuperação de dados no contexto da abrir e fechar modal")
    }
    return context

}

