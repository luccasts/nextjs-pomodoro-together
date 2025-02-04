"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useModalContext } from "@/context/ModalContext";
import { TimerContext } from "@/context/TimerContext";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../ui/button";

export default function Modal() {
  //Open / Close Modal
  const { isOpenModal, setIsOpenModal } = useModalContext();

  //Timers
  const {
    pomodoroTimer,
    setPomodoroTimer,
    longTimer,
    setLongTimer,
    shortTimer,
    setShortTimer,
    setTypeTimer,
  } = useContext(TimerContext);

  //pomodoro
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [pomodoroTimerInputValue, setPomodoroTimerInputValue]: any = useState();

  //shortTimer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [shortTimerInputValue, setShortTimerInputValue]: any = useState();

  //longTimer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [longTimerInputValue, setLongTimerInputValue]: any = useState();

  //form button
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isDisabled, setIsDisabled]: any = useState();

  function handleTimeInMinutesOrSeconds(time: number, type: string) {
    switch (type) {
      case "divide":
        return time / 60;
        break;
      case "multiplication":
        return time * 60;
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    setPomodoroTimerInputValue(
      handleTimeInMinutesOrSeconds(pomodoroTimer, "divide")
    );
    setShortTimerInputValue(handleTimeInMinutesOrSeconds(shortTimer, "divide"));
    setLongTimerInputValue(handleTimeInMinutesOrSeconds(longTimer, "divide"));
  }, []);

  function handleSetTimer(v: MouseEvent) {
    v.preventDefault();
    const secondsPomodoro = handleTimeInMinutesOrSeconds(
      pomodoroTimerInputValue,
      "multiplication"
    );
    const secondsShortTimer = handleTimeInMinutesOrSeconds(
      shortTimerInputValue,
      "multiplication"
    );
    const secondsLongTimer = handleTimeInMinutesOrSeconds(
      longTimerInputValue,
      "multiplication"
    );
    if (secondsPomodoro !== pomodoroTimer) {
      console.log("diferente pomodoro");
      setPomodoroTimer(secondsPomodoro);
      setTypeTimer("pomodoroTimer");
    }

    if (secondsShortTimer !== shortTimer) {
      setShortTimer(secondsShortTimer);
      setTypeTimer("shortTimer");
    }

    if (secondsLongTimer !== longTimer) {
      setLongTimer(secondsLongTimer);
      setTypeTimer("longTimer");
    }
    setIsOpenModal(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function validateInput(input: any, type: any) {
    if (input === "" || input == 0) {
      setIsDisabled(true);
    } else if (input !== 0) {
      setIsDisabled(false);
    }
    const maxLength = 3;

    if (input >= 0 && input.length <= maxLength) {
      switch (type) {
        case "pomodoro":
          setPomodoroTimerInputValue(input);
          break;

        case "shortTimer":
          setShortTimerInputValue(input);
          break;

        case "longTimer":
          setLongTimerInputValue(input);
          break;
        default:
          break;
      }
    }
  }

  return (
    <div
      className={styles.MainModal}
      style={isOpenModal ? { display: "flex" } : { display: "none" }}
    >
      <div
        className={styles.backgroundModal}
        onClick={() => setIsOpenModal(false)}
      ></div>
      <div className={styles.modal}>
        <div className={styles.modal__div__buttonX}>
          <button onClick={() => setIsOpenModal(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className={styles.modal__div__form}>
          <div className={styles.modal__div__form__title}>
            <h1>Configurações</h1>
          </div>
          <div className={styles.modal__div__form__title}>
            <h2>Temporizadores (em minutos)</h2>
          </div>

          <form>
            <div className={styles.div__input}>
              <label htmlFor="pomodoro">Pomodoro</label>
              <input
                id="pomodoro"
                type="number"
                value={pomodoroTimerInputValue || ""}
                name=""
                onChange={(v) => validateInput(v.target.value, "pomodoro")}
              />
            </div>
            <div className={styles.div__input}>
              <label htmlFor="shortTimer">Pausa Curta</label>
              <input
                id="shortTimer"
                type="number"
                value={shortTimerInputValue || ""}
                name=""
                onChange={(v) => validateInput(v.target.value, "shortTimer")}
              />
            </div>
            <div className={styles.div__input}>
              <label htmlFor="longTimer">Pausa Longa</label>
              <input
                id="longTimer"
                type="number"
                value={longTimerInputValue || ""}
                name=""
                onChange={(v) => validateInput(v.target.value, "longTimer")}
              />
            </div>
            <div className={styles.div__button}>
              <Button
                className="hover_transparent"
                fontSize={"1rem"}
                padding={"0.5rem .8rem"}
                onClick={(e) => handleSetTimer(e)}
                disabled={isDisabled}
              >
                Aplicar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
