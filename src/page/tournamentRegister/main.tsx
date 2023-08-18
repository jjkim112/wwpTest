import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch"; //덴스 스위치할때 씀 위에도 동일
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { PlayerInputList, playerInputItem } from "./playerInput";
import { PlayerButton } from "./playerButton";
const currencies = [
  {
    value: "0",
    label: "겜템플릿0번",
  },
  {
    value: "1",
    label: "겜템플릿1번",
  },
  {
    value: "2",
    label: "겜템플릿2번",
  },
  {
    value: "3",
    label: "겜템플릿3번",
  },
  {
    value: "4",
    label: "겜템플릿4번",
  },
  {
    value: "5",
    label: "겜템플릿5번",
  },
  {
    value: "미선택",
    label: "템플릿을선택하세요",
  },
];
//선택하는 형태에 들어갈 데이터

export function BasicTextFields() {
  const [playerInputList, setInputItems] = React.useState([]);
  const [date, setDate] = React.useState();
  const [entry, setEntry] = React.useState();
  const [pubId, setPubId] = React.useState();
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
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <PlayerInputList />
        <TextField
          id="outlined-basic"
          label="날짜" //제목
          variant="outlined"
          placeholder="날짜선택"
        />
        <TextField id="filled-basic" label="엔트리" variant="outlined" />
        <TextField id="standard-basic" label="지점아이디" variant="outlined" />
        <TextField
          id="outlined-select-currency"
          select //선택하는 형태로 바꿔주는거
          label="게임템플릿"
          defaultValue="미선택"
          helperText="Please select your currency"
          value={gameTemplate}
          onChange={(e) => setGameTemplate(e.target.value)}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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

interface PlayerTypeData {
  id: string;
  prize: number;
  rank: number;
}

interface Data {
  number: number;
  entry: number;
  date: number;
  name: string;
  pubId: number;
  players: PlayerTypeData[];
}

function createData(
  name: string,
  number: number,
  date: number,
  entry: number,
  pubId: number,
  players: PlayerTypeData[]
): Data {
  return {
    name,
    number,
    date,
    entry,
    pubId,
    players,
  };
}

{
  /* <PlayerButton onClick={() => {}} /> */
}
export const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3, [
    { id: "체인저", rank: 1, prize: 123000 },
  ]),
  // createData("Donut", 452, 25.0, 51, 4.9, PlayerButton),
  // createData("Eclair", 262, 16.0, 24, 6.0, "상세"),
  // createData("Frozen yoghurt", 159, 6.0, 24, 4.0, "상세"),
  // createData("Gingerbread", 356, 16.0, 49, 3.9, "상세"),
  // createData("Honeycomb", 408, 3.2, 87, 6.5, "상세"),
  // createData("Ice cream sandwich", 237, 9.0, 37, 4.3, "상세"),
  // createData("Jelly Bean", 375, 0.0, 94, 0.0, "상세"),
  // createData("KitKat", 518, 26.0, 65, 7.0, "상세"),
  // createData("Lollipop", 392, 0.2, 98, 0.0, "상세"),
  // createData("Marshmallow", 318, 0, 81, 2.0, "상세"),
  // createData("Nougat", 360, 19.0, 9, 37.0, "상세"),
  // createData("Oreo", 437, 18.0, 63, 4.0, "상세"),
  // createData("Kai", 591, 18.5, 65, 4.1, "상세"),
  createData("가나", 1, 18.5, 65, 4.1, [
    { id: "카이", rank: 1, prize: 123000 },
    { id: "빅스", rank: 2, prize: 123000 },
  ]),
  createData("나다", 2, 18.5, 65, 4.1, [
    { id: "코너", rank: 65, prize: 1 },
    { id: "체인저", rank: 1, prize: 999999 },
  ]),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | PlayerTypeData[] },
  b: { [key in Key]: number | string | PlayerTypeData[] }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "tonurmantName",
  },
  {
    id: "number",
    numeric: true,
    disablePadding: false,
    label: "number",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "날짜",
  },
  {
    id: "entry",
    numeric: true,
    disablePadding: false,
    label: "엔트리",
  },
  {
    id: "pubId",
    numeric: true,
    disablePadding: false,
    label: "지점아이디",
  },
  {
    id: "players",
    numeric: true,
    disablePadding: false,
    label: "플레이어",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("number");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                // onRequestSort={() => {}}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row.name)}
                          aria-checked={isItemSelected}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.number}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
                      <TableCell align="right">{row.entry}</TableCell>
                      <TableCell align="right">{row.pubId}</TableCell>
                      <TableCell
                        onClick={() => {
                          console.log("test");
                        }}
                        align="right"
                      >
                        <PlayerButton onClick={() => {}} />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
        {/* 덴스형태로 바꿔주는 스위치툴 */}
      </Box>

      <BasicTextFields></BasicTextFields>
    </>
  );
}
