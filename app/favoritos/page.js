"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function Favoritos() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState([]);

  const itens = [
    { id: "o-exorcista", titulo: "O Exorcista", imagem: "/assets/o-exorcista.png" },
    { id: "hereditario", titulo: "Hereditário", imagem: "/assets/hereditario.png" },
    { id: "a-bruxa", titulo: "A Bruxa", imagem: "/assets/a-bruxa.png" },
    { id: "dracula", titulo: "Drácula", imagem: "/assets/dracula.png" },
    { id: "o-iluminado", titulo: "O Iluminado", imagem: "/assets/o-iluminado.png" },
    { id: "cthulhu", titulo: "Cthulhu", imagem: "/assets/o-chamado-de-cthulhu.png" },
  ];

  // 🔐 proteção + carregar favoritos
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        loadFavoritos(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  async function loadFavoritos(uid) {
    const snapshot = await getDocs(collection(db, "favoritos"));

    const favs = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.userId === uid) {
        favs.push(data.itemId);
      }
    });

    setFavoritos(favs);
  }

  async function removerFavorito(id) {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "favoritos", `${user.uid}_${id}`);
    await deleteDoc(ref);

    setFavoritos((prev) => prev.filter((f) => f !== id));
  }

  const itensFiltrados = itens.filter((item) =>
    favoritos.includes(item.id)
  );

  return (
    <main style={styles.container}>
      <Link href="/catalogo">
        <button className="back-btn">← Voltar</button>
      </Link>

      <h1 style={styles.title}>Meus Favoritos ❤️</h1>

      {itensFiltrados.length === 0 ? (
        <p style={{ color: "#aaa" }}>Nenhum favorito ainda...</p>
      ) : (
        <div style={styles.grid}>
          {itensFiltrados.map((item) => (
            <div key={item.id} style={styles.card}>
              <Image
                src={item.imagem}
                alt={item.titulo}
                width={200}
                height={300}
              />

              <p>{item.titulo}</p>

              <button
                onClick={() => removerFavorito(item.id)}
                className="remove-btn"
              >
                ❌ Remover
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .back-btn {
          position: absolute;
          top: 20px;
          left: 20px;
          padding: 10px;
          background: transparent;
          color: red;
          border: 2px solid red;
          cursor: pointer;
        }

        .remove-btn {
          margin-top: 10px;
          background: red;
          color: black;
          border: none;
          padding: 6px;
          cursor: pointer;
          font-weight: bold;
        }

        .remove-btn:hover {
          background: white;
        }
      `}</style>
    </main>
  );
}

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    background: "#0d0d0f",
    color: "white",
    padding: "40px",
    textAlign: "center",
  },

  title: {
    fontSize: "2.5rem",
    marginBottom: "30px",
    textShadow: "0 0 10px red",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },

  card: {
    background: "#1a1a1d",
    padding: "10px",
    borderRadius: "10px",
  },
};