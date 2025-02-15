"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

import styles from "./ProfileUpload.module.scss";

export default function ProfileUpload({ userId }: { userId: string }) {
  const [uploading, setUploading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      showAlertMessage("O arquivo é muito grande! Escolha um menor que 2MB.");
      return;
    }

    try {
      setUploading(true);

      // Obtém extensão do arquivo (ex: png, jpg, gif, webp)
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`; // Nome aleatório
      const filePath = `avatars/${fileName}`; // Caminho no Supabase Storage

      // Upload da imagem para o Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Obtém a URL pública do arquivo
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      const imageUrl = data.publicUrl;

      // Salva a URL da imagem no banco de dados do Supabase
      const { error: dbError } = await supabase
        .from("users")
        .update({ profile_picture: imageUrl })
        .eq("id", userId);

      if (dbError) throw dbError;

      showAlertMessage("Imagem atualizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      showAlertMessage("Erro ao fazer upload da imagem.");
    } finally {
      setUploading(false);
    }
  };

  const showAlertMessage = (
    message: string,
    _type: "error" | "success" = "error"
  ) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500); // Esconde após 2.5s
    setTimeout(() => setAlertMessage(null), 3000); // Remove da tela
  };

  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p className={styles.loadingText}>Enviando...</p>}
      {alertMessage && (
        <div className={`${styles.alertBox} ${!showAlert ? styles.hide : ""}`}>
          {alertMessage}
        </div>
      )}
    </div>
  );
}
