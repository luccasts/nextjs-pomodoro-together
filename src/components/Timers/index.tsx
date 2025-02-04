'use client'
import { TimerContext } from "@/context/TimerContext"
import { useContext, useEffect } from "react"
import Time from "../Time"
import styles from './page.module.scss'

export default function Timers() {
    const {
        setTimeInSeconds,
        typeTimer, setTypeTimer,
        pomodoroTimer,
        longTimer,
        shortTimer,
        setIsStarButton
    } = useContext(TimerContext)

    useEffect(() => {
        switch (typeTimer) {
            case 'pomodoroTimer':
                setTimeInSeconds(pomodoroTimer)
                setIsStarButton(true)
                setTypeTimer(null)
                break;
            case 'shortTimer':
                setTimeInSeconds(shortTimer)
                setIsStarButton(true)
                setTypeTimer(null)
                break;
            case 'longTimer':
                setTimeInSeconds(longTimer)
                setIsStarButton(true)
                setTypeTimer(null)
                break;

            default:
                break;
        }
    }, [typeTimer])


    return (
        <div className={styles.timers}>
            <Time />
        </div>
    )
}