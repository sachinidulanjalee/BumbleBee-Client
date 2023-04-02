import React, {useEffect}from "react";
import { Select, InputLabel, Grid,Button, TextField, Dialog, DialogActions, DialogContent,DialogTitle, MenuItem,FormControl ,Autocomplete} from "@mui/material";
import {useFormNew} from "../../hooks/useFormNew";
import LendingDetailService from "../../services/LendingDetailService";
import Alert from "../../common/alert";
import moment from "moment";
import * as enum1 from "../../common/enum1";

const initialRecordState = {
  lendingID: "",
  membershipID: "",
  bookID: "",
  lendedDate: "",
  expiryPeriod: "",
  collectedDate: "",
  status: "",
  createdDateTime: "",
  createdBy: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedBy: "",
  modifiedMachine: '',
};

export function CreateLendingDetails({openDialog, setOpenDialog,editMode, selectedLendingDetails,}) {
  const validate = () => {
    let temp = {};
    temp.MembershipID = values.MembershipID !== "" ? "" : "This field is required";
    temp.BookID = values.BookID !== "" ? "" : "This field is required";
    temp.LendedDate = values.LendedDate !== "" ? "" : "This field is required";
    temp.ExpiryPeriod = values.ExpiryPeriod !== "" ? "" : "This field is required";
    temp.CollectedDate = values.CollectedDate !== "" ? "" : "This field is required";
    temp.Status = values.Status !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };


  const { values, setValues, errors, setErrors, handleInputChange,handleSelectChange,resetForm } = useFormNew(initialRecordState ,true, validate);


  const onDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    resetForm();
    if (selectedLendingDetails != null)
          setValues({
              ...selectedLendingDetails
          })
  }, [selectedLendingDetails])


  const setModificationDetails = () =>{
    values.lendingID = Number(values.lendingID);
    values.membershipID = Number(values.membershipID);
    values.bookID = Number(values.bookID);
    values.expiryPeriod = Number(values.expiryPeriod);
    values.status = Number(values.status);

    if(editMode == 0)
    {
      values.createdBy = 'dms';
      values.createdMachine = 'localhost';
      values.createdDateTime = new Date();
      values.modifiedDateTime = new Date();
    }
    else
    {
      values.modifiedBy = 'dms_e';
      values.modifiedMachine = 'localhost_e';
      values.modifiedDateTime = new Date();
    }
  }

  const saveRecord = (e) => {
    e.preventDefault();
    if (validate()) {
      setModificationDetails();
      console.log(values);

      let response;
      (editMode) ?
        response=LendingDetailService.update(values) :
        response=LendingDetailService.create(values)
      
        response.then((res) => {
            setOpenDialog(false);
            Alert( (editMode ==0) ? 'Record Created Successfully' : 'Record Update Successfully', 1);
            setValues(initialRecordState);
          })
          .catch((e) => {
            console.log(e);
            Alert(e.response.data.message, 3);
          });
        }
  };

  return (
    <>
      <Dialog open={openDialog} onClose={onDialogClose}>
        <DialogTitle>{(editMode==0)?"Create" : (editMode==1)?"Edit":"View"}  New Lending Details</DialogTitle>
        <form noValidate autoComplete="on" onSubmit={saveRecord}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField 
                  required
                  id="outlined-required"
                  margin="dense"
                  label="Membership ID"
                  name="membershipID"
                  type="number"
                  fullWidth
                  value={values.membershipID}
                  onChange={handleInputChange}
                  {...(errors.membershipID && {
                    error: true,
                    helperText: errors.membershipID,
                  })}
                  disabled={(editMode ==0) ? false : true} 
                  autoFocus />
                   
              </Grid>  
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  margin="dense"
                  label="Book ID"
                  name="bookID"
                  type="number"
                  fullWidth
                  value={values.bookID}
                  onChange={handleInputChange}
                  {...(errors.BookID && { error: true, helperText: errors.BookID })}
                  disabled={(editMode ==0) ? false : true} 
                  /> 
              </Grid>
              <Grid item xs={6}>
              <TextField
                 required
                  id="outlined-required"
                  margin="dense"
                  label="Lended Date"
                  name="lendedDate"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true, }}
                  value={moment(values.lendedDate).format("yyyy-MM-DD")}
                  onChange={handleInputChange}
                  {...(errors.lendedDate && {
                    error: true,
                    helperText: errors.lendedDate,
                  })}
                  disabled = {(editMode != 2 ) ? false : true} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  margin="dense"
                  label="Expiry Period"
                  name="expiryPeriod"
                  type="number"
                  fullWidth
                  value={values.expiryPeriod}
                  onChange={handleInputChange}
                  {...(errors.expiryPeriod && {
                    error: true,
                    helperText: errors.expiryPeriod,
                  })}
                  disabled = {(editMode != 2 ) ? false : true} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  id="outlined-required"
                  margin="dense"
                  label="Collected Date"
                  name="collectedDate"
                  type="date"
                  placeholder=""
                  InputLabelProps={{ shrink: true, }}
                  fullWidth
                  value={moment(values.collectedDate).format("yyyy-MM-DD")}
                  onChange={handleInputChange}
                  {...(errors.collectedDate && {
                    error: true,
                    helperText: errors.collectedDate,
                  })}
                  disabled = {(editMode != 2 ) ? false : true} 
                />
              </Grid>
              
              <Grid item xs={6}>
                <FormControl required fullWidth >
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={enum1.lendingStatus()}
                    getOptionLabel={option => option.value}
                    renderInput={(params) => <TextField {...params} label="Status" variant="outlined"/>}
                    onChange={(event, value) => handleSelectChange("status",value.id)}
                    defaultValue={ enum1.lendingStatus()[values.status] }
                    disabled = {(editMode != 2 ) ? false : true} 
                  />
                 
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions style={{display : (editMode != 2 ) ? "" : "none"}} >
            <Button variant="contained" type="submit">
            {(editMode)  ? "Update" : "Save"} 
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
