import React, { useState, useEffect } from "react";
import SubClassificationService from "../../services/SubClassificationService";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { CreateSubClassificaton } from "./SubClassificationForm";
import Alert from "../../common/alert";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";
import getMessage from "../../common/Messages";

const fromName = "Sub Classification";

const columns = [
  {
    field: "subClassificationID",
    headerName: "Sub Classification Id",
    width: 200,
    align: "left",
  },
  {
    field: "classificationName",
    headerName: "Main Classification",
    width: 200,
    align: "left",
  },
  {
    field: "descriptionEnglish",
    headerName: "English Description",
    minWidth: 200,
    flex: 1,
    align: "left",
  },
  {
    field: "descriptionSinhala",
    headerName: "Sinhala Description",
    minWidth: 200,
    flex: 1,
    align: "left",
  },
];

export default function SubClassification() {
  const [errorList, setErrorList] = useState([]);
  const [subClassifications, setSubClasifications] = useState([]);
  const [selectedSubClasification, setselectedSubClasification] =
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
        (item) => item.FunctionURL === "/SubClassification"
      ).length === 0
    ) {
      window.location.replace("/UnAuthorized");
    }
    getSubClasifications();
  }, [openCreateDialog, confirmDialog]);

  const getSubClasifications = () => {
    SubClassificationService.getAll()
      .then((response) => {
        setSubClasifications(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
  };

  const rows = () => {
    return subClassifications.map((subClassification, key) => ({
      id: key,
      subClassificationID: subClassification.subClassificationID,
      classificationID: subClassification.classificationID,
      classificationName: subClassification.classificationName,
      descriptionEnglish: subClassification.descriptionEnglish,
      descriptionSinhala: subClassification.descriptionSinhala,
      isPrimaryKeyExist: subClassification.isPrimaryKeyExist,
    }));
  };

  const handleCreateDialogOpen = () => {
    setselectedSubClasification(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (recorde) => {
    if (recorde != null) {
      SubClassificationService.get(
        recorde.subClassificationID,
        recorde.classificationID
      )
        .then((res) => {
          setselectedSubClasification(res.data);
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
      let selectedRow = subClassifications.find(
        (x) =>
          x.classificationID === rows()[id].classificationID &&
          x.subClassificationID === rows()[id].subClassificationID
      );
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0) {
      SubClassificationService.BulkRemove(lstRowId)
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
    }
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
            <CreateSubClassificaton
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedSubClasification={selectedSubClasification}
              subClassifications={subClassifications}
            />
          </PopupFrom>
          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedSubClasification}
          ></ConfirmDialog>
        </CardContent>
      </Card>
    </>
  );
}
