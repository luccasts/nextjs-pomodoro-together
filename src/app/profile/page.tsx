"use client";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.scss";

export default function Profile() {
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
      </section>
    </main>
  );
}
