"use client";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { resetPasswordUser } from "@/firebase/resetPasswordUser";

export default function ResetPassoword() {
  const [inputEmailValue, setinputEmailValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  async function resetPassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await resetPasswordUser(inputEmailValue);
    if (result.success) {
      setMessage(result.message);
      setErrorMessage(null);
    } else {
      setErrorMessage(result.message);
      setMessage(null);
    }
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
        {message && <p className="success">{message}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        {/* // <Link href={'/login'} >
                //     Já tem uma conta? <strong>Logar-se</strong>
                // </Link> */}
      </div>
    </main>
  );
}
