import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
  collection,
} from "firebase/firestore";
import { db } from "../../firebase";

// Salva ou atualiza o tempo estudado no Firestore
export async function savePomodoroSession(
  userId: string,
  studyDuration: number
) {
  if (!userId || studyDuration <= 0) return;

  try {
    const today = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

    // Referência do documento do usuário dentro da coleção "studySessions"
    const userDocRef = doc(db, "studySessions", userId);

    // Referência do documento de sessão do dia dentro da subcoleção "sessions"
    const sessionDocRef = doc(collection(userDocRef, "sessions"), today);

    // Buscar documento da sessão do dia
    const sessionDoc = await getDoc(sessionDocRef);

    if (sessionDoc.exists()) {
      // Se já existe uma sessão para o dia, apenas atualiza o tempo de estudo
      await updateDoc(sessionDocRef, {
        studyTime: sessionDoc.data().studyTime + studyDuration,
        sessions: [...sessionDoc.data().sessions, studyDuration], // Adiciona a nova sessão ao array
      });
    } else {
      // Se não existe, cria um novo documento de sessão para o dia
      await setDoc(sessionDocRef, {
        userId,
        date: today,
        studyTime: studyDuration,
        sessions: [studyDuration], // Armazena as sessões do dia em um array
        createdAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Erro ao salvar sessão de estudo:", error);
  }
}
