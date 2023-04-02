import React, { useState, useEffect } from "react";
import { Check, Close, Image } from "@material-ui/icons";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();
function UnAuthorized(props) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={false}
            sm={4}
            md={11}
            sx={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/img/403.png"
              })`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "50%",
              backgroundPosition: "center",
            }}
          />
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box noValidate autoComplete="on" sx={{ mt: 1 }}></Box>
          </Box>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default UnAuthorized;
