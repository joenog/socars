import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConnection";
import { FiPhoneIncoming } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react"

interface CarProps {
  id: string;
  name: string;
  year: string;
  model: string;
  city: string;
  descriptiom: string;
  created: string;
  price: string | number;
  owner: string;
  km: string;
  uid: string;
  whatsapp: string;
  images: CarImageProps[];
}

interface CarImageProps {
  uid: string;
  name: string;
  url: string;
}

export default function CarDetail() {
  const { id } = useParams();
  const [ car, setCar ] = useState<CarProps | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCar() {
      if (!id) { return; }

      const docRef = doc(db, "cars", id);
      getDoc(docRef)
      .then((snapshot) => {
        if(!snapshot.exists()) {
          navigate("/");
        }

        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          model: snapshot.data()?.model,
          city: snapshot.data()?.city,
          descriptiom: snapshot.data()?.descriptiom,
          created: snapshot.data()?.created,
          price: snapshot.data()?.price,
          owner: snapshot.data()?.owner,
          km: snapshot.data()?.km,
          uid: snapshot.data()?.uid,
          whatsapp: snapshot.data()?.whatsapp,
          images: snapshot.data()?.images,
        });
        console.log(snapshot.data())
      });
    }
    loadCar();
  }, [id, navigate]);

  return (
    <Container>
     {car && (
       <Swiper
        slidesPerView={2}
        pagination={ {clickable: true} }
        navigation
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          }
        }}
      >
        {car?.images?.map(image => (
          <SwiperSlide key={image.name}>
            <img 
              src={image.url} 
              className="w-full h-72 md:h-96 rounded-md object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
     )}

      {car && (
        <main className="w-full bg-white rounded-md p-6 my-6">
          <div className="flex flex-row mb-4 items-center justify-between">
            <h1 className="text-xl font-bold">{car?.name}</h1>
            <h1 className="text-xl font-bold">
              {Number(car?.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </h1>
          </div>
          <p>{car?.model}</p>

          <div className="w-full flex gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p>Km</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p>{car?.descriptiom}</p>
          </div>

          <strong>
            <p className="text-zinc-600">{car?.whatsapp}</p>
            <a
              href={`https://api.whatsapp.com/send?phone=${car.whatsapp}&text=${encodeURIComponent(`Oi, vi esse ${car.model} e fiquei interessado!`)}`}
              target="_blank"
              className="w-full md:max-w-38 flex justify-center items-center bg-green-500 gap-4 p-2 rounded-lg px-4 hover:bg-green-600 transition-all duration-100"
            >
              Whatsapp
              <FiPhoneIncoming size={22} />
            </a>
          </strong>
        </main>
      )}
    </Container>
  );
}
