import React from "react";
import styled from "styled-components";

interface WeekDayBoxProps {
  selectedDays: string[];
  onDaySelect: (days: string[]) => void;
}

const StyledBox = styled.div<{ isSelected: boolean }>`
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 5px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 40px;
  background-color: ${(props) => (props.isSelected ? "gray" : "purple")};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

export const WeekDayBox: React.FC<WeekDayBoxProps> = ({
  selectedDays,
  onDaySelect,
}) => {
  const handleDayClick = (day: string) => {
    const newDays = selectedDays.includes(day)
      ? selectedDays.filter((item) => item !== day)
      : [...selectedDays, day];

    onDaySelect(newDays);
  };

  return (
    <div>
      {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
        <StyledBox
          key={day}
          isSelected={selectedDays.includes(day)}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </StyledBox>
      ))}
    </div>
  );
};
