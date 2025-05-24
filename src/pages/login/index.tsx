import { Container } from "../../components/container";
import logoImg from "../../assets/socars-logo.png";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../../services/firebase/firebaseConnection";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const schema = z.object({
    email: z
      .string()
      .email("Insira um email válido!")
      .nonempty("O campo email é obrigatório!"),
    password: z.string().nonempty("O campo senha é obrigatório!"),
  });

  useEffect(() => {
    async function handleLogOut() {
      await signOut(auth);
    }
    handleLogOut();
  }, []);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("Logado com sucesso!")
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        console.log("Erro ao logar!");
        toast.error("Algo está errado!")
        console.error(err);
      });
  }

  return (
    <Container>
      <div className="flex flex-col w-full justify-center items-center gap-4">
        <Link className="items-center mb-2" to={"/"}>
          <img src={logoImg} alt="logo-site" />
        </Link>

        <form
          className="w-full md:max-w-xl my-8 p-4 bg-white rounded-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu email"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button className="w-full p-2 bg-gray-800 rounded-md text-white cursor-pointer">
            Acessar
          </button>
        </form>

        <Link className=" text-zinc-600 underline" to={"/register"}>
          Não possiu uma conta? Registre-se agora!
        </Link>
      </div>
    </Container>
  );
}
