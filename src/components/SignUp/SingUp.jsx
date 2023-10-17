import React, { useState, useEffect } from "react";
import { Alert, Button } from "@mui/material";
import { Check, Close } from "@material-ui/icons";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import getMessage from "../../common/Messages";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../assets/main/logo.png";
import MentalHealth from "../../assets/main/MentalHealth.jpg";
import axios from "axios";
import Link from "@mui/material/Link";
import LoginService from "../../services/LoginService";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © 2022 "}
      <Link color="inherit" href="https://www.Beeze.com/">
        Beeze:Psyche Eval (Pvt) Ltd.
      </Link>
      {"  All rights reserved."}
    </Typography>
  );
}
function SingUp() {
  const theme = createTheme();
  const initialRecordState = {
    fullname: "",
    username: "",
    password: "",
    conpassword: "",
  };

  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [ip, setIP] = useState("");

  const [values, setValues] = useState(initialRecordState);
  const [errors, setErrors] = useState({});

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    console.log(res.data.IPv4);
    setIP(res.data.IPv4);
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const validate = () => {
    let temp = {};
    temp.fullname = values.fullname !== "" ? "" : "This field is required";
    temp.username = values.username !== "" ? "" : "This field is required";
    temp.password = values.password !== "" ? "" : "This field is required";
    temp.conpassword =
      values.conpassword !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const checkPasswordMatch = () => {
    setPasswordsMatch(values.password == values.conpassword);
  };

  const [exists, setExists] = useState(false);

  const SingUpClick = async (e) => {
    e.preventDefault();
    if (validate()) {

      try {
        const response = await LoginService.checkusername(values);
  
        if (response.data.exists === true) {
          alert("Username already taken. Please choose a different username.");
        } else {
          const signupResponse = await LoginService.SingUp(values);
          alert("User registered successfully.");
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };

  return (
    <div>
      <form noValidate onSubmit={SingUpClick}>
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={8}
              sx={{
                backgroundImage: `url(${MentalHealth})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"

                  
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
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
                <Box
                  sx={{
                    backgroundImage: `url(${logo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "180px",
                    backgroundPosition: "center",
                    height: 150,
                    width: 354,
                    maxHeight: { xs: 150, md: 150 },
                    maxWidth: { xs: 354, md: 354 },
                  }}
                />

                <br />
                <Typography component="h2" variant="h5" color={"#22668D"}>
                  Welcome to Beeze:Psyche Eval!
                </Typography>
                <Typography component="h4" variant="h6" color={"#8ECDDD"}>
                  Sign Up
                </Typography>
                <Box noValidate autoComplete="on" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Full Name"
                    name="fullname"
                    value={values.fullname}
                    onChange={(e) => {
                      setValues({ ...values, fullname: e.target.value });
                    }}
                    {...(errors.fullname && {
                      error: true,
                      helperText: errors.fullname,
                    })}
                    required={true}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    label="User Name"
                    name="username"
                    value={values.username}
                    onChange={(e) => {
                      setValues({ ...values, username: e.target.value });
                    }}
                    {...(errors.username && {
                      error: true,
                      helperText: errors.username,
                    })}
                    required={true}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={(e) => {
                      setValues({ ...values, password: e.target.value });
                    }}
                    {...(errors.password && {
                      error: true,
                      helperText: errors.password,
                    })}
                    required={true}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="conpassword"
                    label="Confirm Password"
                    type="password"
                    value={values.conpassword}
                    onChange={(e) => {
                      setValues({ ...values, conpassword: e.target.value });
                    }}
                    onBlur={checkPasswordMatch} // Check password match when the field loses focus
                    {...(errors.conpassword && {
                      error: true,
                      helperText: errors.conpassword,
                    })}
                    required={true}
                    InputProps={{
                      endAdornment: (
                        <div>
                          {passwordsMatch ? (
                            <Check style={{ color: "green" }} />
                          ) : (
                            <Close style={{ color: "red" }} />
                          )}
                        </div>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign UP
                  </Button>
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

export default SingUp;
