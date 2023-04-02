import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import MainClassificationService from "../../services/MainClassificationService";
import Alert from "../../common/alert";
import FormFooterButton from "../../components/FormFooterButton";
import getMessage from "../../common/Messages";

const initialRecordState = {
  classificationID: "",
  descriptionEnglish: "",
  descriptionSinhala: "",
  createdDateTime: "",
  createdBy: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedBy: "",
  modifiedMachine: "",
};

export function CreateMainClassificaton({
  setOpenDialog,
  mode,
  selectedMainClasification,
  mainClassifications,
}) {
  const [isReset, setIsReset] = useState(false);

  const validate = () => {
    let temp = {};
    temp.classificationID =
      values.classificationID !== "" ? "" : "This field is required";
    temp.descriptionEnglish =
      values.descriptionEnglish !== "" ? "" : "This field is required";
    temp.descriptionSinhala =
      values.descriptionSinhala !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormNew(initialRecordState, true, validate);

  useEffect(() => {
    resetForm();
    if (selectedMainClasification != null)
      setValues({
        ...selectedMainClasification,
      });
  }, [selectedMainClasification, isReset]);

  const setModificationDetails = () => {
    values.classificationID = Number(values.classificationID);

    if (mode == 0) {
      values.createdBy = localStorage.getItem("LoginUserID");
      values.createdMachine = localStorage.getItem("LoginMachineIp");
      values.createdDateTime = new Date();
      values.modifiedDateTime = new Date();
    } else {
      values.modifiedBy = localStorage.getItem("LoginUserID");
      values.modifiedMachine = localStorage.getItem("LoginMachineIp");
      values.modifiedDateTime = new Date();
    }
  };

  const saveRecord = (e) => {
    e.preventDefault();
    if (validate()) {
      setModificationDetails();
      let response;

      if(mode)
      {
        response = MainClassificationService.update(values);
        response.then((res)=>{
          setOpenDialog(false);
          Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
          setValues(initialRecordState);
        })
      }
      else
      {
        response=MainClassificationService.isExists(values.classificationID);

        response.then((res) => {
          if(res.data)
          {
            
            Alert(getMessage(500),3); //Record already exists.
            return;
          }
          else
          {
            MainClassificationService.create(values).then((result)=> {
              setOpenDialog(false);
              setOpenDialog(false);
              Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
              setValues(initialRecordState);
            })
            
          }
          setValues(initialRecordState);
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
            <TextField
              margin="dense"
              label="Main Classification Id"
              name="classificationID"
              type="number"
              fullWidth
              variant="outlined"
              InputProps={{ inputProps: { min: 1, max: 999 } }}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 3);
              }}
              value={values.classificationID}
              onChange={handleInputChange}
              {...(errors.classificationID && {
                error: true,
                helperText: errors.classificationID,
              })}
              disabled={mode == 0 ? false : true}
              required = "required"
              inputProps={{ maxLength: 150, }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="English Description"
              name="descriptionEnglish"
              type="text"
              fullWidth
              variant="outlined"
              value={values.descriptionEnglish}
              onChange={handleInputChange}
              {...(errors.descriptionEnglish && {
                error: true,
                helperText: errors.descriptionEnglish,
              })}
              disabled={mode != 2 ? false : true}
              required = "required"
              inputProps={{ maxLength: 150, }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Sinhala Description"
              name="descriptionSinhala"
              type="text"
              fullWidth
              variant="outlined"
              value={values.descriptionSinhala}
              onChange={handleInputChange}
              {...(errors.descriptionSinhala && {
                error: true,
                helperText: errors.descriptionSinhala,
              })}
              disabled={mode != 2 ? false : true}
              required = "required"
            />
          </Grid>
        </Grid>

        <FormFooterButton
          mode={mode}
          isReset={isReset}
          setIsReset={setIsReset}
        />
      </form>
    </>
  );
}
