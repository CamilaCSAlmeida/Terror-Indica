"use client";

import { useRef, useState } from "react";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!playing) {
      audio.volume = 0.4;
      audio.play().then(() => {
        setPlaying(true);
      }).catch((err) => {
        console.log("Erro ao tocar:", err);
      });
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={toggleAudio} style={styles.button}>
        {playing ? "🔇 Parar música" : "🎵 Ativar música"}
      </button>

      <audio ref={audioRef} loop>
        <source src="/audio/terror.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 999,
  },
  button: {
    background: "black",
    color: "red",
    border: "2px solid red",
    padding: "10px",
    cursor: "pointer",
  },
};