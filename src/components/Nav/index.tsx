"use client";
import {
  AiFillClockCircle,
  AiFillSetting,
  AiOutlineUser,
} from "react-icons/ai";
import styles from "./page.module.scss";
import { HiDocumentReport } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { useModalContext } from "@/context/ModalContext";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import UserModal from "../UserModal";

export default function Nav() {
  const { setIsOpenModal, setIsOpenUserModal, isOpenUserModal } =
    useModalContext();
  const { user } = useAuth();
  function showUserModal() {
    setIsOpenUserModal(true);
    if (isOpenUserModal) {
      setIsOpenUserModal(false);
    }
  }

  function showModal() {
    setIsOpenModal(true);
  }

  return (
    <header className={styles.header}>
      <div>
        <AiFillClockCircle />
        PomoTH
      </div>
      <nav>
        <ul>
          <li className={styles.liSlowHover}>
            <FaUserFriends />
            Amigos
          </li>
          <li className={styles.liSlowHover}>
            <HiDocumentReport />
            Relatório
          </li>

          <li className={styles.liSlowHover} onClick={() => showModal()}>
            <AiFillSetting />
            Configurações
          </li>

          {user ? (
            <div className={styles.userModal}>
              <div>
                <li
                  className={styles.liSlowHover}
                  onClick={() => showUserModal()}
                >
                  <AiOutlineUser />
                </li>
              </div>
              <div className={styles.userModalAbsolute}>
                {isOpenUserModal ? <UserModal /> : ""}
              </div>
            </div>
          ) : (
            <li className={styles.liSlowHover}>
              <Link href={"/registrar"}>
                <AiOutlineUser />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
