'use client'
import { TimerContext } from "@/context/TimerContext"
import { getTimer } from "@/utils/getDate"
import { MutableRefObject, useContext, useEffect, useRef } from "react"

import styles from './page.module.scss'
import Time from "../Time"
interface IIntervalRef {
    intervalRef: MutableRefObject<number>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current?: any
}


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
        <Time />
    )
}