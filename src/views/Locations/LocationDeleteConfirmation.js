import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LocationService from "../../services/LocationService";
import Alert from "../../common/alert";

export default function LocationDeleteConfirmation({ openDialog, setOpenDialog, selectedLocation }) {
  
    const onDialogClose = () => {
        setOpenDialog(false);
      };
     
      const deleteRecord = (item1,item2,item3) => {
      if(item1!=null&&item2!=null&&item3!=null){ 
            LocationService.remove(item1,item2,item3)
            .then((res) => {
              Alert("Record Deleted Successfully", 1);
            })
            .catch((e) => {
              console.log(e);
              Alert("Error", 3);
            });
            setOpenDialog(false);
          }
          else{
            Alert("Error", 3);
          }
      };

  return (
    <div>
      
      <Dialog
        open={openDialog}
        onClose={onDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do You want to delete this record?"}
        </DialogTitle>
        
        <DialogActions>
          <Button onClick={onDialogClose}>No</Button>
          <Button onClick={() => {deleteRecord(selectedLocation.locationID,selectedLocation.subClassificationID,selectedLocation.classificationID)}} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}