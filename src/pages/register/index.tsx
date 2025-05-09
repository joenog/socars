import { Container } from "../../components/container";
import logoImg from "../../assets/socars-logo.png";
import { Link } from "react-router-dom";
import Input from "../../components/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Register() {

  const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório!"),
    email: z.string().email("Insira um email válido!").nonempty("O campo email é obrigatório!"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres").nonempty("O campo senha é obrigatório!")
  })

  type FormData = z.infer<typeof schema>

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }

    return(
      <Container>
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <Link className="items-center mb-2" to={"/"}>
            <img src={logoImg} alt="logo-site" />
          </Link>

          <form className="w-full md:max-w-xl my-8 p-4 bg-white rounded-md" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-2 text-center text-zinc-900">Criar conta</h1>
            <div className="mb-3">
              <Input
               type="text"
               placeholder="Digite seu nome completo"
               name="name"
               error={errors.name?.message}
               register={register}
              />
            </div>

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


            <button className="w-full p-2 bg-gray-600 rounded-md text-white">
              Registrar
            </button>
          </form>

          <Link className=" text-zinc-600 underline" to={"/login"}>
                Já possiu uma conta? Faça o Login!
          </Link>
        </div>
      </Container>
    )
  }