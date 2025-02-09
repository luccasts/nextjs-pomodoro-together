/* eslint-disable @typescript-eslint/no-explicit-any */
import { FirebaseError } from "firebase/app";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function loginUser(email: string, password: string, setUser: any) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const loggedUser = userCredential.user;

    if (loggedUser.emailVerified) {
      setUser(loggedUser);
      return {
        success: true,
        message: "Usuário logado com sucesso!",
      };
    } else {
      return {
        success: false,
        message:
          "E-mail não confirmado. Verifique sua caixa de entrada para confirmar o e-mail. ",
        auth: auth,
      };
    }
  } catch (error: unknown) {
    let errorMessage = "Ocorreu um erro no login do usuário.";
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential":
          return {
            success: false,
            message:
              "E-mail ou senha incorretos. Verifique os dados e tente novamente.",
          };

        case "auth/user-not-found":
          return {
            success: false,
            message:
              "Nenhuma conta encontrada com esse e-mail. Verifique se está correto.",
          };

        case "auth/wrong-password":
          return {
            success: false,
            message: "Senha incorreta. Tente novamente ou redefina sua senha.",
          };

        case "auth/too-many-requests":
          return {
            success: false,
            message:
              "Muitas tentativas de login. Tente novamente mais tarde ou redefina sua senha.",
          };
      }
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
