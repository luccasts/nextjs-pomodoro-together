import { signOutUser } from "@/context/AuthContext";
import styles from "./page.module.scss";
import Link from "next/link";
export default function UserModal() {
  return (
    <nav className={styles.userModal}>
      <ul>
        <li className="hover_white">
          <Link href={"/profile"}>Perfil </Link>
        </li>
        <li className="hover_white" onClick={() => signOutUser()}>
          Deslogar
        </li>
      </ul>
    </nav>
  );
}
