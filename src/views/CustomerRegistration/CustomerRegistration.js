import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { Card, CardContent, CardHeader } from "@mui/material";
import Alert from "../../common/alert";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import * as DefineValues from "../../common/DefineValues";
import { CreateUserManagement } from "./UserManagementForm";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";
import getMessage from "../../common/Messages";
import moment from "moment";

const fromName = "Registration";

const columns = [
  {
    field: "userName",
    headerName: "User Name",
    width: 200,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "mobileNo",
    headerName: "Mobile No",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "expiryDate",
    headerName: "Expiry Date",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "maximumAttemps",
    headerName: "Maximum Attemps",
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

export default function CustomerRegistration() {
  const [errorList, setErrorList] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRecorde, setSelectedRecorde] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [mode, setMode] = useState(0); // 0-create, 1- edit, 2- view
  const [selectedRows, setSelectedRows] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [status, setstatus] = useState(DefineValues.userStatus());

  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter((item) => item.FunctionURL === "/CustomerRegistration")
        .length === 0
    ) {
      window.location.replace("/UnAuthorized");
    }
    getAllRecordes();
  }, [openCreateDialog, confirmDialog]);

  const getAllRecordes = () => {
    UserService.getAll()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
  };

  const rows = () => {
    return users.map((member, key) => ({
      id: key,
      userID: member.userID,
      userName: member.userName,
      email: member.email,
      mobileNo: member.mobileNo,
      expiryDate: moment(member.expiryDate).format("yyyy-MM-DD"),
      maximumAttemps: member.maximumAttemps,
      status: status.find((x) => x.value == member.status).text,
      isPrimaryKeyExist: false,
    }));
  };

  const handleCreateDialogOpen = () => {
    setSelectedRecorde(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (item) => {
    if (item != null) {
      UserService.get(item.userID)
        .then((res) => {
          setSelectedRecorde(res.data);
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
      let selectedRow = users.find((x) => x.userID === rows()[id].userID);
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0) {
      UserService.BulkRemove(lstRowId)
        .then((res) => {
          setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
          });

          if (res.data) {
            Alert("Successfully Deleted.", 1);
          } else {
            Alert("Delete Faild.", 3);
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
            maxWidth="md"
          >
            <CreateUserManagement
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedRecorde={selectedRecorde}
              users ={users}
            />
          </PopupFrom>

          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedRecorde}
          ></ConfirmDialog>
        </CardContent>
      </Card>
    </>
  );
}
