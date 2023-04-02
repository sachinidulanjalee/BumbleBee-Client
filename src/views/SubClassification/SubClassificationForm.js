import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import { Grid, Stack, TextField } from "@mui/material";
import SubClassificationService from "../../services/SubClassificationService";
import Alert from "../../common/alert";
import FormFooterButton from "../../components/FormFooterButton";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import MainClassificationService from "../../services/MainClassificationService";
import FormAddButton from "../../components/FormAddButton";
import PopupFrom from "../../components/PopupFrom";
import { CreateMainClassificaton } from "../MainClassification/MainClassificationForm";
import getMessage from "../../common/Messages";


const initialRecordState = {
  subClassificationID: "",
  classificationID: "",
  descriptionEnglish: "",
  descriptionSinhala: "",
  createdDateTime: "",
  createdBy: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedBy: "",
  modifiedMachine: '',
};

export function CreateSubClassificaton({ setOpenDialog, mode, selectedSubClasification,subClassifications }) {
  const [isReset, setIsReset] = useState(false);
  const [mainClassifications, setMainClasifications] = useState([]);

  const [isOpenMaincalssificationPopup, setIsOpenMaincalssificationPopup] = useState(false);

  const validate = () => {
    let temp = {};
    temp.subClassificationID = values.subClassificationID !== "" ? "" : "This field is required";
    temp.classificationID = values.classificationID !== "" ? "" : "This field is required";
    temp.descriptionEnglish = values.descriptionEnglish !== "" ? "" : "This field is required";
    temp.descriptionSinhala = values.descriptionSinhala !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, handleSelectChange, resetForm } = useFormNew(initialRecordState, true, validate);

  useEffect(() => {
    resetForm();
    getMainClasificationsComboModel();
    if (selectedSubClasification != null)
      setValues({
        ...selectedSubClasification
      })
  }, [selectedSubClasification, isReset])

  useEffect(() => {
    getMainClasificationsComboModel();
    console.log(mainClassifications)

  }, [isOpenMaincalssificationPopup])

  const getMainClasificationsComboModel = () => {
    MainClassificationService.getAllComboModel()
      .then((response) => {
        setMainClasifications(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setModificationDetails = () => {
    values.subClassificationID = Number(values.subClassificationID);
    values.classificationID = Number(values.classificationID);

    if (mode == 0) {
      values.createdBy = localStorage.getItem("LoginUserID");
      values.createdMachine = localStorage.getItem("LoginMachineIp");
      values.createdDateTime = new Date();
      values.modifiedDateTime = new Date();
    }
    else {
      values.modifiedBy = localStorage.getItem("LoginUserID");
      values.modifiedMachine = localStorage.getItem("LoginMachineIp");
      values.modifiedDateTime = new Date();
    }
  }

  const saveRecord = (e) => {
    e.preventDefault();
    if (validate()) {
      setModificationDetails();
      let response;

      if(mode)
      {
        response = SubClassificationService.update(values);
        response.then((res)=>{
          setOpenDialog(false);
          Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
          setValues(initialRecordState);
        })
      }
      else
      {
        response=SubClassificationService.isExists(values.subClassificationID);

        response.then((res) => {
          if(res.data)
          {
            Alert(getMessage(500),3); //Record already exists.
            return;
          }
          else
          {
            SubClassificationService.create(values).then((result)=> {
              setOpenDialog(false);
              Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
              setValues(initialRecordState);
            })
            
          }
          
        })
          .catch((e) => {
            console.log(e);
            Alert((mode == 0) ? getMessage(301) : getMessage(302), 3);
        });

       
      }
    
    }
  };

  return (
    <>
      <form noValidate autoComplete="on" onSubmit={saveRecord}>
        <Grid container spacing={1}>
        <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CommonAutocomplete
                mode={mode}
                fieldName="classificationID"
                label="Main Classification"
                value={values.classificationID}
                options={mainClassifications}
                handleSelectChange={handleSelectChange}
                required={true}
                errors={errors.classificationID}
                disabled={(mode == 0) ? false : true} />

              <FormAddButton
                setCreateDialogOpen={setIsOpenMaincalssificationPopup}
                display={(mode != 0) ? false : true}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Sub Clasification Id"
              name="subClassificationID"
              type="number"
              style={(mode == 0) ? {width:"92%"} : {width:"100%"}}
              variant="outlined"
              InputProps={{ inputProps: { min: 1, max: 999 } }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
              }}
              value={values.subClassificationID}
              onChange={handleInputChange}
              {...(errors.subClassificationID && {
                error: true,
                helperText: errors.subClassificationID,
              })}
              disabled={(mode == 0) ? false : true}
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="English Description"
              name="descriptionEnglish"
              type="text"
              style={(mode == 0) ? {width:"92%"} : {width:"100%"}}
              variant="outlined"
              value={values.descriptionEnglish}
              onChange={handleInputChange}
              {...(errors.descriptionEnglish && { error: true, helperText: errors.descriptionEnglish })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Sinhala Description"
              name="descriptionSinhala"
              type="text"
              style={(mode == 0) ? {width:"92%"} : {width:"100%"}}
              variant="outlined"
              value={values.descriptionSinhala}
              onChange={handleInputChange}
              {...(errors.descriptionSinhala && {
                error: true,
                helperText: errors.descriptionSinhala,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
        </Grid>

        <FormFooterButton
          mode={mode}
          isReset={isReset}
          setIsReset={setIsReset} />
      </form>

      <PopupFrom
        openDialog={isOpenMaincalssificationPopup}
        setOpenDialog={setIsOpenMaincalssificationPopup}
        title={"New Main Classification"}
        mode={0}
        setMode={null}>

        <CreateMainClassificaton
          setOpenDialog={setIsOpenMaincalssificationPopup}
          mode={0}
          selectedSubClasification={null} 
          mainClassifications = {mainClassifications} />
      </PopupFrom>
    </>
  );
}

