'use client'
import { useContext, useEffect, useState } from 'react'
import styles from './page.module.scss'
import { ModalContext } from '@/context/ModalContext'
import { TimerContext } from '@/context/TimerContext'
import { getTimer } from '@/utils/getDate'
import { AiOutlineClose } from 'react-icons/ai'


export default function Modal() {
    const { isOpenModal, setIsOpenModal } = useContext(ModalContext)
    const { setTimeInSeconds, timeInSeconds } = useContext(TimerContext)
    const [valueInput, setValueInput] = useState()
    const [isDisabled, setIsDisabled] = useState(false)

    const timeInMinutes = timeInSeconds / 60
    useEffect(() => {
        setValueInput(timeInMinutes)
    }, [])

    function verifyTimer(v) {
        v.preventDefault()
        let seconds = valueInput * 60
        setTimeInSeconds(seconds)
        // getTimer(e.target.value)

        setIsOpenModal(false)
    }

    function validateLength(input) {
        const maxLength = 3
        if (input >= 0 && input.length <= maxLength) {
            setValueInput(input)
        }
    }
    return (
        <div style={isOpenModal ? { display: 'flex' } : { display: 'none' }} className={styles.backgroundModal}>
            <div className={styles.modal}>
                <div className={styles.modal__div__buttonX}>
                    <button onClick={() => setIsOpenModal(false)}><AiOutlineClose /></button>
                </div>
                <div className={styles.modal__div__form}>
                    <h1>Configurações</h1>

                    <form>
                        <h2>Pomodoro</h2>
                        <input type="number" value={valueInput} name="" id="" onInput={(v) => validateLength(v.target.value)} />
                        {/* <input maxLength={999} type="number" value={time} onChange={v => verifyTimer(v.target.value)} /> */}
                        <div>
                            <button disabled={isDisabled} onClick={(e) => verifyTimer(e)}>Aplicar</button>
                        </div>
                        <h3>Pausa Curta</h3>

                        <h4>Pausa Longa</h4>
                    </form>
                </div>
            </div>
        </div>
    )
}