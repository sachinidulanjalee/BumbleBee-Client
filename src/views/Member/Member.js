import React, { useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { CreateMemberFrom } from "./MemberForm";
import { DeleteTwoTone } from "@material-ui/icons";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Alert from "../../common/alert";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import * as DefineValues from "../../common/DefineValues";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";
import getMessage from "../../common/Messages";

const fromName = "Customer Details";

const columns = [
  {
    field: "customerID",
    headerName: "Customer ID",
    width: 200,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "firstName",
    headerName: "First Name",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "surname",
    headerName: "Last Name",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "nicPassport",
    headerName: "NIC / Passport",
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

export default function Member() {
  const [errorList, setErrorList] = useState([]);
  const [members, setMembers] = useState([]);
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
  const [status, setstatus] = useState(DefineValues.status());

  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter((item) => item.FunctionURL === "/Member")
        .length === 0
    ) {
      window.location.replace("/UnAuthorized");
    }
    setSelectedRows([])
    getAllRecordes();

  }, [openCreateDialog, confirmDialog]);

  const getAllRecordes = () => {
    CustomerService.getAll()
      .then((response) => {
        setMembers(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
  };

  const rows = () => {
    return members.map((member, key) => ({
      id: key,
      customerID: member.customerID,
      userID: member.userID,
      nicPassport: member.nicPassport,
      title: member.title,
      sex: member.sex,
      surname: member.surname,
      firstName: member.firstName,
      status: status.find((x) => x.value == member.status).text,
      shortName: member.shortName,
      nationality: member.status,
      isPrimaryKeyExist: member.isPrimaryKeyExist,
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
      CustomerService.get(item.customerID)
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
      let selectedRow = members.find(
        (x) => x.customerID === rows()[id].customerID
      );
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0) {
      CustomerService.BulkRemove(lstRowId)
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

  const arr =()=>{
    return ['A', 'B', 'C', 'D']
  }
  return (
    <>
      <Card sx={{ m: 5, marginTop: 2 }}>
        <CardHeader title={fromName}></CardHeader>
        <CardContent>
          {/* <GridAddButton
            fromName={fromName}
            handleCreateDialogOpen={handleCreateDialogOpen}
            
          /> */}

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
            rowsPerPageOptions={5}
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
            maxWidth="lg"
          >
            <CreateMemberFrom
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedRecorde={selectedRecorde}
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
