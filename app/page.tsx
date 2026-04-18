"use client";

import { CSSProperties, useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <main style={styles.container}>
      
      {/* 🔐 TOPO DIREITO */}
      <div className="top-right">
        {user ? (
          <>
            <span className="user-email">
              {user.email}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="login-top-btn">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Overlay */}
      <div style={styles.overlay}></div>

      {/* Conteúdo */}
      <div style={styles.content}>
        <h1 style={styles.title}>Terror Indica</h1>

        <p style={styles.subtitle}>
          Você ousa entrar? 👻 Aqui, cada filme e livro pode ser seu pior pesadelo...
        </p>

        <Link href="/catalogo">
          <button className="terror-btn">
            Entrar no catálogo
          </button>
        </Link>
      </div>

      {/* ESTILOS */}
      <style jsx>{`
        .top-right {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
          align-items: center;
          z-index: 2;
        }

        .login-top-btn {
          padding: 8px 16px;
          background: transparent;
          color: white;
          border: 2px solid white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .login-top-btn:hover {
          background: white;
          color: black;
        }

        .logout-btn {
          padding: 6px 12px;
          background: red;
          color: black;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        .logout-btn:hover {
          background: white;
          color: black;
        }

        .user-email {
          font-size: 12px;
          color: #ccc;
        }

        .terror-btn {
          margin-top: 30px;
          padding: 14px 28px;
          font-size: 1.2rem;
          font-weight: bold;
          background: black;
          color: red;
          border: 2px solid red;
          cursor: pointer;
          animation: flicker 2s infinite;
        }

        .terror-btn:hover {
          background: red;
          color: black;
          transform: scale(1.1);
          box-shadow: 0 0 20px red;
        }

        @keyframes flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
          20%, 24%, 55% { opacity: 0.4; }
        }

        @media (max-width: 600px) {
          .top-right {
            top: 10px;
            right: 10px;
          }

          .user-email {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    position: "relative",
    height: "100vh",
    backgroundImage: "url('/assets/palhaco.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
  },

  content: {
    position: "relative",
    zIndex: 1,
    padding: "20px",
  },

  title: {
    fontSize: "4rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textShadow: "0 0 20px red",
  },

  subtitle: {
    fontSize: "1.5rem",
    maxWidth: "600px",
    textShadow: "0 0 10px black",
  },
};