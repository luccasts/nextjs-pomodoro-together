'use client'
import { TimerContext } from "@/context/TimerContext"
import { useContext } from "react"
import Timers from "../Timers"
import styles from './page.module.scss'



export default function Main() {

    const {
        setTypeTimer,
        intervalRef

    } = useContext(TimerContext)

    let { intervalID } = useContext(TimerContext)

    function clickPomodoro() {
        setTypeTimer('pomodoroTimer')
        stopTimer()

    }

    function clickShort() {
        setTypeTimer('shortTimer')
        stopTimer()
    }

    function clickLong() {
        setTypeTimer('longTimer')
        stopTimer()
    }

    function stopTimer() {
        intervalID = intervalRef.current;
        clearInterval(intervalID as number)
        intervalRef.current = null
        intervalID = null
    }

    return ( 
        <main className={styles.main}>
            <section>
                <div className={styles.main__div}>
                    <button onClick={() => clickPomodoro()}>Pomodoro</button>
                    <button onClick={() => clickShort()}>Descanso Curto</button>
                    <button onClick={() => clickLong()}>Descanso Longo</button>
                </div>
                <Timers />
            </section>
        </main>
    )
}
