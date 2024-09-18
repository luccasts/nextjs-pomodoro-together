"use client"
import { createContext, MutableRefObject, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TimerContext = createContext(null as any)
TimerContext.displayName = "Timer"

interface IIntervalRef {
    intervalRef: MutableRefObject<number>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    current?: any
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TimerProvider ({children}:any) {
    const [time, setTime] = useState()
   
    const [timer, setTimer] = useState()
    const [typeTimer, setTypeTimer] = useState()
    const [pomodoroTimer, setPomodoroTimer] = useState(1500);
    const [timeInSeconds, setTimeInSeconds] = useState(pomodoroTimer)
    const [longTimer, setLongTimer] = useState(900)
    const [shortTimer, setShortTimer] = useState(300)
    const intervalRef: MutableRefObject<number> | IIntervalRef = useRef(0);
    const timeInSecondsRef = useRef(0);

    const [isStarButton, setIsStarButton] = useState(true)
    // eslint-disable-next-line prefer-const
    let intervalID: string | number | NodeJS.Timeout | null | undefined = null
    return (
        <TimerContext.Provider value={{
            time, setTime, 
            setTimeInSeconds, timeInSeconds,
            typeTimer, setTypeTimer,
            timer,setTimer,
            pomodoroTimer, setPomodoroTimer,
            longTimer, setLongTimer,
            shortTimer, setShortTimer,
            intervalRef,
            timeInSecondsRef,
            intervalID,
            isStarButton, setIsStarButton
            }}>
            {children}
        </TimerContext.Provider>
    )
}