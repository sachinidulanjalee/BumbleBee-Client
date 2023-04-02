import React, { useState, useEffect } from "react";
import moment from "moment";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import EnhancedTable from "../../components/EnhancedTable";
import LendingDetailService from "../../services/LendingDetailService";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateLendingDetails,ViewLendingDetails,EditLendingDetails } from "./LendingDetailsForm";
import ConfirmDialog from "../../common/ConfirmDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "../../common/alert";

import {
  faFileAlt,
  faPencilAlt,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const columns = [
  { id: "membershipID", label: "Membership ID" },
  { id: "bookID", label: "Book ID" },
  { id: "lendedDate", label: "Lended Date" },
  { id: "expiryPeriod", label: "Expiry Period" },
  { id: "collectedDate", label: "Collected Date" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", width: "10%", disableSorting: true },
];
export default function LendingDetailsList() {
  const [errorList, setErrorList] = useState([]);
  const [lendingDetails, setLendingDetails] = useState([]);
  const [selectedLendingDetails, setselectedLendingDetails] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [editMode, setEditMode] = useState(0);
  const [pagination, setPagination] = useState({ fn: items => { return items; } })
 

  useEffect(() => {
    getLendingDetails();
  }, [openCreateDialog,confirmDialog]);

  const getLendingDetails = () => {
    LendingDetailService.getAll()
      .then((response) => {
        setLendingDetails(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCreateDialogOpen = () => {
    setselectedLendingDetails(null);
    setErrorList([]);
    setEditMode(0);
    setOpenCreateDialog(true);
  };
  

  const handleViewDialogOpen = (lendingID,membershipID,bookID) => {
    if (lendingID!= null && membershipID != null && bookID!==null) {
        LendingDetailService.get(lendingID,membershipID,bookID)
        .then((res) => {
          console.log(res.data);
          setselectedLendingDetails(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
        setEditMode(2);
        setOpenCreateDialog(true);
    }
  };

  const handleEditDialogOpen = (lendingID,membershipID,bookID) => {
    if (lendingID!= null && membershipID != null && bookID!==null) {
      LendingDetailService.get(lendingID,membershipID,bookID)
        .then((res) => {
          setErrorList([]);
          setselectedLendingDetails(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
        setEditMode(1);
        setOpenCreateDialog(true);
    }
  };

  const onDelete = (lendingID,membershipID,bookID) => {
   alert(lendingID);
    LendingDetailService.remove(lendingID,membershipID,bookID)
    .then((res) => {
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
  } = EnhancedTable(columns, lendingDetails,pagination);

  return (
    <>
      <Card sx={{ m: 5 }}>
        <CardHeader title="LendingDetails"></CardHeader>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            disableElevation
            onClick={handleCreateDialogOpen}
          >
            New Lending Details
          </Button>
          <EnhancedTableContainer>
            <EnhancedTableHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((lendingDetail) => (
                <TableRow key={lendingDetail.lendingID}>
                <TableCell > {lendingDetail.membershipID}</TableCell>
                  <TableCell >{lendingDetail.bookID}</TableCell>
                  <TableCell>
                    {moment(lendingDetail.lendedDate).format("yyyy-MM-DD")}
                  </TableCell>
                  <TableCell>{lendingDetail.expiryPeriod}</TableCell>
                  <TableCell>
                    {moment(lendingDetail.collectedDate).format("yyyy-MM-DD")}
                  </TableCell>
                  <TableCell>
                  { (lendingDetail.status == 0) ? "NotApplicble" : (lendingDetail.status == 1) ? "Damaged" : "Missplased"}
                  </TableCell>
                  <TableCell>
                    <button
                      type="submit"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="View"
                      onClick={() => {
                        handleViewDialogOpen(lendingDetail.lendingID,lendingDetail.membershipID,lendingDetail.bookID);
                      }}>
                      <FontAwesomeIcon icon={faFileAlt} size="lg" />
                    </button>
                    <button
                      type="submit"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                      onClick={() => {
                        handleEditDialogOpen(lendingDetail.lendingID,lendingDetail.membershipID,lendingDetail.bookID);
                      }}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                    </button>
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
                            onConfirm: () => { onDelete(lendingDetail.lendingID,lendingDetail.membershipID,lendingDetail.bookID) }
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
          <EnhancedTablePagination/>
          <CreateLendingDetails
            openDialog={openCreateDialog}
            setOpenDialog={setOpenCreateDialog}
            editMode = {editMode}
            selectedLendingDetails={selectedLendingDetails}
          ></CreateLendingDetails>
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
