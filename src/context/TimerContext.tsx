"use client"
import { createContext, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TimerContext = createContext(null as any)
TimerContext.displayName = "Timer"

export default function TimerProvider ({children}:any) {
    const [time, setTime] = useState()
    const [timeInSeconds, setTimeInSeconds] = useState(300)
    const [timer, setTimer] = useState('pomodoro')
    const [pomodoroTimer, setPomodoroTimer] = useState(1500);
    const [longTimer, setLongTimer] = useState(900)
    const [shortTimer, setShortTimer] = useState(300)
    return (
        <TimerContext.Provider value={{
            time, setTime, 
            setTimeInSeconds, timeInSeconds,
            timer,setTimer,
            pomodoroTimer, setPomodoroTimer,
            longTimer, setLongTimer,
            shortTimer, setShortTimer
            }}>
            {children}
        </TimerContext.Provider>
    )
}