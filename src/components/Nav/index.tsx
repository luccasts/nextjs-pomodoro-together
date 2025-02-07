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
  const {
    setIsTheModalOpen,
    setIsTheUserModalOpen,
    isTheUserModalOpen,
    isTheStudyReportModalOpen,
    setIsTheStudyReportOpen,
  } = useModalContext();
  const { user } = useAuth();
  function showUserModal() {
    setIsTheUserModalOpen(true);
    if (isTheUserModalOpen) {
      setIsTheUserModalOpen(false);
    }
  }

  function showStudyReportyModal() {
    setIsTheStudyReportOpen(true);
    if (isTheStudyReportModalOpen) {
      setIsTheStudyReportOpen(false);
    }
  }

  function showModal() {
    setIsTheModalOpen(true);
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
          <li
            className={styles.liSlowHover}
            onClick={() => showStudyReportyModal()}
          >
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
                {isTheUserModalOpen ? <UserModal /> : ""}
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
