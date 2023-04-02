import React, { useState, useEffect } from "react";
import LocationService from "../../services/LocationService";
import { Card, CardContent, CardHeader } from "@mui/material";
import { CreateLocation } from "../Locations/LocationForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Alert from "../../common/alert";
import { DeleteTwoTone } from "@material-ui/icons";
import IconButton from "@mui/material/IconButton";
import ConfirmDialog from "../../common/ConfirmDialog";
import PopupFrom from "../../components/PopupFrom";
import GridAddButton from "../../components/GridAddButton";
import getMessage from "../../common/Messages";
import DeleteButton from "../../components/DeleteButton";
import CheckBoxGrid from "../../components/CheckBoxGrid";


const fromName = "Location";

const columns = [
  {
    field: "locationCode",
    headerName: "Location Code",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "subClassificationName",
    type: "number",
    headerName: "Sub Classification",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "classificationName",
    type: "number",
    headerName: "Main Classification",
    minWidth: 200,
    flex: 1,
    align: "left",
    headerAlign: "left",
  },
];






export default function LocationList() {
  const [errorList, setErrorList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [mode, setMode] = useState(0);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [canDelete, setCanDelete] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter((item) => item.FunctionURL === "/Locations")
        .length === 0
    ) {
      window.location.replace("/UnAuthorized");
    }
    getLocations();
  }, [openCreateDialog, confirmDialog]);

  const getLocations = () => {
    LocationService.getAll()
      .then((response) => {
        setLocations(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
  };
  const rows = () => {
    return locations.map((location, key) => ({
      
      id: key,
      locationID: location.locationID,
      locationCode: location.locationCode,
      subClassificationID: location.subClassificationID,
      classificationID: location.classificationID,
      description: location.description,
      classificationName: location.classificationName,
      subClassificationName: location.subClassificationName,
      isPrimaryKeyExist: location.isPrimaryKeyExist,
    })
    
    );
    
  };

  const handleCreateDialogOpen = () => {
    setErrorList([]);
    setSelectedLocation(null);
    setMode(0);
    setOpenCreateDialog(true);
  };

  const handleViewDialogOpen = (item) => {
    if (item != null) {
      LocationService.get(
        //item.locationID,
        item.locationCode,
        
      )
        .then((res) => {
          setSelectedLocation(res.data);
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
      let selectedRow = locations.find(x => x.locationCode === rows()[id].locationCode);
      if(selectedRow !=  null)
        lstRowId.push(selectedRow);
    });

    if (lstRowId.length != 0) {
        LocationService.BulkRemove(lstRowId)
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


  }

  return (
    <>
      <Card sx={{ m: 5, marginTop: 2 }}>
        <CardHeader title="Locations"></CardHeader>
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
            <CreateLocation
              setOpenDialog={setOpenCreateDialog}
              mode={mode}
              selectedLocation={selectedLocation}
              locations={locations}
            />
          </PopupFrom>
          <ConfirmDialog
            openDialog={confirmDialog}
            setOpenDialog={setConfirmDialog}
            selectedRecorde={selectedLocation}
          />
        </CardContent>
      </Card>
    </>
  );
}
