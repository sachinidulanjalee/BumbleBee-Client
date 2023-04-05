import React, { useState, useEffect } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { alpha, styled } from '@mui/material/styles';

export const InactiveProduct = ({inactiveProduct}) => (
  
  <Card
  sx={{ height: '100%',borderRadius:5, backgroundColor: alpha('#F7D358', 0.30)}}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
            fontWeight={900}
          >
            Products
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            paddingLeft={1}
          >
            {inactiveProduct}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: '#F7D358',
              height: 56,
              width: 56
            }}
          >
            <ProductionQuantityLimitsIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <FiberManualRecordIcon sx={{ fontSize: 15 }} color="error" />
        <Typography
           color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
          fontSize={14}
          //fontWeight={700}
        >
          Inactive
        </Typography>
      </Box>
    </CardContent>
  </Card>);

