import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import { Grid, TextField } from "@mui/material";
import moment from "moment";
import Alert from "../../common/alert";
import * as DefineValues from "../../common/DefineValues";
import FormFooterButton from "../../components/FormFooterButton";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";
import CheckBoxList from "../../components/CheckBoxList";
import UserService from "../../services/UserService";
import FunctionService from "../../services/FunctionService";
import getMessage from "../../common/Messages";
import getValidationRule from "../../common/ValidationRules";

const initialRecordState = {
  userID: "",
  userName: "",
  password: "",
  email: "",
  mobileNo: "",
  userType:"",
  expiryDate: moment(new Date("01-01-0023")).format("yyyy-MM-DD"),
  maximumAttemps: "",
  status: DefineValues.userStatus().find(x => x.text == "New User").value,
  funcationIDs: [],
  createdDateTime: "",
  createdUser: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedUser: "",
  modifiedMachine: '',
};

export function CreateUserManagement({ setOpenDialog, mode, selectedRecorde, users }) {
  const [isReset, setIsReset] = useState(false);
  const [lstFuncation, setLstFuncation] = useState([]);

  const isExistEmail = () => {
    if (values.email === "") return "";

    let recorde = users.find(x => x.email == values.email);
    if (recorde != null) {
      return (recorde.userID == values.userID) ? "" : "Email Already Added"
    }
    else
      return ""
  }

  const isExistUserName = () => {
    let recorde = users.find(x => x.userName === values.userName);
    if (recorde != null)
      return (mode != 0 && recorde.userID == values.userID) ? "" : "User Name Already Added"
    else
      return ""
  }

  const validate = () => {
    let temp = {};
    temp.userName = values.userName !== "" ? isExistUserName() : "This field is required";
    temp.password = values.password !== "" ? "" : "This field is required";
    temp.userType = values.userType !== "" ? "" : "This field is required";
    temp.status = values.status !== "" ? "" : "This field is required";
    temp.funcationIDs = values.funcationIDs.length != 0 ? "" : "This field is required";
    temp.mobileNo = values.mobileNo !== "" ? "" : "This field is required";
    temp.email = (values.email === "" || getValidationRule("email").test(values.email)) ?
      isExistEmail() : "Please Enter Valide Email";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, handleSelectChange, resetForm, handleCheckBoxChange } = useFormNew(initialRecordState, true, validate);

  useEffect(() => {
    resetForm();
    if (selectedRecorde != null) {
      setValues({
        ...selectedRecorde
      })
    }

  }, [selectedRecorde, isReset])

  useEffect(() => {
    getAllFunctions();
  }, [])

  const getAllFunctions = () => {
    FunctionService.getAll()
      .then((response) => {
        setLstFuncation(response.data);
      })
      .catch((e) => {
        Alert(getMessage(400), 3);
      });
  };

  const setModificationDetails = () => {
    values.userID = Number(values.userID);
    values.maximumAttemps = Number(values.maximumAttemps);
    values.status = Number(values.status);
    values.userType= Number(values.userType);

    if (mode == 0) {
      values.createdUser = localStorage.getItem("LoginUserID");
      values.createdMachine = localStorage.getItem("LoginMachineIp");
      values.createdDateTime = new Date();
      values.modifiedDateTime = new Date();
    }
    else {
      values.modifiedUser = localStorage.getItem("LoginUserID");
      values.modifiedMachine = localStorage.getItem("LoginMachineIp");
      values.modifiedDateTime = new Date();
    }
  }

  const saveRecord = (e) => {
    e.preventDefault();


    if (validate()) {
      setModificationDetails();

      let response;
      (mode)
        ? response = UserService.update(values)
        : response = UserService.create(values)

      response.then((res) => {
        Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
        setValues(initialRecordState);
        window.location.reload(false)
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
          <Grid item xs={4}>
            <TextField
              margin="dense"
              label="User Name"
              name="userName"
              type="text"
              fullWidth
              variant="outlined"
              value={values.userName}
              onChange={handleInputChange}
              {...(errors.userName && { error: true, helperText: errors.userName })}
              disabled={(mode == 0) ? false : true}
              required={true}
              inputProps={{ maxLength: 250 }}
            />
          </Grid>

          <Grid item xs={4} style={{ display: (mode != 0) ? "none" : "" }}>
            <TextField
              margin="dense"
              label="Password"
              name="password"
              type="text"
              fullWidth
              variant="outlined"
              value={values.password}
              onChange={handleInputChange}
              {...(errors.password && { error: true, helperText: errors.password })}
              disabled={(mode != 2) ? false : true}
              required={true}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={4}>
            <CommonAutocomplete
              mode={mode}
              fieldName="userType"
              label="UserType"
              value={values.userType}
              options={DefineValues.userType()}
              handleSelectChange={handleSelectChange}
              errors={errors.userType}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              margin="dense"
              label="Email"
              name="email"
              type="text"
              fullWidth
              variant="outlined"
              value={values.email}
              onChange={handleInputChange}
              {...(errors.email && { error: true, helperText: errors.email })}
              disabled={(mode != 2) ? false : true}
              inputProps={{ maxLength: 250 }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
            required
              margin="dense"
              label="Mobile No"
              name="mobileNo"
              type="number"
              fullWidth
              variant="outlined"
              value={values.mobileNo}
              onChange={handleInputChange}
              {...(errors.mobileNo && {
                error: true,
                helperText: errors.mobileNo,
              })}
              disabled={(mode != 2) ? false : true}
              onInput={(e) => {
                e.target.value = e.target.value.toString().slice(0, 10)
              }}

            />
          </Grid>

          <Grid item xs={4}>
            <CommonAutocomplete
              mode={mode}
              fieldName="status"
              label="Status"
              value={values.status}
              options={DefineValues.userStatus()}
              handleSelectChange={handleSelectChange}
              errors={errors.status}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="outlined-required"
              margin="dense"
              label="Expiry Date"
              name="expiryDate"
              type="date"
              placeholder=""
              InputLabelProps={{ shrink: true, }}
              fullWidth
              value={moment(values.expiryDate).format("yyyy-MM-DD")}
              onChange={handleInputChange}
              {...(errors.expiryDate && {
                error: true,
                helperText: errors.expiryDate,
              })}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              label="Maximum Attemps"
              name="maximumAttemps"
              type="number"
              fullWidth
              variant="outlined"
              value={values.maximumAttemps}
              onChange={handleInputChange}
              {...(errors.maximumAttemps && {
                error: true,
                helperText: errors.maximumAttemps,
              })}
              disabled={(mode != 2) ? false : true}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
              }}
              InputProps={{ inputProps: { min: 1 } }}

            />
          </Grid>
          <Grid item xs={12}>
            <CheckBoxList
              label={"System Function"}
              name="funcationIDs"
              CheckBoxlist={lstFuncation}
              CheckedList={values.funcationIDs}
              handleCheckBoxChange={handleCheckBoxChange}
              error={errors.funcationIDs}
              disabled={(mode != 2) ? false : true} />
          </Grid>

        </Grid>

        <FormFooterButton
          mode={mode}
          isReset={isReset}
          setIsReset={setIsReset}
          isVisibalReset={false}
        />
      </form>
    </>
  );
}

