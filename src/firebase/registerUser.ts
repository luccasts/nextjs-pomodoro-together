import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { FirebaseError } from "firebase/app";

export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Salva os dados do usuário no Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      createdAt: new Date(),
    });

    return { success: true, message: "Usuário registrado com sucesso!" };
  } catch (error: unknown) {
    let errorMessage = "Ocorreu um erro ao registrar o usuário.";

    if (error instanceof FirebaseError) {
      console.error("Erro do Firebase:", error.code, error.message);
      errorMessage = error.message;
    } else if (error instanceof Error) {
      console.error("Erro desconhecido:", error.message);
      errorMessage = error.message;
    }

    return { success: false, message: errorMessage };
  }
}
