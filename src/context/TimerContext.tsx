"use client"
import { createContext, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TimerContext = createContext(null as any)
TimerContext.displayName = "Timer"

export default function TimerProvider ({children}:any) {
    const [time, setTime] = useState()
    const [ttimeInSeconds, setTimeInSeconds] = useState()
    let timeInSeconds = 300

    return (
        <TimerContext.Provider value={{time, setTime, timeInSeconds}}>
            {children}
        </TimerContext.Provider>
    )
}