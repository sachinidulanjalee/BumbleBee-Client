import React, { useState, useEffect } from "react";
import BookService from "../../services/BookService";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { CreateBookForm } from "./BookForm";
import { DeleteTwoTone } from "@material-ui/icons";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import Alert from "../../common/alert";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import * as DefineValues from "../../common/DefineValues";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";
import getMessage from "../../common/Messages";

const fromName = "Books";

const columns = [
  {
    field: "descriptionEnglish",
    headerName: "English Description",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "subClassificationName",
    headerName: "Sub Classification",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "classificationName",
    headerName: "Main Classification",
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
  {
    field: "memberName",
    headerName: "Member",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "lendedDate",
    headerName: "Lended Date",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
];

export default function MainClassification() {
  const [errorList, setErrorList] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [mode, setMode] = useState(0); // 0-create, 1- edit, 2- view
  const [selectedRows, setSelectedRows] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [status, setstatus] = useState(DefineValues.avalaibleStatus());

  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (AccessFunctions.length != 0) {
      if (
        AccessFunctions.filter((item) => item.FunctionURL === "/Book")
          .length === 0
      ) {
        window.location.replace("/UnAuthorized");
      }
    }

    getBooks();
  }, [openCreateDialog, confirmDialog]);

  const getBooks = () => {
    BookService.getAll()
      .then((response) => {
        console.log(response.data);
        setBooks(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
  };

  const rows = () => {
    return books.map((book) => ({
      id: book.bookID,
      bookID: book.bookID,
      classificationID: book.classificationID,
      subClassificationID: book.subClassificationID,
      descriptionEnglish: book.descriptionEnglish,
      classificationName: book.classificationName,
      subClassificationName: book.subClassificationName,
      status: status.find((x) => x.value == book.status).text,
      memberID: book.memberID,
      memberName: book.memberName,
      lendedDate:
        book.lendedDate == null
          ? ""
          : moment(book.lendedDate).format("yyyy-MM-DD"),
      isPrimaryKeyExist: book.isPrimaryKeyExist,
    }));
  };

  const handleCreateDialogOpen = () => {
    setSelectedBook(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (recorde) => {
    if (recorde != null) {
      BookService.get(recorde.bookID)
        .then((res) => {
          setSelectedBook(res.data);
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
      let selectedRow = books.find((x) => x.bookID === id);
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0) {
      BookService.BulkRemove(lstRowId)
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
          Alert(e.res.data.message, 3);
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
            maxWidth="md"
          >
            <CreateBookForm
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedBook={selectedBook}
            />
          </PopupFrom>

          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedBook}
          ></ConfirmDialog>
        </CardContent>
      </Card>
    </>
  );
}
