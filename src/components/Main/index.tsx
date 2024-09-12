'use client'
import { TimerContext } from "@/context/TimerContext"
import { getTimer } from "@/utils/getDate"
import { MutableRefObject, useContext, useEffect, useRef} from "react"

interface IIntervalRef {
    intervalRef: MutableRefObject<number>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current?: any

}

export default function Main() {
    const { time, setTime } = useContext(TimerContext)
    let { timeInSeconds } = useContext(TimerContext)
    const TimeInSeconds = useRef(0);
    const intervalRef: MutableRefObject<number> | IIntervalRef = useRef(0);
    let intervalID: string | number | NodeJS.Timeout | null | undefined = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    
    useEffect(() => {
        setTime(getTimer(timeInSeconds))
    }, [timeInSeconds])
    // const [time, setTime]: any = useState(getTimer(timeInSeconds))


    function countDown() {
        if (0 >= timeInSeconds) {
            stopTimer()
            return;
        }
        timeInSeconds -= 1
        TimeInSeconds.current = timeInSeconds

        setTime(getTimer(timeInSeconds))
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
        timeInSeconds = TimeInSeconds.current
        setTime(getTimer(timeInSeconds))
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