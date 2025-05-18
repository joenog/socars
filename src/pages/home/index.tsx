import { useState, useEffect } from "react";
import { Container } from "../../components/container";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConnection";
import { Link } from "react-router-dom";
import { FiImage } from "react-icons/fi";

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

export default function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created"));

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
      });
    }
    loadCars();
  }, []);

  //load conditional loadImages
  function handleImageLoad(id: string) {
    setLoadImages((prevImagesLoaded) => [...prevImagesLoaded, id]);
  }

  return (
    <Container>
      <section className="w-full flex mx-auto justify-between items-center max-w-4xl bg-white rounded-lg">
        <input
          className="p-2 h-8 outline-none w-full"
          placeholder="Digite o nome do carro..."
        />
        <button className="p-2 text-gray-800">Buscar</button>
      </section>

      <h1 className="font-bold text-center my-4 text-zinc-400">
        Carros novos e usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {cars.map((item) => (
          <Link key={item.id} to={`/car/${item.id}`}>
            <section className="w-full bg-white rounded-xl p-2">
              {/*after image load*/}
              <div
                className="w-full p-5 bg-slate-200 fadeIn rounded-md h-72"
                style={{
                  display: loadImages.includes(item.id) ? "none" : "block",
                }}
              >
                <FiImage color="white" size={30} />
              </div>

              <div className="fadIn bg-zinc-200">
                <img
                  className="rounded-md w-full mb-2 max-h-72 hover:scale-105 transition-all z-10"
                  style={{
                    display: loadImages.includes(item.id) ? "block" : "none",
                  }}
                  src={item.images[0].url}
                  alt="img-carro"
                  onLoad={() => handleImageLoad(item.id)}
                />
              </div>

              <p className="font-bold mt-1 mb-2 px-2"> {item.name} </p>
              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">
                  {" "}
                  Ano {item.year} | {item.year} km
                </span>
                <strong className="text-black text-xl">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(item.price))}
                </strong>
              </div>
              <div className="w-full h-px bg-slate-300 my-2"></div>
              <div className="px-2 text-zinc-800">
                <span>{item.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}
