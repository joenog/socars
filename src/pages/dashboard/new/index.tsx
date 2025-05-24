import { type ChangeEvent, useContext, useState } from "react";
import { FiTrash, FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import DashboardHeader from "../../../components/panelHeader";
import { v4 as uuidV4 } from "uuid"; // biblioteca uid unic
import { storage, db } from "../../../services/firebase/firebaseConnection"; // storage from firebase reference
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { useForm } from "react-hook-form";
import Input from "../../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../components/context/AuthContext";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório!"),
  model: z.string().min(1, "O modelo do veículo é obrigátorio!"),
  year: z.string().min(1, "O ano do veículo é obrigatório!"),
  km: z.string().min(1, "O Km do veículo é obrigatório!"),
  price: z.string().min(1, "O preço é obrigatório!"),
  city: z.string().min(1, "A cidade é obrigatória!"),
  tel: z
    .string()
    .min(1, "O telefone / whatsapp é o brigatório!")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "O número deve conter apenas dígitos e ter 11 ou 12 números!",
    }),
  description: z.string().min(1, "A descrição é obrigatória"),
});

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

export default function New() {
  const { user } = useContext(AuthContext);
  const [carImages, setCarImages] = useState<ImageItemProps[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    if (carImages.length === 0) {
      alert("Adicione imagens antes de enviar!");
      return;
    }

    const carListImage = carImages.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      };
    });
    //adcionando novo carro completo ao DB
    addDoc(collection(db, "cars"), {
      name: data.name.toUpperCase(),
      model: data.model,
      year: data.year,
      km: data.km,
      price: data.price,
      city: data.city,
      tel: data.tel,
      descriptiom: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImage,
    })
      .then(() => {
        reset();
        setCarImages([]);
        console.log("Carro adicionado!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        handleUpload(image);
      } else {
        alert("Envie uma imagem válida!");
        return;
      }
    }
  }

  //subindo images to storage/firebase
  async function handleUpload(image: File) {
    if (!user?.uid) {
      alert("Não ha usuarios, nao pode enviar imagem");
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `image/${currentUid}/${uidImage}`);
    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downLoadUrl) => {
        const ImageItem = {
          name: uidImage,
          uid: currentUid,
          previewUrl: URL.createObjectURL(image),
          url: downLoadUrl,
        };

        setCarImages((images) => [...images, ImageItem]);
      });
    });
  }

  async function handleDeleteImage(item: ImageItemProps) {
    const imagePath = `image/${item.uid}/${item.name}`;

    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImages(carImages.filter((car) => car.url !== item.url));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <DashboardHeader />
      <div className="w-full flex flex-col gap-2 sm:flex-row bg-white p-3 rounded-md items-center">
        <button className="border-2 w-48 md:w-48 rounded-lg h-32 flex items-center justify-center cursor-pointer border-gray-700">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="grey" />
          </div>
          <div className="cursor-pointer">
            <input
              className="opacity-0 cursor-pointer h-30 min-h-32"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
          </div>
        </button>

        {carImages.map((item) => (
          <div
            key={item.name}
            className="w-full flex h-32 relative items-center justify-center"
          >
            <button
              onClick={() => handleDeleteImage(item)}
              className="absolute p-2 text-transparent hover:text-red-600 hover:bg-amber-50 rounded-xl"
            >
              <FiTrash size={25} />
            </button>
            <img
              className="rounded-md w-full h-32 object-cover"
              src={item.previewUrl}
              alt="foto-do-carro"
            />
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col sm:flex-row bg-white p-3 rounded-md items-center gap-2 mt-2 mb-20">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
          <div className="mb-3">
            <p>Nome do veículo</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Fiat"
            />
          </div>

          <div className="mb-3">
            <p>Modelo do veículo</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: Argo 1.0"
            />
          </div>

          <div className="w-full flex flex-row gap-3 items-center mb-3">
            <div>
              <p>Ano do veículo</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2024/2025"
              />
            </div>

            <div>
              <p>Km do veículo</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 16.500"
              />
            </div>
          </div>

          <div className="w-full flex flex-row gap-3 items-center mb-3">
            <div>
              <p>Celular / Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="tel"
                error={errors.tel?.message}
                placeholder="Ex:011999456636"
              />
            </div>

            <div>
              <p>Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Campinas/SP"
              />
            </div>
          </div>

          <div className="mb-3">
            <p>Preço do veículo</p>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
            />
          </div>

          <div className="mb-3">
            <p className="mb-2">Descrição</p>

            <textarea
              className="border-1 w-full rounded-md h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Ex: Digite a descrição completa sobre o veículo"
            />
            {errors.description && (
              <p className="mb-2 text-red-500">
                {" "}
                {errors.description?.message}{" "}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full md:w-auto rounded-md bg-zinc-500 text-white p-1 px-4 cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  );
}
