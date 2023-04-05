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
import LoginService from "../../services/LoginService";
import getMessage from "../../common/Messages";
import Alert from "../../common/alert";
import ChnagePassword from "./ChnagePassword";
import axios from 'axios'


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
  userName: "",
  password: "",
};

function Login() {

  const [ip, setIP] = useState('');


  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    console.log(res.data.IPv4);
    setIP(res.data.IPv4)
  }

  const validate = () => {
    let temp = {};
    temp.userName = values.userName !== "" ? "" : "This field is required";
    temp.password = values.password !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormNew(initialRecordState, true, validate);

  const [IsOpenPasswordChangeDialog, setIsOpenPasswordChangeDialog] =
    useState(false);

  useEffect(() => {
    getData();

  }, [IsOpenPasswordChangeDialog]);



  const LoginClick = (e) => {
    e.preventDefault();
    if (validate()) {

      let response;
      response = LoginService.Login(values.userName, values.password);

      response
        .then((res) => {
          console.log("res", res.data.userID)
          switch (res.data.result) {
            case 0:
              Alert(res.data.msg, 3);
              break;
            case 1:
              setIsOpenPasswordChangeDialog(true);
              break;
            case 2:
              debugger;
              localStorage.setItem("LoginState", "true");
              localStorage.setItem("LoginUserID", res.data.userID);
              localStorage.setItem("LoginUserName", res.data.userName);
              localStorage.setItem("LoginMachineIp", ip);
              window.location.replace("/Dashboard");
              break;
            case 3:
              Alert(res.data.msg, 3);
              break;
            case 4:
              Alert(res.data.msg, 3);
              break;
            case 5:
              Alert(res.data.msg, 3);
              break;
          }
        })
        .catch((e) => {
          Alert(getMessage(503), 3);
        });
    } else {
      Alert("Invalid Username or Password.", 3);
    }
  };

  return (
    <div>
      <form noValidate onSubmit={LoginClick}>
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={8}
              sx={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/img/BuyNow_payLater.jpg"
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
                  Sign in
                </Typography>
                <Box noValidate autoComplete="on" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="User Name"
                    name="userName"
                    autoComplete="email"
                    onChange={handleInputChange}
                    {...(errors.userName && {
                      error: true,
                      helperText: errors.userName,
                    })}
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleInputChange}
                    {...(errors.password && {
                      error: true,
                      helperText: errors.password,
                    })}
                    autoComplete="current-password"
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
                <Grid item xs>
                  <Link href="/ChnagePassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/RegisterForm" variant="body2"  >
                    {"Don't have an account? Sign Up"}
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

      <ChnagePassword
        IsOpenPasswordChangeDialog={IsOpenPasswordChangeDialog}
        setIsOpenPasswordChangeDialog={setIsOpenPasswordChangeDialog}
        userName={values.userName}
        oldPassword={values.password}
      ></ChnagePassword>
    </div>
  );
}

export default Login;
