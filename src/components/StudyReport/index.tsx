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
import Modal from "../ui/Modal";
import { useModalContext } from "@/context/ModalContext";

interface StudySession {
  id: string;
  date: string;
  studyTime: number; // Tempo armazenado em segundos
}

interface StudyReportProps {
  userId: string | null;
}

export default function StudyReport({ userId }: StudyReportProps) {
  const [report, setReport] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"daily" | "weekly">("daily");

  const { isTheStudyReportModalOpen, setIsTheStudyReportOpen } =
    useModalContext();
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      setLoading(true);
      try {
        const data: StudySession[] = await getUserStudyReport(userId, period);

        // Gerar a semana completa
        const completeWeek = generateCompleteWeek();
        if (period === "weekly") {
          const convertedData = completeWeek.map((day) => {
            const studySession = data.find(
              (session) => session.date === day.date
            );
            return {
              date: day.date,
              studyTime: studySession
                ? Number((studySession.studyTime / 60).toFixed(1))
                : 0, // Convertendo para minutos
            };
          });

          setReport(convertedData);
        } else if (period == "daily") {
          const convertedData = data.map((session) => ({
            ...session, // Mantém id e date
            studyTime: Number((session.studyTime / 60).toFixed(1)), // Convertendo para minutos
          }));
          setReport(convertedData);
        }
      } catch (error) {
        console.error("Erro ao buscar histórico de estudos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, period]);

  // Função para gerar a semana completa
  const generateCompleteWeek = () => {
    const daysOfWeek = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() - 1); // Começa no domingo
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      daysOfWeek.push({
        date: day.toISOString().split("T")[0], // Formato YYYY-MM-DD
      });
    }

    return daysOfWeek;
  };

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
  const generateLastSixDays = () => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      days.push({
        date: day.toISOString().split("T")[0], // Formato YYYY-MM-DD
        studyTime: 0, // Tempo zerado
      });
    }

    return days;
  };
  return (
    <Modal
      isTheModalOpen={isTheStudyReportModalOpen}
      setIsTheModalOpen={setIsTheStudyReportOpen}
    >
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
        {userId ? null : (
          <div>
            <h3>Precisa estar logado para registrar o tempo.</h3>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={generateLastSixDays()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={formatStudyTime} />
                  <Tooltip
                    formatter={(value) => formatStudyTime(value as number)}
                  />
                  <Bar dataKey="studyTime" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {userId && loading ? (
          <p>Carregando...</p>
        ) : report.length > 0 ? (
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={report}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={formatStudyTime} />
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
    </Modal>
  );
}
