import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import { Grid, TextField, Stack } from "@mui/material";
import LocationService from "../../services/LocationService";
import Alert from "../../common/alert";
import FormFooterButton from "../../components/FormFooterButton";
import getMessage from "../../common/Messages";
import MainClassificationService from "../../services/MainClassificationService";
import SubClassificationService from "../../services/SubClassificationService";
import MainClassification from "../../components/Autocomplete/MainClassification";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import FormAddButton from "../../components/FormAddButton";
import PopupFrom from "../../components/PopupFrom";
import { CreateMainClassificaton } from "../MainClassification/MainClassificationForm";
import { CreateSubClassificaton } from "../SubClassification/SubClassificationForm";



const initialRecordState = {
  locationID: Number(0),
  locationCode:"",
  subClassificationID: Number(0),
  classificationID: Number(0),
  description: "",
  createdDateTime: "",
  createdBy: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedBy: "",
  modifiedMachine: '',
};

export function CreateLocation({ setOpenDialog, mode, selectedLocation,locations }) {

  const [isReset, setIsReset] = useState(false);

  const [mainClassifications, setMainClasifications] = useState([]);
  const [classificationsID, setClasificationsID] = useState(0);
  const [subClassifications, setSubClasifications] = useState([]);

  const [isOpenMaincalssificationPopup, setIsOpenMaincalssificationPopup] = useState(false);
  const [isOpenSubCalssificationPopup, setIsOpenSubCalssificationPopup] = useState(false);

  const validate = () => {
    let temp = {};
    temp.subClassificationID = values.subClassificationID !== 0 ? "" : "This field is required";
    temp.classificationID = values.classificationID !== 0 ? "" : "This field is required";
    temp.description = values.description !== "" ? "" : "This field is required";
    temp.locationCode = values.locationCode !== "" ? "" : "This field is required";
    
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };


  const { values, setValues, errors, setErrors, handleInputChange, handleSelectChange, resetForm } = useFormNew(initialRecordState, true, validate);

  useEffect(() => {
    getMainClasificationsComboModel();
    resetForm();
    if (selectedLocation != null) {
      setValues({
        ...selectedLocation
      })
      setClasificationsID(selectedLocation.classificationID);
    }
  }, [selectedLocation, isReset])

  useEffect(() => {
    getMainClasificationsComboModel();
    getSubClasificationsComboModel();
  }, [isOpenMaincalssificationPopup, isOpenSubCalssificationPopup])

  useEffect(() => {
    if (classificationsID != 0)
      getSubClasificationsComboModel();
  }, [classificationsID])


  const getMainClasificationsComboModel = () => {
    MainClassificationService.getAllComboModel()
      .then((response) => {
        setMainClasifications(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getSubClasificationsComboModel = () => {
    SubClassificationService.getAllComboModelByClassificationID(Number(classificationsID))
      .then((response) => {
        setSubClasifications(response.data);
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
        
        response = LocationService.update(values);
      }
      else
      {
        let code=values.locationCode;
        values.locationCode=code.replaceAll(" ","");
        
        if(locations.find(x=> x.locationCode === values.locationCode) != null )
        {
          Alert(getMessage(500),3); //Record already exists.
          return;
        }
        else
        {
          response = LocationService.create(values);
        }
        
        
      }
      response.then((res) => {
        setOpenDialog(false);
        Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
        setValues(initialRecordState);
      })
        .catch((e) => {
          console.log(e);
          Alert((mode == 0) ? getMessage(301) : getMessage(302), 3);

        });
    }
  };


  return (
    <>

      <form noValidate autoComplete="on" onSubmit={saveRecord}>
        <Grid container spacing={1}>
        <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              margin="dense"
              label="Location Code"
              name="locationCode"
              type="text"
              style={(mode == 2) ? {width:"100%"} : {width:"92%"}}
              InputProps={{ inputProps: { maxLength:10} }}
              value={values.locationCode}
              onChange={handleInputChange}
              {...(errors.locationCode && {
                error: true,
                helperText: errors.locationCode,
              })}
              disabled={(mode == 0) ? false : true}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <MainClassification
              
                mode={mode}
                fieldName="classificationID"
                label="Main Classification"
                value={values.classificationID}
                options={mainClassifications}
                handleSelectChange={handleSelectChange}
                required={true}
                errors={errors.classificationID}
                setClasificationsID={setClasificationsID}
                disabled={(mode != 2) ? false : true}
              />
              <FormAddButton
                setCreateDialogOpen={setIsOpenMaincalssificationPopup}
                display={(mode == 2) ? false : true}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CommonAutocomplete
              
                mode={mode}
                fieldName="subClassificationID"
                label="Sub Classification"
                value={values.subClassificationID}
                options={subClassifications}
                handleSelectChange={handleSelectChange}
                required={true}
                errors={errors.subClassificationID}
                disabled={(mode != 2) ? false : true}
              />
              <FormAddButton
                setCreateDialogOpen={setIsOpenSubCalssificationPopup}
                display={(mode == 2) ? false : true}
              />
            </Stack>

          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-required"
              margin="dense"
              label="Description"
              name="description"
              type="text"
              style={(mode == 2) ? {width:"100%"} : {width:"92%"}}
              InputProps={{ inputProps: { maxLength:150} }}
              value={values.description}
              onChange={handleInputChange}
              {...(errors.description && {
                error: true,
                helperText: errors.description,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
        </Grid>
        <FormFooterButton
          mode={mode}
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </form>

      <PopupFrom
        openDialog={isOpenMaincalssificationPopup}
        setOpenDialog={setIsOpenMaincalssificationPopup}
        title={"New Main Calssification"}
        mode={0}
        setMode={null}>

        <CreateMainClassificaton
          setOpenDialog={setIsOpenMaincalssificationPopup}
          mode={0}
          selectedSubClasification={null}
          mainClassifications = {mainClassifications} />
      </PopupFrom>

      <PopupFrom
        openDialog={isOpenSubCalssificationPopup}
        setOpenDialog={setIsOpenSubCalssificationPopup}
        title={"Sub Calssification"}
        mode={0}
        setMode={null}>

        <CreateSubClassificaton
          setOpenDialog={setIsOpenSubCalssificationPopup}
          mode={0}
          selectedSubClasification={null}
          subClassifications = {subClassifications} />
      </PopupFrom>


    </>
  );
}

