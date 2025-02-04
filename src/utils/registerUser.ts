import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    // 🔍 Verifica se o nome já existe no Firestore
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return "Este nome de usuário já está em uso.";
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Salva os dados no Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      totalStudyTime: 0,
      createdAt: new Date(),
    });

    console.log("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
  }
}
