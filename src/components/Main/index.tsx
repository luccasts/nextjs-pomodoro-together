'use client'
import { TimerContext } from "@/context/TimerContext"
import { getTimer } from "@/utils/getDate"
import { MutableRefObject, useContext, useEffect, useRef } from "react"

interface IIntervalRef {
    intervalRef: MutableRefObject<number>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current?: any

}

export default function Main() {
    const { time, setTime } = useContext(TimerContext)
    const TimeInSeconds = useRef(0);
    const intervalRef: MutableRefObject<number> | IIntervalRef = useRef(0);
    let intervalID: string | number | NodeJS.Timeout | null | undefined = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { timeInSeconds, setTimeInSeconds } = useContext(TimerContext)

    useEffect(() => {
        setTime(getTimer(timeInSeconds))
        console.log(timeInSeconds)
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
        <main>
            <section>
                <h1>{time}</h1>
                <button onClick={() => startTimer()}>Começar</button>
                <button onClick={() => stopTimer()}>Parar</button>
            </section>
        </main>
    )
}