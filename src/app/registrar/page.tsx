"use client"
import { app } from "@/lib/firebase"
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth"
import Link from "next/link"
import { FormEvent, useState } from "react"
import styles from './page.module.scss'
export default function Registrar() {


    const [inputEmailValue, setinputEmailValue] = useState("")
    const [inputPasswordValue, setinputPasswordValue] = useState("")
    const [inputUserValue, setinputUserValue] = useState("")
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    async function validateEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const auth = getAuth(app);
        
            createUserWithEmailAndPassword(auth, inputEmailValue, inputPasswordValue)
                .then((userCredential) => {
                    // The link was successfully sent. Inform the user.
                    // Save the email locally so you don't need to ask the user for it again
                    // if they open the link on the same device.
                    const user = userCredential.user;
                    sendEmailVerification(user);
                    setMessage("Conta criada com sucesso! Verifique seu e-mail para ativá-la.");

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    return <div>
                        <h1>{errorCode} - {errorMessage}</h1>
                    </div>
                });

    }
    return (

        <main className={styles.main}>
            <div className={styles.containerForm}>
                <h1>Criar conta</h1>
                <form onSubmit={(e) => validateEmail(e)}>
                    <label htmlFor="user">Usuário:
                        <input value={inputUserValue || ""} onChange={(e) => setinputUserValue(e.target.value)} id="user" type="user" placeholder="Informe o seu usuário" /></label>
                    <label htmlFor="email">E-mail:
                        <input value={inputEmailValue || ""} onChange={(e) => setinputEmailValue(e.target.value)} id="email" type="email" placeholder="Informe o seu E-mail" /></label>

                    <label htmlFor="email">Senha:
                        <input value={inputPasswordValue || ""} onChange={(e) => setinputPasswordValue(e.target.value)} id="password" type="password" placeholder="Informe sua senha " /></label>

                    <button disabled={inputEmailValue.length > 3 && inputPasswordValue.length >= 6 ? false : true}>Criar Conta</button>
                </form>
                {/* Exibição de mensagens */}
                {message && <p className={styles.success}>{message}</p>}
                {errorMessage && <p className={styles.error}>{errorMessage}</p>}
                <Link href={'/login'} >
                    Já tem uma conta? <strong>Logar-se</strong>
                </Link>
            </div>
        </main>

    )
}