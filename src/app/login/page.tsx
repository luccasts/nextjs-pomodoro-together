"use client";
import { app } from "@/lib/firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import styles from './page.module.scss'

export default function Login() {
    const router = useRouter();

    const [inputEmailValue, setinputEmailValue] = useState("")
    const [inputPasswordValue, setinputPasswordValue] = useState("")
    const [errorMessage, setErrorMessage] = useState("");

    function validateEmail(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, inputEmailValue, inputPasswordValue)
            .then(() => {
                router.push("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(`${errorCode} - ${errorMessage}`);
            });


    }

    return (

        <main className={styles.main}>
            <div className={styles.containerForm}>
                <h1>Login page</h1>
                <form onSubmit={(e) => validateEmail(e)}>
                    <label htmlFor="email">E-mail:
                        <input value={inputEmailValue || ""} onChange={(e) => setinputEmailValue(e.target.value)} id="email" type="email" placeholder="Informe o seu E-mail" /> </label>
                    <label htmlFor="email">Senha:
                        <input value={inputPasswordValue || ""} onChange={(e) => setinputPasswordValue(e.target.value)} id="password" type="password" placeholder="Informe sua senha " /></label>

                    <button disabled={inputEmailValue.length > 3 && inputPasswordValue.length >= 6 ? false : true}>Entrar</button>
                </form>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Link href={'/registrar'} > Não tem conta? <strong>Registra-se </strong></Link>
            </div>
        </main>

    )
}