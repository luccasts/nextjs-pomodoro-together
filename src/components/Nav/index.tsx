'use client'

import { AiFillClockCircle, AiFillSetting, AiOutlineUser } from "react-icons/ai";
import styles from "./page.module.scss"
import { HiDocumentReport } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";

import { useContext } from "react";
import { ModalContext } from "@/context/ModalContext";
import Link from "next/link";





export default function Nav() {
    const { setIsOpenModal } = useContext(ModalContext)




    function showModal() {
        setIsOpenModal(true)
    }

    return (
        <header className={styles.header}>
            <div>
                <AiFillClockCircle />
                PomodoroTogether

            </div>
            <nav>
                <ul>
                    <li><FaUserFriends />
                        Amigos</li>
                    <li><HiDocumentReport />
                        Relatório</li>

                    <li onClick={() => showModal()}><AiFillSetting />Configurações</li>
                    <li><Link href={'/registrar'} ><AiOutlineUser /></Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}