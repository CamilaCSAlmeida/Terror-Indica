"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function Login() {
  const [focus, setFocus] = useState<"email" | "senha" | null>(null);
  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [ghostPos, setGhostPos] = useState({ x: 0, y: 0 });

  // ✅ estados do login
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleMouseMove(e: React.MouseEvent) {
    const { innerWidth, innerHeight } = window;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const x = (mouseX / innerWidth - 0.5) * 6;
    const y = (mouseY / innerHeight - 0.5) * 6;
    setEyePos({ x, y });

    const dx = mouseX - innerWidth / 2;
    const dy = mouseY - innerHeight / 2;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      setGhostPos({
        x: -dx * 0.2,
        y: -dy * 0.2,
      });
    } else {
      setGhostPos({ x: 0, y: 0 });
    }
  }

  // ✅ FUNÇÃO CORRETA (AGORA EXISTE)
  async function handleAuth() {
    try {
      if (modo === "login") {
        await signInWithEmailAndPassword(auth, email, senha);
        alert("Login realizado!");
      } else {
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Conta criada!");
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <main style={styles.container} onMouseMove={handleMouseMove}>
      
      {/* 👻 FANTASMA */}
      <div
        style={{
          transform: `translate(${ghostPos.x}px, ${ghostPos.y}px)`,
          transition: "transform 0.3s ease-out",
          marginBottom: "50px",
        }}
      >
        <svg width="180" height="200" viewBox="0 0 200 220">
          <defs>
            <radialGradient id="bodyGrad" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e6e6e6" />
              <stop offset="100%" stopColor="#cfcfcf" />
            </radialGradient>
          </defs>

          <path
            d="
              M100 10
              C140 10, 180 40, 180 90
              L180 150
              C180 180, 150 200, 130 180
              C120 200, 100 180, 90 200
              C70 180, 50 200, 40 180
              C20 200, 20 170, 20 150
              L20 90
              C20 40, 60 10, 100 10
              Z
            "
            fill="url(#bodyGrad)"
            style={{
              filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.6))"
            }}
          />

          <circle cx="70" cy="90" r="20" fill="#111" />
          <circle cx="130" cy="90" r="20" fill="#111" />

          <circle cx={70 + eyePos.x} cy={90 + eyePos.y} r="7" fill="white" />
          <circle cx={130 + eyePos.x} cy={90 + eyePos.y} r="7" fill="white" />

          <circle cx="65" cy="85" r="5" fill="white" opacity="0.8" />
          <circle cx="125" cy="85" r="5" fill="white" opacity="0.8" />

          <ellipse
            cx="100"
            cy="140"
            rx={focus === "senha" ? 10 : 20}
            ry={focus === "senha" ? 14 : 6}
            fill="#111"
          />
        </svg>
      </div>

      {/* 🔐 FORM */}
      <div style={styles.form}>
        <h2>
          {modo === "login" ? "Login do Terror" : "Criar Conta"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus(null)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onFocus={() => setFocus("senha")}
          onBlur={() => setFocus(null)}
          style={styles.input}
        />

        {modo === "cadastro" && (
          <input
            type="password"
            placeholder="Confirmar senha"
            style={styles.input}
          />
        )}

        <button style={styles.button} onClick={handleAuth}>
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <p
          style={styles.link}
          onClick={() => {
            setModo(modo === "login" ? "cadastro" : "login");
            setFocus(null);
          }}
        >
          {modo === "login"
            ? "Não tem conta? Criar cadastro"
            : "Já tem conta? Fazer login"}
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0d0d0f",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },

  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    width: "300px",
  },

  input: {
    padding: "10px",
    background: "black",
    border: "1px solid red",
    color: "white",
  },

  button: {
    padding: "10px",
    background: "red",
    color: "black",
    fontWeight: "bold" as const,
    cursor: "pointer",
  },

  link: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#aaa",
    cursor: "pointer",
    textAlign: "center" as const,
  },
};