"use client";
import StudyReport from "@/components/StudyReport";

import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div>
        <h1
          style={{ color: "#ee6b6e", fontSize: 18, textTransform: "uppercase" }}
        >
          Necessita estar logado para acessar essa página.
        </h1>
      </div>
    );
  }

  return <StudyReport userId={user.uid} />;
}
