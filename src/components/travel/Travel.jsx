import React from "react";

import { Box, Container, Typography } from "@mui/material";

import { travelItems } from "../../data";
import TravelItem from "../travel-item";

const Travel = () => {
  return (
    <Container
      disableGutters
      maxWidth="xl"
      sx={{
        px: {
          xs: 2,
          sm: 5,
          md: 10,
        },
        my: 15,
      }}
    >

      <Box
        sx={{
          display: "flex",
          gap: {
            xs: 4,
            lg: 2,
          },
          justifyContent: {
            xs: "flex-start",
            lg: "space-between",
          },
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          alignItems: {
            xs: "center",
            lg: "flex-start",
          },
        }}
      >
        {travelItems.map((travelItem) => (
          <TravelItem
            key={travelItem.id}
            text={travelItem.text}
            location={travelItem.location}
            image={travelItem.image}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Travel;
