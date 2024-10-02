'use client'
import { useContext, useEffect, useState } from 'react'
import styles from './page.module.scss'
import { ModalContext } from '@/context/ModalContext'
import { TimerContext } from '@/context/TimerContext'
import { AiOutlineClose } from 'react-icons/ai'


export default function Modal() {
    //Open / Close Modal 
    const { isOpenModal, setIsOpenModal } = useContext(ModalContext)

    //Timers
    const { pomodoroTimer, setPomodoroTimer,
        longTimer, setLongTimer,
        shortTimer, setShortTimer, setTypeTimer } = useContext(TimerContext)

    //pomodoro
    const [pomodoroTimerInputValue, setPomodoroTimerInputValue]:any = useState()

    //shortTimer
    const [shortTimerInputValue, setShortTimerInputValue]:any = useState()

    //longTimer
    const [longTimerInputValue, setLongTimerInputValue]:any = useState()

    //form button
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [isDisabled, setIsDisabled]: any = useState()

    function handleTimeInMinutesOrSeconds(time: number, type: string):number {
        switch (type) {
            case 'divide':
                return time / 60
                break;
            case 'multiplication':
                return time * 60
                break;
            default:
                break;
        }
    }
    
    useEffect(() => {
        setPomodoroTimerInputValue(handleTimeInMinutesOrSeconds(pomodoroTimer, 'divide'))
        setShortTimerInputValue(handleTimeInMinutesOrSeconds(shortTimer, 'divide'))
        setLongTimerInputValue(handleTimeInMinutesOrSeconds(longTimer, 'divide'))
    }, [])

    function handleSetTimer(v: MouseEvent) {
        v.preventDefault()
        const secondsPomodoro = handleTimeInMinutesOrSeconds(pomodoroTimerInputValue, 'multiplication');
        const secondsShortTimer = handleTimeInMinutesOrSeconds(shortTimerInputValue, 'multiplication');
        const secondsLongTimer = handleTimeInMinutesOrSeconds(longTimerInputValue, 'multiplication');
        if (secondsPomodoro !== pomodoroTimer) {
            console.log('diferente pomodoro')
            setPomodoroTimer(secondsPomodoro)
            setTypeTimer('pomodoroTimer')
        }

        if (secondsShortTimer !== shortTimer ) {
            setShortTimer(secondsShortTimer)
            setTypeTimer('shortTimer')
        }

        if (secondsLongTimer !== longTimer) {
            setLongTimer(secondsLongTimer)
            setTypeTimer('longTimer')
        }
        setIsOpenModal(false)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function validateInput(input: any, type: any) {
        if (input === '' || input == 0) {
            setIsDisabled(true)
        } else if (input !== 0) {
            setIsDisabled(false)
        }
        const maxLength = 3

        if (input >= 0 && input.length <= maxLength) {
            switch (type) {
                case 'pomodoro':
                    setPomodoroTimerInputValue(input)
                    break;

                case 'shortTimer':
                    setShortTimerInputValue(input)
                    break;

                case 'longTimer':
                    setLongTimerInputValue(input)
                    break;
                default:
                    break
            }

        }
    }
    return (
        <div style={isOpenModal ? { display: 'flex' } : { display: 'none' }} className={styles.backgroundModal}>
            <div className={styles.modal}>
                <div className={styles.modal__div__buttonX}>
                    <button onClick={() => setIsOpenModal(false)}><AiOutlineClose /></button>
                </div>
                <div className={styles.modal__div__form}>
                    <div className={styles.modal__div__form__title}>
                        <h1>Configurações</h1>
                    </div>

                    <form>
                        <label htmlFor='pomodoro'>Pomodoro</label>
                        <input id='pomodoro' type="number" value={pomodoroTimerInputValue || ""} name="" 
                        onChange={(v) => validateInput(v.target.value, 'pomodoro')} />

                        <label htmlFor="shortTimer">Pausa Curta</label>
                        <input id='shortTimer' type="number" 
                        value={shortTimerInputValue || ""} name="" 
                        onChange={(v) => validateInput(v.target.value, 'shortTimer')} />

                        <label htmlFor="longTimer">Pausa Longa</label>
                        <input id='longTimer' type="number" value={longTimerInputValue || ""} name="" 
                        onChange={(v) => validateInput(v.target.value, 'longTimer')} />
                        <div>
                            <button disabled={isDisabled} onClick={(e) => handleSetTimer(e)}>Aplicar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}