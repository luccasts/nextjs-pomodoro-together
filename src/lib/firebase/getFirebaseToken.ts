import { getAuth } from "firebase/auth";

export async function getFirebaseToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");
  if (user.emailVerified) {
    return await user.getIdToken(true);
  }
  throw new Error("O usuário precisa estar verificado!");
}
