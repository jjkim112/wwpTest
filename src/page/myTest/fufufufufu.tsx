import React, { useState } from "react";
import { Box } from "./testsetse";
import { TestComp, TestComp2 } from "./testComp";

interface BoxInfo {
  age: string;
  gender: string;
  country: string;
}

const App: React.FC = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [boxes, setBoxes] = useState<BoxInfo[]>([]);
  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  const handleAddBox = () => {
    setBoxes([...boxes, { age, gender, country }]);
    resetInput();
  };

  const handleClickBox = (boxInfo: BoxInfo, index: number) => {
    setSelectedBoxIndex(index);
    setAge(boxInfo.age);
    setGender(boxInfo.gender);
    setCountry(boxInfo.country);
  };

  const updateBox = () => {
    if (selectedBoxIndex === null) return;
    const newBoxes = [...boxes];
    newBoxes[selectedBoxIndex] = { age, gender, country };
    setBoxes(newBoxes);
    resetInput();
    setSelectedBoxIndex(null);
  };

  const resetInput = () => {
    setAge("");
    setGender("");
    setCountry("");
  };

  return (
    <div className="flex flex-col">
      <TestComp
        title="나이입력"
        placeholder="나이"
        content={age}
        setContent={setAge}
      />
      {/* <TestComp2
        title="나이입력"
        placeholder="나이"
        content={age}
        onChange={(e) => {
          setAge(e.target.value);
        }}
      /> */}
      <span>성별입력</span>
      <input
        placeholder="성별"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
      <span>국가입력</span>
      <input
        placeholder="국가"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
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
            onClick={() => handleClickBox(box, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
