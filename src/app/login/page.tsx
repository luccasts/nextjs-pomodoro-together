"use client";
import { sendEmailVerification, User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { loginUser } from "@/firebase/loginUser";

export default function Login() {
  const router = useRouter();

  const [inputEmailValue, setinputEmailValue] = useState("");
  const [inputPasswordValue, setinputPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>("");
  const [user, setUser] = useState<User | null>(null);
  async function validateEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await loginUser(
      inputEmailValue,
      inputPasswordValue,
      setUser
    );
    if (result.success) {
      setMessage("Usuário logado com sucesso!");
      router.push("/");
      setErrorMessage(null);
    } else {
      setErrorMessage(result.message);
      setMessage(null);
    }
  }

  async function resendVerificationEmail() {
    if (user) {
      try {
        await sendEmailVerification(user);
        setMessage("E-mail de verificação reenviado com sucesso!");
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error + "Erro ao reenviar o e-mail de verificação.");
      }
    }
  }
  return (
    <main className={styles.main}>
      <div className={styles.containerForm}>
        <h1>Login page</h1>
        <form onSubmit={(e) => validateEmail(e)}>
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
          <label htmlFor="password">
            Senha:
            <Input
              value={inputPasswordValue || ""}
              onChange={(e) => setinputPasswordValue(e.target.value)}
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
            Entrar
          </Button>
          <Link href={"/reset-password"}>
            <u>Esqueceu a senha?</u>
          </Link>
        </form>

        {message && <p className="success">{message}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        {!user?.emailVerified && user && (
          <Button
            padding="14px"
            fontSize="1rem"
            className="hover_transparent"
            onClick={resendVerificationEmail}
          >
            Enviar verificação
          </Button>
        )}

        <Link href={"/registrar"}>
          {" "}
          Não tem conta? <strong>Registra-se </strong>
        </Link>
      </div>
    </main>
  );
}
