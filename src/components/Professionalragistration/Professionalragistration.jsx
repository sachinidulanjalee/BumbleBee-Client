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
import clinicalpsychology from "../../assets/main/clinical-psychology.jpg";
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
function Professionalragistration() {
  const theme = createTheme();
  const initialRecordState = {
    Name: "",
    ContactNumber: "",
    Email: "",
    Qualifications: "",
    Link:"",
    Status:3
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
    temp.Name = values.Name !== "" ? "" : "This field is required";
    temp.ContactNumber = values.ContactNumber !== "" ? "" : "This field is required";
    temp.Email = values.Email !== "" ? "" : "This field is required";
    temp.Qualifications = values.Qualifications !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };


  const [exists, setExists] = useState(false);

  const Submit = async (e) => {
    e.preventDefault();
    let response;
    if (validate()) {
      try {
        response = await LoginService.ProfessionalRegister(values);
          alert("User registered successfully.");
          setValues(initialRecordState);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };

  return (
    <div>
      <form noValidate onSubmit={Submit}>
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={8}
              sx={{
                backgroundImage: `url(${clinicalpsychology})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}/>
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
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "180px",
                    backgroundPosition: "center",
                    height: 150,
                    width: 354,
                    maxHeight: { xs: 150, md: 150 },
                    maxWidth: { xs: 354, md: 354 },
                  }}
                />
                <Typography component="h2" variant="h5" color={"#22668D"}>
                Are You A Psychology Professional?
                </Typography>
                <Typography component="h4" variant="h10" color={"#8ECDDD"}>
                Fill The Form To Get Registered...
                </Typography>
                <Typography >
                <h5>Your details will be displayed in this Web Site and People in need might reach you seeking help.</h5>
                </Typography>
                <Box noValidate autoComplete="on" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    label="Name"
                    name="Name"
                    value={values.Name}
                    onChange={(e) => {
                      setValues({ ...values, Name: e.target.value });
                    }}
                    {...(errors.Name && {
                      error: true,
                      helperText: errors.Name,
                    })}
                    required={true}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="ContactNumber"
                    label="ContactNumber"
                    type="text"
                    value={values.ContactNumber}
                    onChange={(e) => {
                      setValues({ ...values, ContactNumber: e.target.value });
                    }}
                    {...(errors.ContactNumber && {
                      error: true,
                      helperText: errors.ContactNumber,
                    })}
                    required={true}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="Email"
                    label="Email"
                    type="text"
                    value={values.Email}
                    onChange={(e) => {
                      setValues({ ...values, Email: e.target.value });
                    }}
                    {...(errors.Email && {
                      error: true,
                      helperText: errors.Email,
                    })}
                    required={true}
                   />
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Qualifications"
                    name="Qualifications"
                    value={values.Qualifications}
                    onChange={(e) => {
                      setValues({ ...values, Qualifications: e.target.value });
                    }}
                    {...(errors.Qualifications && {
                      error: true,
                      helperText: errors.Qualifications,
                    })}
                    required={true}
                    
                  />
                    <TextField
                    margin="normal"
                    fullWidth
                    label="Linkend Profile"
                    name="Link"
                    value={values.Link}
                    onChange={(e) => {
                      setValues({ ...values, Link: e.target.value });
                    }}
                    {...(errors.Link && {
                      error: true,
                      helperText: errors.Link,
                    })}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register
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

export default Professionalragistration;
