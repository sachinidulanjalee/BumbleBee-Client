import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import { Grid, Stack, TextField, Typography } from "@mui/material";
import moment from "moment";
import Alert from "../../common/alert";
import * as DefineValues from "../../common/DefineValues";
import FormFooterButton from "../../components/FormFooterButton";
import MainClassification from "../../components/Autocomplete/MainClassification";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import BookService from "../../services/BookService";
import MainClassificationService from "../../services/MainClassificationService";
import SubClassificationService from "../../services/SubClassificationService";
import FormAddButton from "../../components/FormAddButton";
import PopupFrom from "../../components/PopupFrom";
import { CreateMainClassificaton } from "../MainClassification/MainClassificationForm";
import { CreateSubClassificaton } from "../SubClassification/SubClassificationForm";
import getMessage from "../../common/Messages";


const initialRecordState = {
  bookID: "",
  subClassificationID: "",
  classificationID: "",
  descriptionEnglish: "",
  descriptionSinhala: "",
  auhtors: "",
  publisher: "",
  edition: "",
  year: "",
  series: "",
  language: "",
  pages: "",
  ddsCode: "",
  isbn: "",
  status: "",
  memberID: "",
  lendedDate: null,
  createdDateTime: "",
  createdBy: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedBy: "",
  modifiedMachine: '',
};

export function CreateBookForm({ setOpenDialog, mode, selectedBook }) {
  const [isReset, setIsReset] = useState(false);
  const [mainClassifications, setMainClasifications] = useState([]);
  const [classificationsID, setClasificationsID] = useState(0);
  const [subClassifications, setSubClasifications] = useState([]);
  const [isOpenMaincalssificationPopup, setIsOpenMaincalssificationPopup] = useState(false);
  const [isOpenSubcalssificationPopup, setIsOpenSubCalssificationPopup] = useState(false);

  const validate = () => {
    let temp = {};
    temp.subClassificationID = values.subClassificationID !== "" ? "" : "This field is required";
    temp.classificationID = values.classificationID !== "" ? "" : "This field is required";
    temp.descriptionEnglish = values.descriptionEnglish !== "" ? "" : "This field is required";
    temp.status = values.status !== "" ? "" : "This field is required";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, handleSelectChange, resetForm } = useFormNew(initialRecordState, true, validate);


  useEffect(() => {
    getMainClasificationsComboModel();
    resetForm();
    if (selectedBook != null) {
      setValues({
        ...selectedBook
      })
      setClasificationsID(selectedBook.classificationID);
    }

  }, [selectedBook, isReset])

  useEffect(() => {
    getMainClasificationsComboModel();
    getSubClasificationsComboModel();
  }, [isOpenMaincalssificationPopup, isOpenSubcalssificationPopup])

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
    values.bookID = Number(values.bookID);
    values.subClassificationID = Number(values.subClassificationID);
    values.classificationID = Number(values.classificationID);
    values.language = Number(values.language);
    values.year = Number(values.year);
    values.pages = Number(values.pages);
    values.status = Number(values.status);
    values.memberID = Number(values.memberID);

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
      (mode) ?
        response = BookService.update(values) :
        response = BookService.create(values)

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
          <Grid item xs={6}>
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
                display={(mode != 0) ? false : true} />
            </Stack>
          </Grid>
          <Grid item xs={6}>
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
                display={(mode != 0) ? false : true} />
            </Stack>
          </Grid>
          <Grid item xs={5.4}>
         
            <TextField
              margin="dense"
              label="English Description"
              name="descriptionEnglish"
              type="text"
              inputProps={{maxLength: 250,}}
              fullWidth
              variant="outlined"
              value={values.descriptionEnglish}
              onChange={handleInputChange}
              {...(errors.descriptionEnglish && { error: true, helperText: errors.descriptionEnglish })}
              disabled={(mode != 2) ? false : true}
              required={true}
            />
          
          </Grid>
          <Grid item xs={6} style={{paddingLeft:'50px'}} >
            <TextField 
              margin="dense"
              label="Sinhala Description"
              name="descriptionSinhala"
              type="text"
              inputProps={{maxLength: 250,}}
              fullWidth
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
          <Grid item xs={5.4}>
            <TextField
              margin="dense"
              label="Auhtors(s)"
              name="auhtors"
              type="text"
              inputProps={{maxLength: 250,}}
              fullWidth
              variant="outlined"
              value={values.auhtors}
              onChange={handleInputChange}
              {...(errors.auhtors && {
                error: true,
                helperText: errors.auhtors,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={6} style={{paddingLeft:'50px'}}>
            <TextField
              margin="dense"
              label="Publisher"
              name="publisher"
              type="text"
              inputProps={{maxLength: 150,}}
              fullWidth
              variant="outlined"
              value={values.publisher}
              onChange={handleInputChange}
              {...(errors.publisher && {
                error: true,
                helperText: errors.publisher,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={5.4}>
            <TextField
              margin="dense"
              label="edition"
              name="edition"
              type="text"
              inputProps={{maxLength: 150}}
              fullWidth
              variant="outlined"
              value={values.edition}
              onChange={handleInputChange}
              {...(errors.edition && {
                error: true,
                helperText: errors.edition,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={6} style={{paddingLeft:'50px'}}>
            <TextField
              margin="dense"
              label="Year"
              name="year"
              type="number"
              fullWidth
              variant="outlined"
              InputProps={{ inputProps: { min: 1, max: 9999 } }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
              }}
              value={values.year}
              onChange={handleInputChange}
              {...(errors.year && {
                error: true,
                helperText: errors.year,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={5.4}>
            <TextField
              margin="dense"
              label="Series"
              name="series"
              type="text"
              inputProps={{maxLength: 150}}
              fullWidth
              variant="outlined"
              value={values.series}
              onChange={handleInputChange}
              {...(errors.series && {
                error: true,
                helperText: errors.series,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={6} style={{paddingLeft:'50px'}}>
            <CommonAutocomplete
              mode={mode}
              fieldName="language"
              label="Language"
              value={values.language}
              options={DefineValues.language()}
              handleSelectChange={handleSelectChange}
              required={false}
              errors={errors.language}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={5.4}>
            <TextField
              margin="dense"
              label="Pages"
              name="pages"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 9999 } }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
              }}
              fullWidth
              variant="outlined"
              value={values.pages}
              onChange={handleInputChange}
              {...(errors.pages && {
                error: true,
                helperText: errors.pages,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={6} style={{paddingLeft:'50px'}}>
            <TextField
              margin="dense"
              label="DDSCode"
              name="ddsCode"
              type="text"
              fullWidth
              variant="outlined"
              value={values.ddsCode}
              onChange={handleInputChange}
              {...(errors.ddsCode && {
                error: true,
                helperText: errors.ddsCode,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={5.4}>
            <TextField
              margin="dense"
              label="ISBN"
              name="isbn"
              type="text"
              fullWidth
              variant="outlined"
              value={values.isbn}
              onChange={handleInputChange}
              {...(errors.isbn && {
                error: true,
                helperText: errors.isbn,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={6} style={{paddingLeft:'50px'}}>
            <CommonAutocomplete
              mode={mode}
              fieldName="status"
              label="Status"
              value={values.status}
              options={DefineValues.avalaibleStatus()}
              handleSelectChange={handleSelectChange}
              required={true}
              errors={errors.status}
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
        openDialog={isOpenSubcalssificationPopup}
        setOpenDialog={setIsOpenSubCalssificationPopup}
        title={"New Sub Calssification"}
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

