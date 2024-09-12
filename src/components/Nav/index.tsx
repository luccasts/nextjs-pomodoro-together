import { AiFillClockCircle, AiFillSetting, AiOutlineUser } from "react-icons/ai";
import styles from "./page.module.scss"
import { HiDocumentReport } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
export default function Nav() {
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
                    <li> <AiFillSetting />Configurações</li>
                    <li><AiOutlineUser />
                    </li>
                </ul>
            </nav>
        </header>
    )
}