import { getFirebaseToken } from "../firebase/getFirebaseToken";
import { supabase } from "./client";

export async function authSupabase() {
  const firebaseToken = await getFirebaseToken();

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "firebase",
    token: firebaseToken, // Envia o ID Token do Firebase
  });

  if (error) {
    console.error("Erro ao autenticar no Supabase:", error);
    return null;
  }

  console.log("Usuário autenticado no Supabase:", data);
  return data;
}
