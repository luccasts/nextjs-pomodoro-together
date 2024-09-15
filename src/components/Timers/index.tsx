'use client'
import { TimerContext } from "@/context/TimerContext"
import { getTimer } from "@/utils/getDate"
import { MutableRefObject, useContext, useEffect, useRef } from "react"

import styles from './page.module.scss'
interface IIntervalRef {
    intervalRef: MutableRefObject<number>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current?: any
}


export default function Timers({ method = 'pomodoro' }) {
    const { time, setTime,
        timeInSeconds, setTimeInSeconds,
        timer, setTimer,
        pomodoroTimer, setPomodoroTimer,
        longTimer, setLongTimer,
        shortTimer, setShortTimer
    } = useContext(TimerContext)
    const TimeInSeconds = useRef(0);
    const intervalRef: MutableRefObject<number> | IIntervalRef = useRef(0);
    let intervalID: string | number | NodeJS.Timeout | null | undefined = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    useEffect(() => {
        setTime(getTimer(timeInSeconds))
    }, [timeInSeconds])
    // const [time, setTime]: any = useState(getTimer(timeInSeconds))

    let count = timeInSeconds
    function countDown() {
        if (0 >= count) {
            stopTimer();
            return;
        }
        count -= 1;
        setTimeInSeconds(count);
        TimeInSeconds.current = count;
    }

    function startTimer() {

        if (intervalRef.current) {
            stopTimer();
            return;
        }
        intervalID = setInterval(countDown, 1000)
        intervalRef.current = intervalID;
    }


    function stopTimer() {
        setTime(getTimer(TimeInSeconds.current))
        intervalID = intervalRef.current;
        clearInterval(intervalID as number)
        intervalRef.current = null
        intervalID = null
    }
    return (
        <div>
            <h1>{time}</h1>
            <button onClick={() => startTimer()}>Começar</button>
            <button onClick={() => stopTimer()}>Parar</button>
        </div>
    )
}