import React, { useState, useEffect } from "react";
import MainClassificationService from "../../services/MainClassificationService";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { CreateMainClassificaton } from "./MainClassificationForm";
import Alert from "../../common/alert";
import getMessage from "../../common/Messages";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";

const fromName = "Main Classification";

const columns = [
  {
    field: "classificationID",
    type: "number",
    headerName: "Main Classification Id",
    width: 200,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "descriptionEnglish",
    headerName: "English Description",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "descriptionSinhala",
    headerName: "Sinhala Description",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
];

export default function MainClassification() {
  const [errorList, setErrorList] = useState([]);
  const [mainClassifications, setMainClasifications] = useState([]);
  const [selectedMainClasification, setselectedMainClasification] =
    useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [mode, setMode] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter(
        (item) => item.FunctionURL === "/MainClassification"
      ).length === 0
    ) {
      window.location.replace("/UnAuthorized");
    }

    getMainClasifications();
  }, [openCreateDialog, confirmDialog]);

  const getMainClasifications = () => {
    MainClassificationService.getAll()
      .then((response) => {
        setMainClasifications(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3); //Data Load Failure.
      });
  };

  const rows = () => {
    return mainClassifications.map((mainClassification, key) => ({
      id: key,
      classificationID: mainClassification.classificationID,
      descriptionEnglish: mainClassification.descriptionEnglish,
      descriptionSinhala: mainClassification.descriptionSinhala,
      isPrimaryKeyExist: mainClassification.isPrimaryKeyExist,
    }));
  };

  const handleCreateDialogOpen = () => {
    setselectedMainClasification(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (item) => {
    if (item != null) {
      MainClassificationService.get(item.classificationID)
        .then((res) => {
          setselectedMainClasification(res.data);
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
      let selectedRow = mainClassifications.find(
        (x) => x.classificationID === rows()[id].classificationID
      );
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0)
      MainClassificationService.BulkRemove(lstRowId)
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
            <CreateMainClassificaton
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedMainClasification={selectedMainClasification}
              mainClassifications={mainClassifications}
            />
          </PopupFrom>

          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedMainClasification}
          ></ConfirmDialog>
        </CardContent>
      </Card>
    </>
  );
}
