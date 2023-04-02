import React, { useState, useEffect } from "react";
import moment from "moment";
import LendingDetailService from "../../services/LendingDetailService";
import { Card, CardContent, CardHeader } from "@mui/material";
import { CreateLendingDetails } from "./LendingDetailsForm";
import ConfirmDialog from "../../common/ConfirmDialog";
import Alert from "../../common/alert";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import * as DefineValues from "../../common/DefineValues";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";
import getMessage from "../../common/Messages";

const fromName = "Lending Details";

const columns = [
  { field: "memberName", headerName: "Member Name", width: 300, align: "left" },
  { field: "bookName", headerName: "Book ", width: 300, align: "left" },
  { field: "lendedDate", headerName: "Lended Date", width: 250, align: "left" },
  {
    field: "expiryPeriod",
    headerName: "Expected Return Period",
    width: 250,
    align: "left",
  },
  { field: "status", headerName: "Status", width: 250, align: "left" },
];
export default function LendingDetailsList() {
  const [errorList, setErrorList] = useState([]);
  const [lendingDetails, setLendingDetails] = useState([]);
  const [selectedLendingDetails, setselectedLendingDetails] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [mode, setMode] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [status, setstatus] = useState(DefineValues.lendingStatus());

  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter((item) => item.FunctionURL === "/LendingDetails")
        .length === 0
    ) {
      window.location.replace("/UnAuthorized");
    }
    getLendingDetails();
  }, [openCreateDialog, confirmDialog]);

  const getLendingDetails = () => {
    let status
      status = DefineValues.lendingStatus().find(x => x.text=="Issued").value
      LendingDetailService.getAll(status)
        .then((response) => {
        setLendingDetails(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
    
  };

  const rows = () => {
    return lendingDetails.map((lendingDetail, key) => ({
      id: key,
      lendingID: lendingDetail.lendingID,
      membershipID: lendingDetail.membershipID,
      bookID: lendingDetail.bookID,
      lendedDate: moment(lendingDetail.lendedDate).format("yyyy-MM-DD"),
      expiryPeriod: lendingDetail.expiryPeriod,
      collectedDate: moment(lendingDetail.collectedDate).format("yyyy-MM-DD") ==moment(new Date()).format("yyyy-MM-DD")
          ? "" : moment(lendingDetail.collectedDate).format("yyyy-MM-DD"),
      status: status.find((x) => x.value == lendingDetail.status).text,
      bookName: lendingDetail.bookName,
      memberName: lendingDetail.memberName,
      isPrimaryKeyExist: lendingDetail.isPrimaryKeyExist,
    }));
  };
  const handleCreateDialogOpen = () => {
    setselectedLendingDetails(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (item) => {
    if (item != null) {
      LendingDetailService.get(item.lendingID)
        .then((res) => {
          setselectedLendingDetails(res.data);
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
      let selectedRow = lendingDetails.find(
        (x) => x.lendingID === rows()[id].lendingID
      );
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0) {
      LendingDetailService.BulkRemove(lstRowId)
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
            isCheckBoxTable={false}
          />

          <PopupFrom
            openDialog={openCreateDialog}
            setOpenDialog={setOpenCreateDialog}
            title={fromName}
            mode={mode}
            setMode={setMode}
           //maxWidth="md"
          >
            <CreateLendingDetails
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedLendingDetails={selectedLendingDetails}
            />
          </PopupFrom>
          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedLendingDetails}
          ></ConfirmDialog>
        </CardContent>
      </Card>
    </>
  );
}
