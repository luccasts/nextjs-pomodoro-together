import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export const uploadImage = async (file: File) => {
  if (!file) return;

  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("Usuário não autenticado");

  const storage = getStorage();
  const storageRef = ref(storage, `users/${user.uid}/profile`);

  // Faz o upload da imagem
  await uploadBytes(storageRef, file);

  // Obtém a URL da imagem
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const saveProfilePicture = async (userId: string, imageUrl: string) => {
  const db = getFirestore();
  const userDoc = doc(db, "users", userId);
  await updateDoc(userDoc, { profilePicture: imageUrl });
};
