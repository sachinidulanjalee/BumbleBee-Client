import React from "react";

import { Box, Container, Typography } from "@mui/material";

import SecondaryButton from "../secondary-button/SecondaryButton";
import aboutUsImg from "../../assets/main/about-us-img.svg";

const AboutUs = () => {
  return (
    <Container
      disableGutters
      maxWidth="lg"
      sx={{
        px: {
          xs: 2,
          sm: 5,
          md: 3.5,
        },
        my: 15,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          justifyContent: "center",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: "40px",
              lineHeight: "48px",
              color: "#161414",
              textAlign: {
                xs: "center",
                md: "center",
              },
            }}
          >
            About Us
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: "400",
              fontSize: "16px",
              lineHeight: "32px",
              color: "#5B5B5B",
              my: 4,
            }}
          >
            <h1>Who We Are?</h1>
            <p> We are a non-profitable organization purely intend to help people maintaining their mental health.</p>
            <h1>What We Do?</h1>
            <p>We provide efficient and modern tests to allow people to get evaluated them self mentally.</p>

            <h2 >Terms And Conditions.</h2>
            <div>
              <ul >
                <li class="symptomsLsit">This system is not a diagnostic tool.</li>
                <li class="symptomsLsit">This system is an evaluation platform only.</li>
                <li class="symptomsLsit">Test results are purely depend on the user responses.</li>
                <li class="symptomsLsit">Registered professionals have been volunteered for help people in need.
                  <br />But we don't guarantee
                  the professional services will be free of charge. <br />It is to be decided by the relevant professional.</li>
              </ul>
            </div>

          </Typography>
          <SecondaryButton text="Read more" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <img
            src={aboutUsImg}
            alt=""
            style={{
              borderRadius: "24px",
              maxWidth: "100%",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
