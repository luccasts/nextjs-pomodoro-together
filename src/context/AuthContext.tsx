"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";

// Context Type
interface AuthContextProps {
  user: User | null;
  loading: boolean;
  erro?: Error;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (auth.currentUser?.emailVerified) {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "Erro na recuperação de dados no contexto de login do usuário"
    );
  }
  return context;
};

export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.reload();
      console.log("Deslogado com sucesso");
    })
    .catch((error) => {
      // An error happened.
      console.log("error", error);
    });
};
