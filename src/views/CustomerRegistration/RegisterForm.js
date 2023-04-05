import React, { useState, useEffect } from "react";
import { DialogActions, Button } from "@mui/material";
import { Check, Close, Image } from "@material-ui/icons";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormNew } from "../../hooks/useFormNew";
import moment from "moment";
import FunctionService from "../../services/FunctionService";
import getMessage from "../../common/Messages";
import Alert from "../../common/alert";
import * as DefineValues from "../../common/DefineValues";
import UserService from "../../services/UserService";
import CommonAutocomplete from "../../components/Autocomplete/CommonAutocomplete";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © 2022 "}
      <Link color="inherit" href="https://www.BumbleBee.com/">
        BumBleBee (Pvt) Ltd.
      </Link>
      {"  All rights reserved."}
    </Typography>
  );
}
const theme = createTheme();
const initialRecordState = {
  userID: "",
  userName: "",
  password: "",
  dateOfBirth:"",
  email: "",
  mobileNo: "",
  userType: DefineValues.userType().find(x => x.text == "User").value,
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
export default function RegisterForm({ setOpenDialog, mode, selectedRecorde }) {
  const [isReset, setIsReset] = useState(false);
  const [users, setUsers] = useState();
  const [lstFuncation, setLstFuncation] = useState([]);

  const getAge = (dob) => {
    // get the date of birth as a string (YYYY-MM-DD)
//const dob = "1990-01-01";

// create a new Date object from the date of birth string
const birthDate = new Date(dob);

// get the current date
const currentDate = new Date();

// calculate the age in years by subtracting the birth year from the current year
let age = currentDate.getFullYear() - birthDate.getFullYear();

// adjust the age based on the current month and day of the month
if (currentDate.getMonth() < birthDate.getMonth() || 
    (currentDate.getMonth() == birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
    age--;
}

// log the age to the console
console.log("age",age);
return age;
  }

  //creating function to load ip address from the API

  const validate = () => {
    let temp = {};
    let age = getAge(values.dateOfBirth);
    temp.userName = values.userName !== "" ? "" : "This field is required";
    temp.password = values.password !== "" ? "" : "This field is required";
    temp.dateOfBirth = age >= 18 && values.dateOfBirth !== "" ? "" : "This field is required";
  if(typeof age === 'number' && age <= 18) temp.dateOfBirth = values.dateOfBirth !== ""  && "Above 18+";


console.log(temp)
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, handleSelectChange, resetForm } =
    useFormNew(initialRecordState, true, validate);

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
    values.userType = Number(values.userType);

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
        console.log("save", res)
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
    <div>
      <form noValidate onSubmit={saveRecord}>
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={8}
              sx={{
                backgroundImage: `url(${process.env.PUBLIC_URL + "/img/PayLater.jpg"
                  })`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "100%",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={4}
              sm={8}
              md={4}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h4" variant="h5" sm={1}>
                Bumble bee: Buy first and pay later
                </Typography>
                <br />
                <Typography component="h2" variant="h5">
                  Sign Up
                </Typography>

                <Box noValidate autoComplete="on" sx={{ mt: 1 }}>
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
                    disabled={false}
                    required={true}
                    inputProps={{ maxLength: 250 }}
                    autoFocus
                  />

                  <TextField
                    margin="dense"
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={values.password}
                    onChange={handleInputChange}
                    {...(errors.password && { error: true, helperText: errors.password })}
                    disabled={false}
                    required={true}
                    inputProps={{ maxLength: 50 }}
                  />
                   <TextField
                    required
                    margin="dense"
                    label="Date Of Birth"
                    name="dateOfBirth"
                    type="date"
                    fullWidth
                    variant="outlined"
                    value={moment(values.dateOfBirth).format("yyyy-MM-DD")}
                    onChange={handleInputChange}
                    {...(errors.dateOfBirth && {
                      error: true,
                      helperText: errors.dateOfBirth,
                    })}
                    disabled={(mode != 2) ? false : true}
                    onInput={(e) => {
                      e.target.value = e.target.value.toString().slice(0, 10)
                    }}

                  />
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
                  <TextField
                    required
                    margin="dense"
                    label="MobileNo"
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

                  <CommonAutocomplete
                    mode={mode}
                    fieldName="userType"
                    value={values.userType}
                    options={DefineValues.userType()}
                    handleSelectChange={handleSelectChange}
                    errors={errors.userType}
                    disabled={true}
                  />

                  {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>


                  <Grid container>
                    <Grid item>
                    <Link href="/Login" variant="body2"  >
                    {"Have already an account? Login here"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      </form>

    </div>
  );
}
