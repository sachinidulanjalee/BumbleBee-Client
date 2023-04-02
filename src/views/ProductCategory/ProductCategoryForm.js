import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import * as DefineValues from "../../common/DefineValues";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Alert from "../../common/alert";
import FormFooterButton from "../../components/FormFooterButton";
import getMessage from "../../common/Messages";
import CategoryService from "../../services/CategoryService";
import Switch from "../../components/Switch";

const initialRecordState = {
  categoryId: "",
  categoryName: "",
  status: DefineValues.status().find(x => x.text == "Active").value,
  createdDateTime: "",
  createdUser: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedUser: "",
  modifiedMachine: "",
};

export function CreateCategory({
  setOpenDialog,
  mode,
  selectedCategory,
  category,
}) {
  const [isReset, setIsReset] = useState(false);
  const [switchedDate, setSwitchedDate] = useState(null);

  const validate = () => {
    let temp = {};
    temp.categoryName =
      values.categoryName !== "" ? "" : "This field is required";
    temp.status =
      values.status !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm ,handleSelectChange} =
    useFormNew(initialRecordState, true, validate);

  useEffect(() => {
    resetForm();
    if (selectedCategory != null)
      setValues({
        ...selectedCategory,
      });
  }, [selectedCategory, isReset]);

  const setModificationDetails = () => {
    values.categoryId = Number(values.categoryId);
    values.status=Number(values.status);

    if (mode == 0) {
      values.createdUser = localStorage.getItem("LoginUserID");
      values.createdMachine = localStorage.getItem("LoginMachineIp");
      values.createdDateTime = new Date();
      values.modifiedDateTime = new Date();
    } else {
      values.modifiedUser = localStorage.getItem("LoginUserID");
      values.modifiedMachine = localStorage.getItem("LoginMachineIp");
      values.modifiedDateTime = new Date();
    }
  };

  const saveRecord = (e) => {
    e.preventDefault();
    if (validate()) {
      setModificationDetails();

      let response;
      (mode) ?
        response = CategoryService.update(values) :
        response = CategoryService.create(values)

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
              margin="dense"
              label="Category Name"
              name="categoryName"
              type="text"
              fullWidth
              variant="outlined"
              value={values.categoryName}
              onChange={handleInputChange}
              {...(errors.categoryName && {
                error: true,
                helperText: errors.categoryName,
              })}
              disabled={mode != 2 ? false : true}
              required = "required"
              inputProps={{ maxLength: 150, }}
            />
          </Grid>
          <Grid item xs={6}>
            <Switch
              mode={mode}
              fieldName="status"
              label="Status"
              value={(Number(values.status) == Number(DefineValues.status().find(x => x.text == "Active").value)) ? true : false}
              handleSelectChange={handleSelectChange}
              required={true}
              errors={errors.status}
              text={DefineValues.status().map(x => x.text)}
              setSwitchedDate = {setSwitchedDate}
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
