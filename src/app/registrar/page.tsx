"use client";
import { app, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import Link from "next/link";
import { FormEvent, useState } from "react";
import styles from "./page.module.scss";
import { FirebaseError } from "firebase/app";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { doc, setDoc } from "firebase/firestore";
import { registerUser } from "@/utils/registerUser";
export default function Registrar() {
  const [inputUserValue, setInputUserValue] = useState("");
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  async function validateEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const auth = getAuth(app);

    try {
      // await registerUser(inputUserValue, inputEmailValue, inputPasswordValue)
      // const usersRef = collection(db, "users");
      // const q = query(usersRef, where("name", "==", inputUserValue));
      // const querySnapshot = await getDocs(q);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputEmailValue,
        inputPasswordValue
      );

      const user = userCredential.user;
      await sendEmailVerification(user);
      // await setDoc(doc(db, "users", user.uid), {
      //   name: inputUserValue,
      //   totalStudyTime: 0, // Pode usar para rastrear o tempo de estudo
      //   createdAt: new Date(),
      // });
      setMessage(
        "Conta criada com sucesso! Verifique seu e-mail para ativá-la."
      );
      setErrorMessage(null);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setErrorMessage(`Erro: ${error.code} - ${error.message}`);
      } else {
        setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
      }
      setMessage(null);
    }
  }
  return (
    <main className={styles.main}>
      <div className={styles.containerForm}>
        <h1>Criar conta</h1>
        <form onSubmit={(e) => validateEmail(e)}>
          <label htmlFor="user">
            User:
            <Input
              value={inputUserValue || ""}
              onChange={(e) => setInputUserValue(e.target.value)}
              id="user"
              type="user"
              placeholder="Informe o seu User"
              required
            />
          </label>
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
        {message && <p className={styles.success}>{message}</p>}
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <Link href={"/login"}>
          Já tem uma conta? <strong>Logar-se</strong>
        </Link>
      </div>
    </main>
  );
}
