import React from "react";

interface BoxProps {
  age: string;
  gender: string;
  country: string;
  days: string[];
  onClick: () => void;
}

export const Box: React.FC<BoxProps> = ({
  age,
  gender,
  country,
  days,
  onClick,
}) => {
  return (
    <div
      style={{ border: "1px solid black", padding: "10px", cursor: "pointer" }}
      onClick={onClick}
    >
      <p>나이: {age}</p>
      <p>성별: {gender}</p>
      <p>국가: {country}</p>
      <p>요일:{days}</p>
    </div>
  );
};
