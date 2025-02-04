import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export async function getDailyReport() {
  const user = auth.currentUser;
  if (!user) return;

  const today = new Date().toISOString().split("T")[0]; // Data atual YYYY-MM-DD
  const sessionsRef = collection(db, "users", user.uid, "sessions");
  const q = query(sessionsRef, where("date", "==", today));

  try {
    const querySnapshot = await getDocs(q);
    let totalMinutes = 0;

    querySnapshot.forEach((doc) => {
      totalMinutes += doc.data().duration;
    });

    console.log(`Total de minutos estudados hoje: ${totalMinutes}`);
    return totalMinutes;
  } catch (error) {
    console.error("Erro ao recuperar relatório diário:", error);
  }
}
