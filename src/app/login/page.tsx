"use client";
import { app } from "@/lib/firebase";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import { FirebaseError } from "firebase/app";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function Login() {
  const router = useRouter();

  const [inputEmailValue, setinputEmailValue] = useState("");
  const [inputPasswordValue, setinputPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User | null>(null);
  async function validateEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        inputEmailValue,
        inputPasswordValue
      );
      const loggedUser = userCredential.user;
      setUser(loggedUser);

      if (loggedUser.emailVerified) {
        setMessage("Usuário logado com sucesso!");
        router.push("/");
      } else {
        setErrorMessage(
          "E-mail não confirmado. Verifique sua caixa de entrada para confirmar o e-mail. "
        );
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(`${errorCode} - ${errorMessage}`);
      } else {
        setErrorMessage(
          "Ocorreu um erro ao tentar realizar o login. Tente novamente."
        );
      }
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

        {message && <p style={{ color: "green" }}>{message}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        {!user?.emailVerified && user && (
          <button onClick={resendVerificationEmail}>Reenviar E-mail</button>
        )}

        <Link href={"/registrar"}>
          {" "}
          Não tem conta? <strong>Registra-se </strong>
        </Link>
      </div>
    </main>
  );
}
