import { useEffect, useState, useContext } from "react";
import { Container } from "../../components/container";
import DashboardHeader from "../../components/panelHeader";
import { FiTrash } from "react-icons/fi";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebase/firebaseConnection";
import { AuthContext } from "../../components/context/AuthContext";
import { ref, deleteObject } from "firebase/storage";

interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}

interface CarImageProps {
  uid: string;
  name: string;
  url: string;
}

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user?.uid));

      getDocs(queryRef).then((snapshot) => {
        const listCars = [] as CarProps[];

        snapshot.forEach((doc) => {
          listCars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid,
          });
        });
        setCars(listCars);
        console.log(listCars);
      });
    }
    loadCars();
  }, [user?.uid]);

  async function handleDeleteCar(car: CarProps) {
    const docRef = doc(db, "cars", car.id);
    await deleteDoc(docRef);

    // Deletando imagens do storage com Promise.all
    await Promise.all(
      car.images.map(async (image) => {
        const imagePath = `image/${image.uid}/${image.name}`;
        const imageRef = ref(storage, imagePath);
        try {
          await deleteObject(imageRef);
          // Remove o carro da useState
          setCars(cars.filter((item) => item.id !== car.id));
        } catch (err) {
          console.error("Erro ao excluir imagem:", err);
        }
      }),
    );
  }

  return (
    <Container>
      <DashboardHeader />
      <h1 className=" text-gray-400 text-center my-4">Meus Carros</h1>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((item) => (
          <section
            key={item.id}
            className="w-full bg-white rounded-md relative"
          >
            <button
              onClick={() => handleDeleteCar(item)}
              className="absolute p-1 rounded-sm bg-white hover:bg-red-950 transition-all duration-200 right-3 top-3 shadow-xl cursor-pointer"
            >
              <FiTrash size={20} color="#991F1F" />
            </button>

            <img
              className="w-full rounded-md mb-2 max-h-72"
              src={item.images[0].url}
              alt=""
            />

            <p className="font-bold mt-1 px-2 mb-2">{item.name}</p>

            <div className="flex flex-col px-2 pb-2">
              <span className="text-zinc-700">
                Ano {item.year} | {item.km} km
              </span>
            </div>
            <strong className="text-black mx-2 text-xl">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(item.price))}
            </strong>
            <div className="w-full h-px bg-slate-200 my-2"></div>
            <div className="px-2 pb-2">
              <span>{item.city}</span>
            </div>
          </section>
        ))}
      </main>
    </Container>
  );
}
