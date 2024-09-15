'use client'
import { TimerContext } from "@/context/TimerContext"
import { useContext} from "react"
import Timers from "../Timers"
import styles from './page.module.scss'


export default function Main() {

    const { timer, setTimer } = useContext(TimerContext)
    function clickPomodoro() {
        setTimer('pomodoro')
    }

    function clickShort() {
        setTimer('shortTimer')
    }

    function clickLong() {
        setTimer('longTimer')
    }


    return (
        <main className={styles.main}>
            <section>
                <div className={styles.main__div}>
                    <button onClick={() => clickPomodoro()}>Pomodoro</button>
                    <button onClick={() => clickShort()}>Descanso Curto</button>
                    <button onClick={() => clickLong()}>Descanso Longo</button>
                </div>
                <Timers method={timer} />

            </section>
        </main>
    )
}