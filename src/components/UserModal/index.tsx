import { signOutUser } from '@/context/AuthContext'
import styles from './page.module.scss'
export default function UserModal() {
    return (
        <div className={styles.userModal}>
            <li>Perfil</li>
            <li onClick={() => signOutUser()}>Deslogar</li>
        </div>
    )
}