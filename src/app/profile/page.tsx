"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { uploadProfilePicture } from "@/firebase/uploadProfilePicture"; // Importa a função de upload
import styles from "./page.module.scss";

export default function Profile() {
  const { user } = useAuth();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    user?.photoURL || null
  );

  if (!user) {
    return (
      <div className={styles.main}>
        <h1 className={styles.warning}>
          Necessita estar logado para acessar essa página.
        </h1>
      </div>
    );
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setAlertMessage("O arquivo é muito grande! Escolha um menor que 2MB.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
      setTimeout(() => setAlertMessage(null), 3000);
      return;
    }

    try {
      const imageUrl = await uploadProfilePicture(file, user.uid);
      if (imageUrl) {
        setProfileImage(imageUrl); // Atualiza a imagem na tela
      }
    } catch (error) {
      console.error("Erro ao atualizar imagem:", error);
      setAlertMessage("Erro ao enviar a imagem.");
      setShowAlert(true);
    }
  };

  return (
    <main className={styles.main}>
      <section>
        <h1>Informações de Perfil</h1>
        <p>
          E-Mail: {user.email} <span>Editar</span>
        </p>
        <p>
          {user.displayName ? user.displayName : "Sem nome definido"}{" "}
          <span>Editar</span>
        </p>
        <div className={styles.profileImageContainer}>
          <img
            src={profileImage || "/images/default-avatar.jpg"}
            alt="Foto de perfil"
            className={styles.profileImage}
            width={100}
          />
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp, image/gif"
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
