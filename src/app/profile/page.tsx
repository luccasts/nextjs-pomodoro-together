"use client";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.scss";
export default function Profile() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{ color: "#ee6b6e", fontSize: 38, textTransform: "uppercase" }}
        >
          Necessita estar logado para acessar essa página.
        </h1>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <section>
        <h1>Informações de Perfil</h1>
        <p>
          E-Mail: {user.email} <span>Editar</span>
        </p>
        <p>
          {user.displayName ? user.displayName : "VC NÃO TEM NOME "}
          <span>Editar</span>
        </p>
        <p>
          {user.photoURL ? user.photoURL : "VOCê NÃO TEM FOTO DE PERFIL "}
          <span>Editar</span>
        </p>
      </section>
    </main>
  );
}
