"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: "o-exorcista",
    titulo: "O Exorcista",
    imagem: "/assets/o-exorcista.png",
    descricao: "Uma jovem é possuída por uma entidade demoníaca...",
  },
  {
    id: "hereditario",
    titulo: "Hereditário",
    imagem: "/assets/hereditario.png",
    descricao: "Uma família começa a desvendar segredos sombrios após uma morte...",
  },
  {
    id: "a-bruxa",
    titulo: "A Bruxa",
    imagem: "/assets/a-bruxa.png",
    descricao: "Uma família enfrenta forças sobrenaturais na floresta...",
  },
  {
    id: "dracula",
    titulo: "Drácula",
    imagem: "/assets/dracula.png",
    descricao: "O clássico vampiro que atravessa séculos...",
  },
  {
    id: "o-iluminado",
    titulo: "O Iluminado",
    imagem: "/assets/o-iluminado.png",
    descricao: "Um hotel isolado revela horrores psicológicos...",
  },
  {
    id: "cthulhu",
    titulo: "O Chamado de Cthulhu",
    imagem: "/assets/o-chamado-de-cthulhu.png",
    descricao: "Horror cósmico além da compreensão humana...",
  },
];

export default function Detalhes() {
  const params = useParams();
  const item = items.find((i) => i.id === params.id);

  if (!item) {
    return <h1>Não encontrado</h1>;
  }

  return (
    <main style={styles.container}>

      {/* BOTÃO VOLTAR */}
      <Link href="/catalogo">
        <button className="back-btn">← Voltar ao catálogo</button>
      </Link>

      <h1 style={styles.title}>{item.titulo}</h1>

      <Image
        src={item.imagem}
        alt={item.titulo}
        width={300}
        height={450}
      />

      <p style={styles.desc}>{item.descricao}</p>

      {/* ESTILO DO BOTÃO */}
      <style jsx>{`
        .back-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 10px 16px;
          background: transparent;
          color: red;
          border: 2px solid red;
          font-weight: bold;
          cursor: pointer;
          letter-spacing: 1px;
          text-shadow: 0 0 8px red;
          transition: all 0.3s ease;
        }

        .back-btn:hover {
          background: red;
          color: black;
          box-shadow: 0 0 20px red;
          transform: scale(1.1);
        }
      `}</style>

    </main>
  );
}

const styles = {
  container: {
    position: "relative", // IMPORTANTE
    minHeight: "100vh",
    background: "#0d0d0f",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
  },

  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    textShadow: "0 0 10px red",
  },

  desc: {
    marginTop: "20px",
    maxWidth: "600px",
    textAlign: "center",
  },
};