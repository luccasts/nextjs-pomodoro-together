import { auth, db } from "../../firebase";
import { addDoc, collection, doc } from "firebase/firestore";

export async function savePomodoroSession(duration: number) {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await addDoc(collection(doc(db, "users", user.uid), "sessions"), {
      startTime: new Date(),
      duration,
      date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    });
    console.log("Sessão salva com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar sessão:", error);
  }
}
