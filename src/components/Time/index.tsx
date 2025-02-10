"use client";
import { TimerContext } from "@/context/TimerContext";
import { getTimer } from "@/utils/getDate";
import { useContext, useEffect, useState } from "react";
import styles from "./page.module.scss";

import Loading from "../Loading";
import Button from "../ui/Button";
import { savePomodoroSession } from "@/utils/savePomodoroSession";
import { useAuth } from "@/context/AuthContext";

export default function Time() {
  const { user } = useAuth();
  const {
    time,
    setTime,
    timeInSeconds,
    setTimeInSeconds,
    timeInSecondsRef,
    intervalRef,
    isStarButton,
    setIsStarButton,
    activeTimerType,
    setTypeTimer,
    longBreakInterval,
    setLongBreakInterval,
    userLongBreakInterval,
  } = useContext(TimerContext);
  let { intervalID } = useContext(TimerContext);

  const [startTime, setStartTime] = useState<number | null>(null);
  useEffect(() => {
    // if (longBreakInterval === null) {
    //   if (userLongBreakInterval === undefined) {
    //     return setLongBreakInterval;
    //   }
    //   setLongBreakInterval(userLongBreakInterval);
    // }
    setTime(getTimer(timeInSeconds));
    if (time === "00:00") {
      if (activeTimerType === "pomodoroTimer") {
        if (longBreakInterval === 0) {
          stopTimer();
          setTypeTimer("longTimer");
          setLongBreakInterval(userLongBreakInterval);
          return console.log(
            longBreakInterval,
            "resetou",
            "UserlongBreakInterval: ",
            userLongBreakInterval
          );
        }
        longBreakInterval > 0
          ? setLongBreakInterval(longBreakInterval - 1)
          : null;
        stopTimer();
        setTypeTimer("shortTimer");
        console.log(longBreakInterval);
      }
    }
  }, [timeInSeconds]);

  let count = timeInSeconds;
  function countDown() {
    if (0 >= count) {
      stopTimer();
      return;
    }
    count -= 1;
    setTimeInSeconds(count);
    timeInSecondsRef.current = count;
    setTime(getTimer(count));
  }

  function startTimer() {
    if (intervalRef.current) {
      stopTimer();
      return;
    }
    intervalID = setInterval(countDown, 1000);
    intervalRef.current = intervalID;
    setIsStarButton(false);
    setStartTime(Date.now());
  }

  function stopTimer() {
    setIsStarButton(true);
    setTime(getTimer(timeInSecondsRef.current));
    intervalID = intervalRef.current;
    clearInterval(intervalID as number);
    intervalRef.current = null;
    intervalID = null;
    if (startTime && activeTimerType === "pomodoroTimer" && user?.uid) {
      console.log("entered here -stoptimer-");
      const studyTime = (Date.now() - startTime) / 1000; // Calcula tempo em segundos
      savePomodoroSession(user.uid, Math.round(studyTime)); // Salva no Firebase
      setStartTime(null);
    }
  }
  console.log(userLongBreakInterval, "userLongBreak: time/ index.tsx");
  console.log(longBreakInterval, "LongBreakInterval: time / index.tsx");
  return (
    <div>
      {time ? null : <Loading />}

      <div className={styles.time}>
        <h1>{time}</h1>
        <Button
          textTransform={"uppercase"}
          className={"hover_transparent"}
          onClick={() => startTimer()}
        >
          {isStarButton ? "Começar" : "Pausar "}
        </Button>
      </div>
    </div>
  );
}
