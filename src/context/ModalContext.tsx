"use client"
import { createContext, useState } from "react";


export const ModalContext = createContext(null as any)
ModalContext.displayName = "Modal"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ModalProvider ({children}:any) {
    const [isOpenModal, setIsOpenModal] = useState(false)
    return (
        <ModalContext.Provider value={{isOpenModal, setIsOpenModal}}>
            {children}
        </ModalContext.Provider>
    )
}