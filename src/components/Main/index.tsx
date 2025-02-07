"use client";
import { TimerContext } from "@/context/TimerContext";
import { useContext } from "react";
import Timers from "../Timers";
import styles from "./page.module.scss";
import Button from "../ui/Button";

export default function Main() {
  const { setTypeTimer, intervalRef } = useContext(TimerContext);

  let { intervalID } = useContext(TimerContext);

  function clickPomodoro() {
    setTypeTimer("pomodoroTimer");
    stopTimer();
  }

  function clickShort() {
    setTypeTimer("shortTimer");
    stopTimer();
  }

  function clickLong() {
    setTypeTimer("longTimer");
    stopTimer();
  }

  function stopTimer() {
    intervalID = intervalRef.current;
    clearInterval(intervalID as number);
    intervalRef.current = null;
    intervalID = null;
  }

  return (
    <main className={styles.main}>
      <section>
        <div className={styles.main__button}>
          <Button className="hover_white" onClick={() => clickPomodoro()}>
            Pomodoro
          </Button>
          <Button className="hover_white" onClick={() => clickShort()}>
            Descanso Curto
          </Button>
          <Button className="hover_white" onClick={() => clickLong()}>
            Descanso Longo
          </Button>
        </div>
        <Timers />
      </section>
    </main>
  );
}
