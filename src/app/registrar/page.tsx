"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { registerUser } from "@/firebase/registerUser";

export default function Registrar() {
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  async function validateEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await registerUser(inputEmailValue, inputPasswordValue);
    if (result.success) {
      setMessage(
        "Usuário registrado com sucesso! Verifique seu e-mail para confirmação."
      );
      setErrorMessage(null);
    } else {
      setErrorMessage(result.message);
      setMessage(null);
    }
  }
  return (
    <main className={styles.main}>
      <div className={styles.containerForm}>
        <h1>Criar conta</h1>
        <form onSubmit={(e) => validateEmail(e)}>
          <label htmlFor="email">
            E-mail:
            <Input
              value={inputEmailValue || ""}
              onChange={(e) => setInputEmailValue(e.target.value)}
              id="email"
              type="email"
              placeholder="Informe o seu E-mail"
              required
            />
          </label>

          <label htmlFor="password">
            Senha:
            <Input
              value={inputPasswordValue || ""}
              onChange={(e) => setInputPasswordValue(e.target.value)}
              minLength={6}
              id="password"
              type="password"
              placeholder="Informe sua senha "
              required
            />
          </label>

          <Button
            className="hover_transparent"
            fontSize="14px"
            textTransform="uppercase"
          >
            Criar Conta
          </Button>
        </form>

        {/* Exibição de mensagens */}
        {message && <p className={"success"}>{message}</p>}
        {errorMessage && <p className={"error"}>{errorMessage}</p>}

        <Link href={"/login"}>
          Já tem uma conta? <strong>Logar-se</strong>
        </Link>
      </div>
    </main>
  );
}
