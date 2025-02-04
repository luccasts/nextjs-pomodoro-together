"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function ResetPassoword() {
  const [inputEmailValue, setinputEmailValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  function resetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, inputEmailValue)
      .then(() => {
        setMessage(
          "E-mail para redefinição de senha enviado com sucesso! Verifique sua caixa de entrada ou pasta de spam."
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            setErrorMessage(
              "O e-mail informado não é válido. Por favor, verifique e tente novamente."
            );
            break;
          default:
            setErrorMessage(
              "Ocorreu um erro ao tentar enviar o e-mail. Tente novamente mais tarde."
            );
            break;
        }
      });
  }
  return (
    <main className={styles.main}>
      <div className={styles.containerForm}>
        <h1>Redefinir Senha</h1>
        <form onSubmit={(e) => resetPassword(e)}>
          <label htmlFor="email">
            E-mail:
            <Input
              value={inputEmailValue || ""}
              onChange={(e) => setinputEmailValue(e.target.value)}
              id="email"
              type="email"
              placeholder="Informe o seu E-mail"
              required
            />
          </label>
          <Button
            className="hover_transparent"
            fontSize="14px"
            textTransform="uppercase"
          >
            Enviar
          </Button>
        </form>

        {/* Exibição de mensagens */}
        {message && <p className={styles.success}>{message}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        {/* // <Link href={'/login'} >
                //     Já tem uma conta? <strong>Logar-se</strong>
                // </Link> */}
      </div>
    </main>
  );
}
