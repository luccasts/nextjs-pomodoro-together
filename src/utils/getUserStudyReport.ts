import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function getUserStudyReport(
  userId: string,
  period: "daily" | "weekly"
) {
  if (!userId) return [];

  try {
    const today = new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekDate = lastWeek.toISOString().split("T")[0];

    // Caminho correto para a coleção
    const sessionsRef = collection(db, "studySessions", userId, "sessions");

    // Filtro correto com `date`
    const q = query(
      sessionsRef,
      where("date", ">=", period === "weekly" ? lastWeekDate : today)
    );

    const querySnapshot = await getDocs(q);

    const studyData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // console.log("📌 Registros encontrados:", studyData);
    return studyData;
  } catch (error) {
    console.error("Erro ao buscar o relatório de estudo:", error);
    return [];
  }
}
