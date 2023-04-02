import React, { useState, useEffect } from "react";
import EnhancedTable from "../../components/EnhancedTable";
import MainClassificationService from "../../services/MainClassificationService";
import { Button, Card, CardContent, CardHeader,TableBody,TableCell,TableRow, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateMainClassificaton } from "./MainClassificationForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Alert from "../../common/alert";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";

const columns = [
  { id: "classificationID", label: "Classification Id" },
  { id: "descriptionEnglish", label: "English Description" },
  { id: "descriptionSinhala", label: "Sinhala Description" },
  { id: "actions", label: "Actions", width: "10%", disableSorting: true },
];

const fromName = "Main Classification";

export default function MainClassification() {
  const [errorList, setErrorList] = useState([]);
  const [mainClassifications, setMainClasifications] = useState([]);
  const [selectedMainClasification, setselectedMainClasification] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });
  const [mode, setMode] = useState(0);
  const [pagination, setPagination] = useState({ fn: items => { return items; } })


  useEffect(() => {
    getMainClasifications();
  }, [openCreateDialog, confirmDialog]);

  const getMainClasifications = () => {
    MainClassificationService.getAll()
      .then((response) => {
        setMainClasifications(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCreateDialogOpen = () => {
    setselectedMainClasification(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (item) => {
    if (item != null) {
      MainClassificationService.get(item)
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

  const onDelete = id => {
    MainClassificationService.remove(id)
      .then((res) => {
        console.log(confirmDialog);
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
        Alert("Record Deleted Successfully", 1);
      })
      .catch((e) => {
        console.log(e);
        Alert(e.response.data.message, 3);
      });
  }



  const {
    EnhancedTableContainer,
    EnhancedTableHead,
    EnhancedTablePagination,
    recordsAfterPagingAndSorting,
  } = EnhancedTable(columns, mainClassifications, pagination);



  return (
    <>
      <Card sx={{ m: 5 }}>
        <CardHeader title={fromName}></CardHeader>
        <CardContent>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            disableElevation
            onClick={handleCreateDialogOpen}
          >
            New {fromName}
          </Button>
          <EnhancedTableContainer>
            <EnhancedTableHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((mainClassifications) => (
                <TableRow key={mainClassifications.classificationID} onClick={() =>{handleViewDialogOpen(mainClassifications.classificationID)}}>
                  <TableCell>{mainClassifications.classificationID}</TableCell>
                  <TableCell>{mainClassifications.descriptionEnglish}</TableCell>
                  <TableCell>{mainClassifications.descriptionSinhala}</TableCell>
                  <TableCell>
                    
                    <button
                      type="submit"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={() => {
                        setConfirmDialog({
                          isOpen: true,
                          title: 'Are you sure to delete this record?',
                          subTitle: "You can't undo this operation",
                          onConfirm: () => { onDelete(mainClassifications.classificationID) }
                        })
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </EnhancedTableContainer>
          <EnhancedTablePagination />

          <PopupFrom
            openDialog={openCreateDialog}
            setOpenDialog={setOpenCreateDialog}
            title={fromName}
            mode ={mode}
            setMode ={setMode}>

            <CreateMainClassificaton
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedMainClasification={selectedMainClasification} />
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
