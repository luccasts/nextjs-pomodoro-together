import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import styles from './page.module.scss'


export default function Loading() {
    return (
        <div className={styles.div_loading}> 
            <AiOutlineLoading3Quarters className={`${styles.outlineLoading}`} />
        </div>
    )
}