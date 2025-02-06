import { getUserStudyReport } from "@/utils/getUserStudyReport";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StudySession {
  id: string;
  date: string;
  studyTime: number; // Tempo armazenado em segundos
}

interface StudyReportProps {
  userId: string;
}

export default function StudyReport({ userId }: StudyReportProps) {
  const [report, setReport] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"daily" | "weekly">("daily");

  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      setLoading(true);
      try {
        const data: StudySession[] = await getUserStudyReport(userId, period);
        console.log(data);
        // Garantir que todas as propriedades existam e converter studyTime para minutos
        const convertedData = data.map((session) => ({
          ...session, // Mantém id e date
          studyTime: Math.floor(session.studyTime / 60), // Convertendo para minutos
        }));
        setReport(convertedData);
      } catch (error) {
        console.error("Erro ao buscar histórico de estudos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, period]);

  // Função para formatar o tempo no tooltip do gráfico
  const formatStudyTime = (timeInMinutes: number) => {
    if (timeInMinutes < 60) {
      return `${timeInMinutes}m`; // Exibe apenas minutos
    } else {
      const hours = Math.floor(timeInMinutes / 60);
      const minutes = timeInMinutes % 60;
      return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`; // Exibe horas e minutos
    }
  };

  return (
    <div className={styles.studyReport}>
      <h2>📊 Histórico de Estudos</h2>

      <div className={styles.buttons}>
        <button
          onClick={() => setPeriod("daily")}
          disabled={period === "daily"}
        >
          📅 Diário
        </button>
        <button
          onClick={() => setPeriod("weekly")}
          disabled={period === "weekly"}
        >
          📆 Semanal
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : report.length > 0 ? (
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={report}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={formatStudyTime} />{" "}
              {/* Formatar valores do eixo Y */}
              <Tooltip
                formatter={(value) => formatStudyTime(value as number)}
              />
              <Bar dataKey="studyTime" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>🚀 Nenhum estudo registrado.</p>
      )}
    </div>
  );
}
