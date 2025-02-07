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
  } = useContext(TimerContext);
  let { intervalID } = useContext(TimerContext);
  const [startTime, setStartTime] = useState<number | null>(null);
  useEffect(() => {
    setTime(getTimer(timeInSeconds));
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
    console.log(startTime, activeTimerType);
    if (startTime && activeTimerType === "pomodoroTimer" && user?.uid) {
      console.log("entered here -stoptimer-");
      const studyTime = (Date.now() - startTime) / 1000; // Calcula tempo em segundos
      savePomodoroSession(user.uid, Math.round(studyTime)); // Salva no Firebase
      setStartTime(null);
    }
  }
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
