import React, { useEffect, useState, useCallback } from "react";
import usePlayer from "../stores/usePlayer";

const selectXp = (state) => state.xp;
const selectLevel = (state) => state.level;

export default function ProgressBar() {
  const xp = usePlayer(selectXp);
  const level = usePlayer(selectLevel);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const xpForNextLevel = level * 100;
    const currentProgress = Math.min((xp / xpForNextLevel) * 100, 100);
    setProgress(Math.floor(currentProgress));
    console.log(`XP: ${xp}, Level: ${level}, Progress: ${currentProgress}%`);
  }, [xp, level]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        pointerEvents: "none",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "70vw",
          background: "#333",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <div
          className="progress-bar-fill"
          style={{
            width: `${progress}%`,
            height: "30px",
            background: "red",
            transition: "width 0.3s ease",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "60px",
          width: "60vw",
          zIndex: 10,
        }}
      >
        <p
          style={{
            color: "black",
            fontSize: "30px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            margin: 0,
          }}
        >
          Xp: {progress}%
        </p>
        <p
          style={{
            color: "black",
            fontSize: "30px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            margin: 0,
          }}
        >
          Lvl: {level}
        </p>
      </div>
    </div>
  );
}
