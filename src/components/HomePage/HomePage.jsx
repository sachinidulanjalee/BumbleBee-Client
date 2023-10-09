import React from "react";

import { Box, Container, Typography } from "@mui/material";

import Navbar from "../NavBar";
import bgImage from "../../assets/main/GameOver-01-768x461.webp";

const HomePage = () => {
  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        p: {
          xs: 2,
          sm: 5,
          md: 2,
        },
        background: `url(${bgImage}) center center/cover`,
        opacity:"50",
        minHeight: "800px",
        borderRadius: {
          xs: "0px 0px 27px 27px",
          md: "0px 0px 54px 54px"
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Typography
          sx={{
            color: "#fff",
            marginTop: "196.5px",
            textAlign: "center",
            fontWeight: "600",
            fontSize: {
              xs: "38px",
              md: "48px",
            },
            lineHeight: "62px",
            mb: 4,
          }}
        >
          {/* The Elastic Brain: The Most Important Thinking Habit Nobody Taught You - Thrive Global */}
        </Typography>
        {/* <SearchNav /> */}
      </Box>
    </Container>
  );
};

export default HomePage;