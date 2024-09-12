'use client'
import { useRef, useState } from "react"
export default function Main() {
    let timeInSeconds = 15

    const TimeInSeconds = useRef(0);
    const intervalRef = useRef(0);
    let intervalID: string | number | NodeJS.Timeout | null | undefined = null

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [time, setTime]: any = useState(timeInSeconds)


    function countDown() {
        if (0 >= timeInSeconds) {
            stopTimer()
            return;
        }
        timeInSeconds -= 1
        TimeInSeconds.current = timeInSeconds
        setTime(timeInSeconds)
    }

    function startTimer() {
        if (intervalID) {
            stopTimer();
            return;
        }
        intervalID = setInterval(countDown, 1000)
        intervalRef.current = intervalID;
    }


    function stopTimer() {
        timeInSeconds = TimeInSeconds.current
        setTime(timeInSeconds)
        intervalID = intervalRef.current;
        clearInterval(intervalID)
        intervalRef.current = null
        intervalID = null
    }






    // const newDate = new Date(1500 * 1000)
    // console.log(newDate.toLocaleTimeString('pt-Br', {minute:'2-digit', second:'2-digit'}))
    // const formattedTime = newDate.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })

    return (
        <main>
            <h1>{time}</h1>
            <button onClick={() => startTimer()}>Começar</button>
            <button onClick={() => stopTimer()}>Parar</button>
        </main>
    )
}