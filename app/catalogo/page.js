"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";

import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

export default function Catalogo() {
  const router = useRouter();

  const [favoritos, setFavoritos] = useState([]);

  // 🔐 proteção de rota
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        loadFavoritos(user.uid);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 🔄 carregar favoritos
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

  // ❤️ favoritar / desfavoritar
  async function toggleFavorito(id) {
    const user = auth.currentUser;
    if (!user) return;

    const ref = doc(db, "favoritos", `${user.uid}_${id}`);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      await deleteDoc(ref);
      setFavoritos((prev) => prev.filter((f) => f !== id));
    } else {
      await setDoc(ref, {
        userId: user.uid,
        itemId: id,
      });
      setFavoritos((prev) => [...prev, id]);
    }
  }

  const filmes = [
    { id: "o-exorcista", titulo: "O Exorcista", imagem: "/assets/o-exorcista.png" },
    { id: "hereditario", titulo: "Hereditário", imagem: "/assets/hereditario.png" },
    { id: "a-bruxa", titulo: "A Bruxa", imagem: "/assets/a-bruxa.png" },
  ];

  const livros = [
    { id: "dracula", titulo: "Drácula", imagem: "/assets/dracula.png" },
    { id: "o-iluminado", titulo: "O Iluminado", imagem: "/assets/o-iluminado.png" },
    { id: "cthulhu", titulo: "O Chamado de Cthulhu", imagem: "/assets/o-chamado-de-cthulhu.png" },
  ];

  return (
    <main style={styles.container}>
      <Link href="/">
        <button className="back-btn">← Voltar ao início</button>
      </Link>

      <h1 style={styles.title}>Catálogo do Terror</h1>

      {/* FILMES */}
      <section>
        <h2 style={styles.sectionTitle}>Filmes</h2>
        <div style={styles.grid}>
          {filmes.map((item) => (
            <Link href={`/catalogo/${item.id}`} key={item.id}>
              <div style={styles.card}>
                <Image
                  src={item.imagem}
                  alt={item.titulo}
                  width={200}
                  height={300}
                  style={styles.image}
                />

                <p style={styles.text}>{item.titulo}</p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorito(item.id);
                  }}
                  className="fav-btn"
                >
                  {favoritos.includes(item.id) ? "❤️" : "🤍"}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LIVROS */}
      <section>
        <h2 style={styles.sectionTitle}>Livros</h2>
        <div style={styles.grid}>
          {livros.map((item) => (
            <Link href={`/catalogo/${item.id}`} key={item.id}>
              <div style={styles.card}>
                <Image
                  src={item.imagem}
                  alt={item.titulo}
                  width={200}
                  height={300}
                  style={styles.image}
                />

                <p style={styles.text}>{item.titulo}</p>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorito(item.id);
                  }}
                  className="fav-btn"
                >
                  {favoritos.includes(item.id) ? "❤️" : "🤍"}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

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
        }

        .fav-btn {
          margin-top: 10px;
          background: transparent;
          border: none;
          font-size: 22px;
          cursor: pointer;
          transition: 0.2s;
        }

        .fav-btn:hover {
          transform: scale(1.3);
        }

        @media (max-width: 600px) {
          .back-btn {
            top: 10px;
            left: 10px;
            padding: 6px 10px;
            font-size: 12px;
          }
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
    padding: "40px 20px",
    textAlign: "center",
  },

  title: {
    fontSize: "3rem",
    marginBottom: "40px",
    textShadow: "0 0 15px red",
  },

  sectionTitle: {
    fontSize: "2rem",
    margin: "30px 0",
    color: "red",
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
    width: "200px",
    cursor: "pointer",
  },

  image: {
    borderRadius: "8px",
  },

  text: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};