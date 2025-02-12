"use client";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.scss";
import { useState } from "react";

export default function Profile() {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return (
      <div className={styles.centeredContainer}>
        <h1 className={styles.errorMessage}>
          Necessita estar logado para acessar essa página.
        </h1>
      </div>
    );
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setAlertMessage("O arquivo é muito grande! Escolha um menor que 2MB.");
      setShowAlert(true);

      setTimeout(() => setShowAlert(false), 2500); // Inicia fade-out
      setTimeout(() => setAlertMessage(null), 3000); // Remove da tela
      return;
    }

    console.log("Arquivo válido:", file);
    // Aqui você pode fazer o upload ou exibir a pré-visualização da imagem
  };

  return (
    <main className={styles.main}>
      <section className={styles.profileCard}>
        <h1>Informações de Perfil</h1>

        <div className={styles.profileInfo}>
          <p>
            <strong>E-Mail:</strong> {user.email} <span>Editar</span>
          </p>
          <p>
            <strong>Nome:</strong> {user.displayName || "Você não tem nome"}
            <span>Editar</span>
          </p>
          <p>
            <strong>Foto:</strong>{" "}
            {user.photoURL || "Você não tem foto de perfil"}
            <span>Editar</span>
          </p>
        </div>

        <input
          type="file"
          accept="image/gif, image/png, image/jpeg"
          className={styles.fileInput}
          onChange={handleFileChange}
        />

        {alertMessage && (
          <div
            className={`${styles.alertBox} ${!showAlert ? styles.hide : ""}`}
          >
            {alertMessage}
          </div>
        )}
      </section>
    </main>
  );
}
