'use client'
import { useContext } from 'react'
import styles from './page.module.scss'
import { ModalContext } from '@/context/ModalContext'
import { TimerContext } from '@/context/TimerContext'
import { getTimer } from '@/utils/getDate'


export default function Modal() {
    const { isOpenModal } = useContext(ModalContext)
    const { time, setTime } = useContext(TimerContext)
    let { timeInSeconds } = useContext(TimerContext)
    
    return (
        <div style={isOpenModal ? { display: 'block' } : { display: 'none' }} className={styles.config}>
            <h1>Configurações</h1>
            <h2>Pomodoro</h2>
            <form>
                {/* <input maxLength={999} type="number" value={time} onChange={v => verifyTimer(v.target.value)} /> */}

                <button onClick={(e) => verifyTimer(e)}>Vai</button>
            </form>
        </div>
    )
}