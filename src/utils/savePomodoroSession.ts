import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
  collection,
} from "firebase/firestore";
import { db } from "../lib/firebase/client";

// Salva ou atualiza o tempo estudado no Firestore
export async function savePomodoroSession(
  userId: string,
  studyDuration: number
) {
  if (!userId || studyDuration <= 0) return;

  try {
    // const today = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Garante que estamos pegando só a data, sem horário
    const localDateString = today.toLocaleDateString("sv-SE"); // ✅ Formato YYYY-MM-DD no fuso do usuário

    // Referência do documento do usuário dentro da coleção "studySessions"
    const userDocRef = doc(db, "studySessions", userId);

    // Referência do documento de sessão do dia dentro da subcoleção "sessions"
    const sessionDocRef = doc(
      collection(userDocRef, "sessions"),
      localDateString
    );

    // Buscar documento da sessão do dia
    const sessionDoc = await getDoc(sessionDocRef);
    const now = new Date();
    // const utcDate = new Date(
    //   Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    // ); // Data sem horário em UTC antigo, errado.
    const timezoneOffset = now.getTimezoneOffset(); // Diferença em minutos do UTC
    const localDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ); // Mantém no fuso local
    console.log(localDate, " :LocalDATE");
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
        date: Timestamp.fromDate(localDate), // Salva a data em UTC
        timezoneOffset, // Salva o fuso do usuário em minutos
        studyTime: studyDuration,
        sessions: [studyDuration],
        createdAt: Timestamp.now(),
      });
    }
  } catch (error) {
    console.error("Erro ao salvar sessão de estudo:", error);
  }
}
