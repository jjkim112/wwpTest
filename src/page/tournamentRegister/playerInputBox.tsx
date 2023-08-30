import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { playerInputItem } from "./playerInput";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { GridRowsProp } from "@mui/x-data-grid";
import { FullFeaturedCrudGrid } from "./playerInputBoard";
import { PlayerTypeData, Template } from "./main";

const currencies: Template[] = [
  {
    id: "0",
    title: "겜템플릿1번",
    subTitle: "겜템플릿방구껴라",
    desc: "방구는 성스러워 뿡",
  },
  {
    id: "1",
    title: "겜템플릿2번",
    subTitle: "겜템플릿방구껴라",
    desc: "방구는 성스러워 뿡",
  },
  {
    id: "2",
    title: "겜템플릿3번",
    subTitle: "겜템플릿방구껴라",
    desc: "방구는 성스러워 뿡",
  },
  {
    id: "3",
    title: "겜템플릿4번",
    subTitle: "겜템플릿방구껴라",
    desc: "방구는 성스러워 뿡",
  },
  {
    id: "4",
    title: "겜템플릿5번",
    subTitle: "겜템플릿방구껴라",
    desc: "방구는 성스러워 뿡",
  },
  {
    id: "5",
    title: "겜템플릿6번",
    subTitle: "겜템플릿방구껴라",
    desc: "방구는 성스러워 뿡",
  },
  {
    id: "noChoice",
    title: "템플릿방구뀌시오",
    subTitle: "",
    desc: "",
  },
];

// export interface PlayerTypeData {
//   id: string;
//   prize: number;
//   rank: number;
//   note: string;
// }

const initialRows: PlayerTypeData[] = [
  {
    id: "kai",
    name: "kai",
    rank: 1,
    prize: 1000,
    note: "코너가방구꼇던거",
    isNew: false,
  },
  {
    id: "conor",
    name: "conor",
    rank: 2,
    prize: 1000,
    note: "코너가방구꼇던거",
    isNew: false,
  },
  {
    id: "changer",
    name: "changer",
    rank: 3,
    prize: 1000,
    note: "코너가방구꼇던거",
    isNew: false,
  },
  {
    id: "vixx",
    name: "vixx",
    rank: 4,
    prize: 1000,
    note: "코너가방구꼇던거",
    isNew: false,
  },
  {
    id: "hj",
    name: "hj",
    rank: 5,
    prize: 1000,
    note: "코너가방구꼇던거",
    isNew: false,
  },
];

export default function BasicTextFields() {
  const [playerList, setPlayerList] =
    React.useState<PlayerTypeData[]>(initialRows);

  const [gameTemplate, setGameTemplate] = React.useState<string>();
  const addInfoToList = () => {
    return;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Box
        className="bg-white"
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "138ch" },
        }}
        noValidate
        autoComplete="off"
      >
        {/* <PlayerInputList /> */}
        <FullFeaturedCrudGrid rows={playerList} setRows={setPlayerList} />
        <div className="flex gap-3">
          <div className="-my-2">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker label="날짜 및 시간" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex gap-3">
            <TextField id="entry" label="엔트리" variant="outlined" />
            <TextField id="totalReward" label="총상금" variant="outlined" />
            <TextField
              id="standard-basic"
              label="지점아이디"
              variant="outlined"
            />
            <TextField
              id="outlined-select-currency"
              select //선택하는 형태로 바꿔주는거
              label="게임템플릿"
              defaultValue="noChoice"
              helperText="Please select your currency"
              value={gameTemplate}
              onChange={(e) => setGameTemplate(e.target.value)}
            >
              {currencies.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </div>
      </Box>
      <button
        className="bg-black w-10 h-10 text-yellow-300"
        onClick={addInfoToList}
      >
        등록하기
      </button>
    </div>
  );
}
