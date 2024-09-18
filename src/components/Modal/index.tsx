'use client'
import { useContext, useEffect, useState } from 'react'
import styles from './page.module.scss'
import { ModalContext } from '@/context/ModalContext'
import { TimerContext } from '@/context/TimerContext'
import { getTimer } from '@/utils/getDate'
import { AiOutlineClose } from 'react-icons/ai'


export default function Modal() {
    //Open / Close Modal 
    const { isOpenModal, setIsOpenModal } = useContext(ModalContext)

    //Timers
    const { pomodoroTimer, setPomodoroTimer,
        longTimer, setLongTimer,
        shortTimer, setShortTimer } = useContext(TimerContext)

    //pomodoro
    const [pomodoroTimerInputValue, setPomodoroTimerInputValue] = useState()

    //shortTimer
    const [shortTimerInputValue, setShortTimerInputValue] = useState()

    //longTimer
    const [longTimerInputValue, setLongTimerInputValue] = useState()

    //form button
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [isDisabled, setIsDisabled]: any = useState()

    function handleTimeInMinutesOrSeconds(time, type) {
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

    function handleSetTimer(v) {
        v.preventDefault()
        if (pomodoroTimerInputValue != pomodoroTimer) {
            console.log('diferente pomodoro')
            //setPomodoroTimer(handleTimeInMinutesOrSeconds(pomodoroTimerInputValue,'multiplication'))
        }
        
        if (longTimerInputValue != longTimer) {
            console.log('diferente long')
            //setLongTimer(handleTimeInMinutesOrSeconds(longTimerInputValue,'multiplication'))
        }

        if (shortTimerInputValue != shortTimer) {
            console.log('diferente short')
            //setShortTimer(handleTimeInMinutesOrSeconds(shortTimerInputValue, 'multiplication'))
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
                        <input id='pomodoro' type="number" value={pomodoroTimerInputValue} name="" onChange={(v) => validateInput(v.target.value, 'pomodoro')} />

                        <label htmlFor="shortTimer">Pausa Curta</label>
                        <input id='shortTimer' type="number" value={shortTimerInputValue} name="" onChange={(v) => validateInput(v.target.value, 'shortTimer')} />
                        <label htmlFor="longTimer">Pausa Longa</label>
                        <input id='longTimer' type="number" value={longTimerInputValue} name="" onChange={(v) => validateInput(v.target.value, 'longTimer')} />
                        <div>
                            <button disabled={isDisabled} onClick={(e) => handleSetTimer(e)}>Aplicar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}