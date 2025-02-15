import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./client";
import { FirebaseError } from "firebase/app";

export async function resetPasswordUser(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message:
        "E-mail para redefinição de senha enviado com sucesso! Verifique sua caixa de entrada ou pasta de spam.",
    };
  } catch (error: unknown) {
    let errorMessage = "Ocorreu um erro na mudança de senha do usuário.";
    if (error instanceof FirebaseError) {
      errorMessage = error.message;
      switch (error.code) {
        case "auth/invalid-email":
          return {
            success: false,
            message:
              "O e-mail informado não é válido. Por favor, verifique e tente novamente.",
          };
      }
      return {
        success: false,
        message:
          "Ocorreu um erro ao tentar enviar o e-mail. Tente novamente mais tarde.",
      };
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}
