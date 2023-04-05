import React, { useState, useEffect } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import DashboardServicse from '../../services/DashboardServicse';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import { alpha, styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const ActiveProduct =({activeProduct})=> (


  <Card
    sx={{ height: '100%',borderRadius:5, backgroundColor: alpha('#BE81F7', 0.30)}}
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
            {activeProduct}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: '#BE81F7',
              height: 56,
              width: 56
            }}
          >
            <AddShoppingCartIcon />
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
        <FiberManualRecordIcon sx={{ fontSize: 15 , color:'#86c56a'}} />
        <Typography
           color="success"
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
        >
          Active
        </Typography>
      </Box>
    </CardContent>
  </Card>);
