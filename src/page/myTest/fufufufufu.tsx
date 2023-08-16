import React, { useState } from "react";
import { Box } from "./testsetse";
import { TestComp } from "./testComp";
import { WeekDayBox } from "./WeekDayBox";

interface BoxInfo {
  age: string;
  gender: string;
  country: string;
  days: string[];
}

const App: React.FC = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [boxes, setBoxes] = useState<BoxInfo[]>([]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  const handleAddBox = () => {
    setBoxes([...boxes, { age, gender, country, days }]);
    setAge("");
    setGender("");
    setCountry("");
    setDays([]);
  };

  const updateBox = () => {
    setBoxes(
      boxes.map((box, index) =>
        index === selectedBoxIndex ? { age, gender, country, days } : box
      )
    );

    setAge("");
    setGender("");
    setCountry("");
    setDays([]);
    setSelectedBoxIndex(null);
  };

  const handleClickBox = (box: BoxInfo, index: number) => {
    if (selectedBoxIndex === index) {
      setSelectedBoxIndex(null);
    } else {
      setSelectedBoxIndex(index);
      setAge(box.age);
      setGender(box.gender);
      setCountry(box.country);
      setDays(box.days);
    }
  };

  return (
    <div className="flex flex-col">
      <TestComp
        title="개발입력"
        placeholder="개발"
        content={age}
        setContent={setAge}
      />
      <TestComp
        title="응가입력"
        placeholder="응가"
        content={gender}
        setContent={setGender}
      />
      <TestComp
        title="방구입력"
        placeholder="방구"
        content={country}
        setContent={setCountry}
      />

      {selectedBoxIndex === null ? (
        <button onClick={handleAddBox}>추가</button>
      ) : (
        <button onClick={updateBox}>수정</button>
      )}

      <div>
        {boxes.map((box, index) => (
          <Box
            key={index}
            age={box.age}
            gender={box.gender}
            country={box.country}
            days={box.days}
            onClick={() => handleClickBox(box, index)}
          />
        ))}
      </div>

      <WeekDayBox selectedDays={days} onDaySelect={setDays} />
    </div>
  );
};

export default App;
