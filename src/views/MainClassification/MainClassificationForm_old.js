import React,  { useState, useEffect } from "react";
import {useFormNew} from "../../hooks/useFormNew";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import MainClassificationService from "../../services/MainClassificationService";
import Alert from "../../common/alert";


const initialRecordState = {
  classificationID: Number(0),
  descriptionEnglish: "",
  descriptionSinhala: "",
  createdDateTime: "",
  createdBy: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedBy: "",
  modifiedMachine: '',
};

export function CreateMainClassificaton({openDialog, setOpenDialog, editMode,selectedMainClasification}) {

  const validate = () => {
    let temp = {};
    temp.classificationID = values.classificationID !== "" ? "" : "This field is required";
    temp.descriptionEnglish = values.descriptionEnglish !== "" ? "" : "This field is required";
    temp.descriptionSinhala = values.descriptionSinhala !== "" ? "" : "This field is required";
   
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange,resetForm } = useFormNew(initialRecordState ,true, validate);


  const onDialogClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    resetForm();
    if (selectedMainClasification != null)
          setValues({
              ...selectedMainClasification
          })
  }, [selectedMainClasification])


  const setModificationDetails = () =>{
    values.classificationID = Number(values.classificationID);

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
      let response;
      (editMode) ?
        response=MainClassificationService.update(values) :
        response=MainClassificationService.create(values)
      
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
        <DialogTitle>{(editMode ==0) ? "Create" : (editMode ==1) ? "Edit" : "View"} Main Classification</DialogTitle>
        <form noValidate autoComplete="on" onSubmit={saveRecord}>
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Main Clasification Id"
                  name="classificationID"
                  type="number"
                  fullWidth
                  variant="standard"
                  value= {values.classificationID}
                  onChange={handleInputChange}
                  {...(errors.classificationID && {
                    error: true,
                    helperText: errors.classificationID,
                  })}
                  disabled={(editMode ==0) ? false : true} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="English Description"
                  name="descriptionEnglish"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.descriptionEnglish}
                  onChange={handleInputChange}
                  {...(errors.descriptionEnglish && { error: true, helperText: errors.descriptionEnglish })}
                  disabled = {(editMode != 2) ? false : true} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Sinhala Description"
                  name="descriptionSinhala"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={values.descriptionSinhala}
                  onChange={handleInputChange}
                  {...(errors.descriptionSinhala && {
                    error: true,
                    helperText: errors.descriptionSinhala,
                  })}
                  disabled = {(editMode != 2 ) ? false : true} 
                />
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

