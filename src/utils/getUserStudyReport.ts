import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

export async function getUserStudyReport(
  userId: string,
  period: "daily" | "weekly"
) {
  if (!userId) return [];

  try {
    // Obtendo a data atual no UTC sem hora/minuto/segundo
    const now = new Date();
    const todayUTC = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    );

    // Definindo a data de uma semana atrás no UTC
    const lastWeekUTC = new Date(todayUTC);
    lastWeekUTC.setDate(todayUTC.getDate() - 7);

    // Convertendo para Timestamp do Firestore
    const todayTimestamp = Timestamp.fromDate(todayUTC);
    const lastWeekTimestamp = Timestamp.fromDate(lastWeekUTC);

    // Caminho correto para a coleção
    const sessionsRef = collection(db, "studySessions", userId, "sessions");

    // Criando a query correta com Timestamp
    const q = query(
      sessionsRef,
      where(
        "date",
        ">=",
        period === "weekly" ? lastWeekTimestamp : todayTimestamp
      )
    );
    const querySnapshot = await getDocs(q);

    // Mapeando os dados retornados e garantindo que os valores existam
    const studyData = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        studyTime: data.studyTime || 0, // Garante que sempre há um valor numérico
        date: data.date || null, // Se não houver data, deixa como null para depuração
        sessions: Array.isArray(data.sessions) ? data.sessions : [], // Garante que seja um array
      };
    });
    console.log(studyData);
    return studyData;
  } catch (error) {
    console.error("Erro ao buscar o relatório de estudo:", error);
    return [];
  }
}
