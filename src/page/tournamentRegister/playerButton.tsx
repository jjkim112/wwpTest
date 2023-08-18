import React from "react";

interface PlayerButtonProps {
  onClick: () => void;
}

export const PlayerButton: React.FC<PlayerButtonProps> = ({ onClick }) => {
  return (
    <button
      style={{
        backgroundColor: "red",
        border: "1px solid black",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      상세
    </button>
  );
};
