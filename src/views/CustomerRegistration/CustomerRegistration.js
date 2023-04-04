import React, { useState, useEffect } from "react";
import { useFormNew } from "../../hooks/useFormNew";
import { Grid, TextField,Typography } from "@mui/material";
import moment from "moment";
import Alert from "../../common/alert";
import * as DefineValues from "../../common/DefineValues";
import FormFooterButton from "../../components/FormFooterButton";
import SmallCommonAutocomplete from "../../components/Autocomplete/SmallCommonAutocomplete";
import CheckBoxList from "../../components/CheckBoxList";
import UserService from "../../services/UserService";
import FunctionService from "../../services/FunctionService";
import getMessage from "../../common/Messages";
import getValidationRule from "../../common/ValidationRules";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";


const initialRecordState = {
  userID: "",
  userName: "",
  password: "",
  email: "",
  mobileNo: "",
  userType:DefineValues.userType().find(x => x.text == "User").value,
  expiryDate: moment(new Date("12-31-2023")).format("yyyy-MM-DD"),
  maximumAttemps: "3",
  status: DefineValues.userStatus().find(x => x.text == "Active").value,
  createdDateTime: "",
  createdUser: "",
  createdMachine: "",
  modifiedDateTime: "",
  modifiedUser: "",
  modifiedMachine: '',
};

export default function CustomerRegistration({ setOpenDialog, mode, selectedRecorde }) {
  const [isReset, setIsReset] = useState(false);
  const [users, setUsers] = useState();
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
    if (recorde != null){
      console.log(recorde.userName, values.userName)
      return ( recorde.userID == values.userID) ? "" : "User Name Already Added"
    }else
      return ""
  }

  const validate = () => {
    let temp = {};
    temp.userName = values.userName !== "" ? isExistUserName() : "This field is required";
    temp.password = values.password !== "" ? "" : "This field is required";
    temp.userType = values.userType !== "" ? "" : "This field is required";
    temp.status = values.status !== "" ? "" : "This field is required";
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
    getAllUsers();
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

  const getAllUsers = () => {
    UserService.getAll()
      .then((response) => {
        setUsers(response.data);
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

    if (true) {
      values.createdUser = "admin";
      values.createdMachine = localStorage.getItem("LoginMachineIp");
      values.createdDateTime = new Date();
      values.modifiedUser = "admin";
      values.modifiedMachine = localStorage.getItem("LoginMachineIp");
      values.modifiedDateTime = new Date();
    }
  }

  const saveRecord = (e) => {
    e.preventDefault();

console.log(values)
    if (validate()) {
      setModificationDetails();

      let response;
      (mode)
        ? response = UserService.update(values)
        : response = UserService.Usercreate(values)
      response.then((res) => {
        console.log("save",res)
       // Alert((mode == 0) ? getMessage(201) : getMessage(202), 1);
        Alert("User Registraion Success!");
        setValues(initialRecordState);
        //window.location.reload(false)
      })
        .catch((e) => {
          console.log(e);
         // Alert((mode == 0) ? getMessage(301) : getMessage(302), 3);
         Alert("User Registraion Faild!");
        });
    }
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Customer Registration"
          sx={{ paddingBottom: 1, paddingTop: 1 }}
        ></CardHeader>
        <Divider />
        <CardContent>
        
      <form noValidate autoComplete="on" onSubmit={saveRecord}>
      <Grid container item spacing={0} md={5} xs={12}>

        <Grid item xs={12} sx={{ paddingBottom: "2px", display: "flex" }}>
            <Grid item xs={4} container direction="row" alignItems="center">
              <Typography sx={{ fontSize: "14px" }}>User Name</Typography>
            </Grid>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              name="userName"
              type="text"
              InputProps={{ sx: { height: 28, fontSize: 14 } }}
              fullWidth
              variant="outlined"
              value={values.userName}
              onChange={handleInputChange}
              {...(errors.userName && { error: true, helperText: errors.userName })}
              disabled={false }
              required={true}
              inputProps={{ maxLength: 250 }}
            />
          </Grid>
          </Grid>

          <Grid item xs={12} sx={{ paddingBottom: "2px", display: "flex" }}>
            <Grid item xs={4} container direction="row" alignItems="center">
              <Typography sx={{ fontSize: "14px" }}>Password</Typography>
            </Grid>
          <Grid item xs={4}>
            <TextField
              margin="dense"
              name="password"
              type="password"
              InputProps={{ sx: { height: 28, fontSize: 14 } }}
              fullWidth
              variant="outlined"
              value={values.password}
              onChange={handleInputChange}
              {...(errors.password && { error: true, helperText: errors.password })}
              disabled={false}
              required={true}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: "2px", display: "flex" }}>
            <Grid item xs={4} container direction="row" alignItems="center">
              <Typography sx={{ fontSize: "14px" }}>User Type</Typography>
            </Grid>
            <Grid item xs={4}>
            <SmallCommonAutocomplete
              mode={mode}
              fieldName="userType"
              value={values.userType}
              options={DefineValues.userType()}
              handleSelectChange={handleSelectChange}
              errors={errors.userType}
              disabled={true}
            />
          </Grid>
          </Grid>
        
          <Grid item xs={12} sx={{ paddingBottom: "2px", display: "flex" }}>
            <Grid item xs={4} container direction="row" alignItems="center">
              <Typography sx={{ fontSize: "14px" }}>Email</Typography>
            </Grid>
            <Grid item xs={4}>
            <TextField
              margin="dense"
              name="email"
              type="text"
              InputProps={{ sx: { height: 28, fontSize: 14 } }}
              fullWidth
              variant="outlined"
              value={values.email}
              onChange={handleInputChange}
              {...(errors.email && { error: true, helperText: errors.email })}
              disabled={(mode != 2) ? false : true}
              inputProps={{ maxLength: 250 }}
            />
          </Grid>
          </Grid>

         
          <Grid item xs={12} sx={{ paddingBottom: "2px", display: "flex" }}>
            <Grid item xs={4} container direction="row" alignItems="center">
              <Typography sx={{ fontSize: "14px" }}>Mobile</Typography>
            </Grid>
            <Grid item xs={4}>
            <TextField
            required
              margin="dense"
              name="mobileNo"
              type="number"
              InputProps={{ sx: { height: 28, fontSize: 14 } }}
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
          </Grid>

         
          <Grid item xs={12} sx={{ paddingBottom: "2px", display: "flex" }}>
            <Grid item xs={4} container direction="row" alignItems="center">
              <Typography sx={{ fontSize: "14px" }}>Status</Typography>
            </Grid>
            <Grid item xs={4}>
            <SmallCommonAutocomplete

              mode={mode}
              fieldName="status"
              value={values.status}
              options={DefineValues.userStatus()}
              handleSelectChange={handleSelectChange}
              errors={errors.status}
              disabled={(mode != 2) ? false : true}
            />
          </Grid>
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: "2px", display: "flex" }}>
            <Grid item xs={4} container direction="row" alignItems="center">
              
            </Grid>
          <Grid item xs={4}>
          <FormFooterButton
          mode={mode}
          isReset={isReset}
          setIsReset={setIsReset}
          isVisibalReset={false}
          sx={{paddingRight: "0px"}}
        />
          </Grid>
          </Grid>
        </Grid>


      </form>
        </CardContent>
      </Card>


    </>
  );
}

