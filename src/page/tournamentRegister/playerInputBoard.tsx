import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { PlayerTypeData } from "./main";

// const roles = ["Market", "Finance", "Development"];
// () => {
//   return randomArrayItem(roles);
// };

//데이터 추가했을때 리덕스로 이거 관리해야함
// const initialRows: GridRowsProp = [
//   {
//     id: "kai",
//     name: "kai",
//     rank: 1,
//     prize: 1000,
//     detail: "코너가방구꼇던거",
//   },
//   {
//     id: "conor",
//     name: "conor",
//     rank: 2,
//     prize: 1000,
//     detail: "코너가방구꼇던거",
//   },
//   {
//     id: "changer",
//     name: "changer",
//     rank: 3,
//     prize: 1000,
//     detail: "코너가방구꼇던거",
//   },
//   {
//     id: "vixx",
//     name: "vixx",
//     rank: 4,
//     prize: 1000,
//     detail: "코너가방구꼇던거",
//   },
//   {
//     id: "hj",
//     name: "hj",
//     rank: 5,
//     prize: 1000,
//     detail: "코너가방구꼇던거",
//   },
// ];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: PlayerTypeData[]) => PlayerTypeData[]) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: "",
        rank: oldRows.length + 1,
        prize: 0,
        note: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        플레이어추가
      </Button>
    </GridToolbarContainer>
  );
}

interface PlayerListInputProps {
  rows: PlayerTypeData[];
  setRows: (rows: PlayerTypeData[]) => void;
}

export const FullFeaturedCrudGrid: React.FC<PlayerListInputProps> = ({
  rows,
  setRows,
}) => {
  // const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: PlayerTypeData) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "rank",
      headerName: "Rank",
      type: "number",
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "NickName",
      type: "string",
      width: 180,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "prize",
      headerName: "Prize",
      type: "number",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    {
      field: "detail",
      headerName: "Detail",
      type: "string",
      width: 200,
      align: "center",
      headerAlign: "center",
      editable: true,
    },
    // {
    //   field: "joinDate",
    //   headerName: "Join date",
    //   type: "date",
    //   width: 180,
    //   editable: true,
    // },
    // {
    //   field: "role",
    //   headerName: "Department",
    //   width: 220,
    //   editable: true,
    //   type: "singleSelect",
    //   valueOptions: ["Market", "Finance", "Development"],
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 300,
      cellClassName: "actions",
      align: "right",
      headerAlign: "right",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};
