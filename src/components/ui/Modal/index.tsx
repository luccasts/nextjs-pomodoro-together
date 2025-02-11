"use client";
import styles from "./page.module.scss";
import { ModalContextProps } from "@/context/ModalContext";
import { Dispatch, SetStateAction } from "react";

import { AiOutlineClose } from "react-icons/ai";

type IModal = {
  children?: JSX.Element;
  isTheModalOpen: boolean | ModalContextProps;
  setIsTheModalOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  children,
  isTheModalOpen,
  setIsTheModalOpen,
}: IModal) {
  //Open / Close Modal
  //  const { isTheModalOpen, setIsTheModalOpen } = useModalContext();

  return isTheModalOpen ? (
    <div
      className={styles.MainModal}
      style={
        isTheModalOpen
          ? { display: "flex" }
          : { display: "none", visibility: "hidden" }
      }
    >
      <div
        className={styles.backgroundModal}
        onClick={() => setIsTheModalOpen(false)}
      ></div>
      <div className={styles.modal}>
        <div className={styles.modal__div__buttonX}>
          <button onClick={() => setIsTheModalOpen(false)}>
            <AiOutlineClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  ) : null;
}
