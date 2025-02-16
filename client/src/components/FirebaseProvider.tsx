import { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      console.log("Initializing Firebase Auth listener...");
      const unsubscribe = onAuthStateChanged(auth, 
        (user) => {
          console.log("Auth state changed:", user ? "User logged in" : "No user");
          setUser(user);
          setLoading(false);
        },
        (error) => {
          console.error("Auth state change error:", error);
          setLoading(false);
        }
      );

      return () => {
        console.log("Cleaning up auth listener...");
        unsubscribe();
      };
    } catch (error) {
      console.error("Error setting up Firebase Auth:", error);
      setLoading(false);
      toast({
        title: "Erro na inicialização",
        description: "Houve um problema ao inicializar a autenticação.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const signInWithGoogle = async () => {
    try {
      console.log("Attempting Google sign in...");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("Google sign in successful:", result.user);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        title: "Erro ao entrar com Google",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      console.log("Attempting email sign in...");
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Email sign in successful:", result.user);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      });
    } catch (error) {
      console.error("Error signing in with email:", error);
      toast({
        title: "Erro ao entrar",
        description: "Email ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      console.log("Attempting email sign up...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      console.log("Email sign up successful:", userCredential.user);
      toast({
        title: "Conta criada com sucesso!",
        description: "Por favor, verifique seu email para ativar sua conta.",
      });
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Erro ao criar conta",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const logout = async () => {
    try {
      console.log("Attempting logout...");
      await signOut(auth);
      console.log("Logout successful");
      toast({
        title: "Logout realizado com sucesso",
        description: "Até logo!",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erro ao sair",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a FirebaseProvider");
  }
  return context;
}