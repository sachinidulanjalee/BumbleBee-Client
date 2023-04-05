import React, { useState, useEffect } from "react";
import TransactionService from "../../services/TransactionService";
import { Card, CardContent, CardHeader, IconButton } from "@mui/material";
import {CreateTransaction} from "./TransactionForm";
import Alert from "../../common/alert";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";
import getMessage from "../../common/Messages";
import * as DefineValues from "../../common/DefineValues";


const fromName = "Loan Transaction";

const columns = [
  {
    field: "userName",
    headerName: "User",
    width: 200,
    align: "left",
  },
  {
    field: "productName",
    headerName: "Product",
    width: 200,
    align: "left",
  },
  {
    field: "installmentPlan",
    headerName: "Installment Plan",
    minWidth: 200,
    flex: 1,
    align: "left",
  },
  {
    field: "interestRate",
    headerName: "InterestRate",
    minWidth: 200,
    flex: 1,
    align: "left",
  },
  {
    field: "loanAmount",
    headerName: "Loan Amount",
    minWidth: 200,
    flex: 1,
    align: "left",
  },
  {
    field: "usedAmount",
    headerName: "UsedAmount",
    minWidth: 200,
    flex: 1,
    align: "left",
  },

];

export default function Transaction() {
  const [errorList, setErrorList] = useState([]);
  const [transactions, setTransaction] = useState([]);
  const [selectedTransaction, setselectedTransaction] =
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
        (item) => item.FunctionURL === "/Transaction"
      ).length === 0
    ) {
     // window.location.replace("/UnAuthorized");
    }
    getTransactions();
  }, [openCreateDialog, confirmDialog]);

  const getTransactions = () => {
    TransactionService.getAll()
      .then((response) => {
        setTransaction(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
  };

  const rows = () => {
    return transactions.map((transaction, key) => ({
      id: key,
      transactionId: transaction.transactionId,
      userId: transaction.userId,
      productId: transaction.productId,
      productName:transaction.productName,
      userName:transaction.userName,
      installmentPlan: DefineValues.InstallmentType().find(x => x.value == transaction.installmentPlan).text,
      interestRate: transaction.interestRate,
      loanAmount:transaction.loanAmount,
      usedAmount: transaction.usedAmount
    }));
  };

  const handleCreateDialogOpen = () => {
    setselectedTransaction(null);
    setErrorList([]);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (recorde) => {
    if (recorde != null) {
      TransactionService.get(recorde.transactionId,recorde.productId, recorde.userId
      )
        .then((res) => {
            setselectedTransaction(res.data);
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
      let selectedRow = transactions.find(
        (x) =>
          x.transactionId === rows()[id].transactionId &&
          x.productId === rows()[id].productId &&
          x.userId === rows()[id].userId
      );
      if (selectedRow != null) lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0) {
      TransactionService.BulkRemove(lstRowId)
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
          >
            <CreateTransaction
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedTransaction={selectedTransaction}
              transactions={transactions}
            />
          </PopupFrom>
          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedTransaction}
          ></ConfirmDialog>
        </CardContent>
      </Card>
    </>
  );
}
