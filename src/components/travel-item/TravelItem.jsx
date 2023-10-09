import React from "react";

import { Box, Typography } from "@mui/material";


const TravelItem = ({
  text,
  image,
  location,
  calendarText,
  userText,
  commentsText,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Box>
        <img
          src={image}
          alt=""
          style={{
            objectFit: "cover",
            height: "100%",
            maxWidth: "100%",
            cursor: "pointer",
          }}
        />
      </Box>
      <Box sx={{ position: "relative", maxWidth: "320px" }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "20px",
            color: "#161414",
            mb: 2,
          }}
        >
          {location}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: "400",
            fontSize: "16px",
            color: "#5B5B5B",
            lineHeight: "32px",
            pb: 7,
          }}
        >
          {text}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            position: "absolute",
            bottom: "0",
            left: "0",
          }}
        >
        </Box>
      </Box>
    </Box>
  );
};

export default TravelItem;
