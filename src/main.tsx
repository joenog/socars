import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./components/context/AuthContext.tsx";
import App from "./App.tsx";
import "./index.css";

import { register } from "swiper/element/bundle"
register();

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
