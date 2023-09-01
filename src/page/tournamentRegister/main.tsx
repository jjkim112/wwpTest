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
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { PlayerButton } from "./playerButton";
import { DetailTournaUser } from "./detailTournaUser";
import { GameTemplate } from "../../domain/GameTemplate.model";
import { BasicTextFields } from "./playerInputBox";

// import { BasicTextFields } from "./playerInputBox";

export interface PlayerTypeData {
  id: string;
  name: string;
  prize: number;
  rank: number;
  note: string;
  isNew: boolean;
}
export interface Template {
  id: string;
  title: string;
  subTitle: string;
  desc: string;
}

export interface Data {
  // gameTemplate: Template[];
  gameTemplateId: string;
  note: string;
  totalReward: number;
  entry: number;
  date: Date;
  name: string;
  pubId: number;
  players: PlayerTypeData[];
}

function createData(
  // gameTemplate: Template[],
  gameTemplateId: string,
  note: string,
  name: string,
  totalReward: number,
  date: Date,
  entry: number,
  pubId: number,
  players: PlayerTypeData[]
): Data {
  return {
    gameTemplateId,
    // gameTemplate,
    note,
    name,
    totalReward,
    date,
    entry,
    pubId,
    players,
  };
}
export const temporaryGameTemplate: Template[] = [
  { id: "1", title: "타이틀1", subTitle: "a", desc: "설명1" },
  { id: "1", title: "타이틀2", subTitle: "b", desc: "설명2" },
  { id: "1", title: "타이틀3", subTitle: "c", desc: "설명3" },
];
export const rows = [
  createData(
    // temporaryGameTemplate[],
    "0",
    "비고없음",
    temporaryGameTemplate[0].title,
    305,
    new Date(),
    67,
    4.3,
    [
      {
        id: "체인저",
        name: "체인저",
        rank: 1,
        prize: 123000,
        note: "없음",
        isNew: false,
      },
    ]
  ),

  createData(
    // temporaryGameTemplate,
    "1",
    "비고없음",
    temporaryGameTemplate[1].title,
    1,
    new Date(),
    65,
    4.1,
    [
      {
        id: "카이",
        name: "카이",
        rank: 1,
        prize: 123000,
        note: "없음",
        isNew: false,
      },
      {
        id: "빅스",
        name: "빅스",
        rank: 2,
        prize: 123000,
        note: "없음",
        isNew: false,
      },
    ]
  ),
  createData(
    // temporaryGameTemplate,
    "2",
    "비고없음",
    temporaryGameTemplate[2].title,
    2,
    new Date(),
    65,
    4.1,
    [
      {
        id: "코너",
        name: "코너",
        rank: 65,
        prize: 1,
        note: "없음",
        isNew: false,
      },
      {
        id: "체인저",
        name: "체인저",
        rank: 1,
        prize: 999999,
        note: "없음",
        isNew: false,
      },
    ]
  ),
];

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("totalReward");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rowList, setRowList] = React.useState<Data[]>(rows);
  const [playerList, setPlayerList] = React.useState<PlayerTypeData[]>([]);

  const registerTournaInfo = ({
    // gameTemplate,
    gameTemplateId,
    note,
    name,
    totalReward,
    date,
    entry,
    pubId,
    players,
  }: Data) => {
    setRowList((prev) => [
      ...prev,
      {
        // gameTemplate: gameTemplate,
        gameTemplateId: gameTemplateId,
        note: note,
        name: name,
        totalReward: totalReward,
        date: date,
        entry: entry,
        pubId: pubId,
        players: players,
      },
    ]);
  };

  const editTournaInfo = () => {};

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
      const newSelected = rowList.map((n) => n.name);
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
      stableSort(rowList, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rowList]
  );

  return (
    <>
      <div className="flex gap-4">
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
                  rowCount={rowList.length}
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
                        key={index}
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
                          className="h-20"
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.totalReward}</TableCell>
                        <TableCell align="right">
                          {row.date.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">{row.entry}</TableCell>
                        <TableCell align="right">{row.pubId}</TableCell>
                        <TableCell align="right">
                          <PlayerButton
                            onClick={() => {
                              setPlayerList(row.players);
                            }}
                          />
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
              count={rowList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
        <DetailTournaUser playerList={playerList} />
      </div>
      <div>
        <BasicTextFields rowList={rowList} setRowList2={setRowList} />
      </div>
    </>
  );
}

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
  a: { [key in Key]: number | string | PlayerTypeData[] | Template[] | Date },
  b: { [key in Key]: number | string | PlayerTypeData[] | Template[] | Date }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
    id: "totalReward",
    numeric: true,
    disablePadding: false,
    label: "totalReward",
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
          토너먼트정보
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
