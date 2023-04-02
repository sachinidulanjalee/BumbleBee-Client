import React, { useState, useEffect } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import DashboardServicse from '../../services/DashboardServicse';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import { alpha, styled } from '@mui/material/styles';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';


export const LendedBook =({lendedbook})=> (


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
            Books
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            paddingLeft={1}
          >
            {lendedbook}
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
            <SettingsEthernetIcon />
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
        <FiberManualRecordIcon sx={{ fontSize: 15 , color:'#F6BE00'}} />
        <Typography
          color="warning"
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
          Lended
        </Typography>
      </Box>
    </CardContent>
  </Card>);
