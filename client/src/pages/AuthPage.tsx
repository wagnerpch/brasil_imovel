import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/FirebaseProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SiGoogle } from "react-icons/si";

const authSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, user } = useAuth();
  const [, setLocation] = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  if (user) {
    setLocation("/");
    return null;
  }

  const onSubmit = async (data: AuthFormData) => {
    if (isLogin) {
      await signInWithEmail(data.email, data.password);
    } else {
      await signUpWithEmail(data.email, data.password);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              {isLogin ? "Entrar" : "Criar Conta"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Senha"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isLogin ? "Entrar" : "Criar Conta"}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  Ou continue com
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={signInWithGoogle}
              className="w-full"
            >
              <SiGoogle className="w-5 h-5 mr-2" />
              Google
            </Button>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
              >
                {isLogin ? "Crie uma agora" : "Entre aqui"}
              </button>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="hidden lg:flex flex-1 bg-primary items-center justify-center p-12 text-white">
        <div className="max-w-lg">
          <h2 className="text-3xl font-bold mb-4">
            Encontre ou anuncie seu imóvel ideal
          </h2>
          <p className="text-lg opacity-90">
            Anuncie gratuitamente, favorite os imóveis que mais gostar e
            compartilhe com amigos e familiares.
          </p>
        </div>
      </div>
    </div>
  );
}
