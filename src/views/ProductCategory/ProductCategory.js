import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import Alert from "../../common/alert";
import getMessage from "../../common/Messages";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";
import CategoryService from "../../services/CategoryService";
import { CreateCategory } from "./ProductCategoryForm";
import * as DefineValues from "../../common/DefineValues";

const fromName = "Category";

const columns = [
  {
    field: "categoryId",
    type: "number",
    headerName: "Category Id",
    width: 200,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "categoryName",
    headerName: "Category Name",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
];

export default function Category() {
  const [errorList, setErrorList] = useState([]);
  const [categoies, setCategory] = useState([]);
  const [selectedCategory, setselectedCategory] =useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [mode, setMode] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [status, setstatus] = useState(DefineValues.status());

  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter(
        (item) => item.FunctionURL === "/ProductCategory"
      ).length === 0
    ) {
      window.location.replace("/UnAuthorized");
    }

    getCategory();
  }, [openCreateDialog, confirmDialog]);

  const getCategory = () => {
    CategoryService.getAll()
      .then((response) => {
        setCategory(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3); //Data Load Failure.
      });
  };

  const rows = () => {
    return categoies.map((category, key) => ({
      id: key,
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      status:DefineValues.status().find(x => x.value == category.status).text,
    }));
  };

  const handleCreateDialogOpen = () => {
    setselectedCategory(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (item) => {
    if (item != null) {
      CategoryService.get(item.categoryId)
        .then((res) => {
          setselectedCategory(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
      setMode(2);
      setOpenCreateDialog(true);
    }
  };

  const onDelete = () => {
    const lstRowId = [];

    selectedRows.map((id) => {
      let selectedRow = categoies.find(
        (x) => x.categoryId === rows()[id].categoryId
      );
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0)
      CategoryService.BulkRemove(lstRowId)
        .then((res) => {
          setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
          });

          if (res.data) {
            Alert(getMessage(203), 1);
          } else {
            Alert(getMessage(303), 3);
          }
        })
        .catch((e) => {
          console.log(e);
          Alert(getMessage(303), 3);
        });
  };

  return (
    <>
      <Card sx={{ m: 5, marginTop: 2 }}>
        <CardHeader title={fromName}></CardHeader>
        <CardContent>
          <GridAddButton
            fromName={fromName}
            handleCreateDialogOpen={handleCreateDialogOpen}
          />

          <DeleteButton
            canDelete={canDelete}
            setConfirmDialog={setConfirmDialog}
            onDelete={onDelete}
          />

          <br />
          <br />

          <CheckBoxGrid
            rows={rows()}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            setCanDelete={setCanDelete}
            setSelectedRows={setSelectedRows}
            handleViewDialogOpen={handleViewDialogOpen}
          />

          <PopupFrom
            openDialog={openCreateDialog}
            setOpenDialog={setOpenCreateDialog}
            title={fromName}
            mode={mode}
            setMode={setMode}
          >
            <CreateCategory
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedCategory={selectedCategory}
              categoies={categoies}
            />
          </PopupFrom>

          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedCategory}
          ></ConfirmDialog>
        </CardContent>
      </Card>
    </>
  );
}
