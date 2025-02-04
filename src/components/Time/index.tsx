"use client";
import { TimerContext } from "@/context/TimerContext";
import { getTimer } from "@/utils/getDate";
import { useContext, useEffect } from "react";
import styles from "./page.module.scss";

import Loading from "../Loading";
import Button from "../ui/button";

export default function Time() {
  const {
    time,
    setTime,
    timeInSeconds,
    setTimeInSeconds,
    timeInSecondsRef,
    intervalRef,
    isStarButton,
    setIsStarButton,
  } = useContext(TimerContext);
  let { intervalID } = useContext(TimerContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // let intervalID: string | number | NodeJS.Timeout | null | undefined = null

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
  }

  function stopTimer() {
    setIsStarButton(true);
    setTime(getTimer(timeInSecondsRef.current));
    intervalID = intervalRef.current;
    clearInterval(intervalID as number);
    intervalRef.current = null;
    intervalID = null;
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
