import React, { useState, useEffect } from "react";
import { Grid, Container, Box } from "@mui/material";
import { Member } from "../../components/Dashboard/member";
import { MainClassification } from "../../components/Dashboard/mainClassification-barChart";
import { PieChart } from "../../components/Dashboard/pieChart";
import ReactECharts from 'echarts-for-react';
import MemberService from "../../services/MemberService";
import LendingDetailService from "../../services/LendingDetailService";
import { LendedBook } from "../../components/Dashboard/lendedbook";
import DashboardServicse from "../../services/DashboardServicse";
import { Book } from "../../components/Dashboard/book";
import { ReceiveCount } from "../../components/Dashboard/ReceiveCount";
import { ToBeRecievedBooks } from "../../components/Dashboard/ToBeRecievedBooks";

export default function Dashboard() {

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [availabaleBook, setAvailabaleBook] = useState(0);
  const [lendedbook, setLendedbook] = useState(0);
  const [bookCountByStatus, setBookCountByStatus] = useState([]);
  const [toReciveCount, setToRecieveCount] = useState(0);
  const [toBeReceivedList, setToBeReceivedList] = useState([]);
  const [bookClassification, setBookClassification] = useState([]);

  useEffect(() => {

    var AccessFunctions = JSON.parse(
      localStorage.getItem("LoginAccessFunctions")
    );

    if (
      AccessFunctions.filter(
        (item) => item.FunctionURL === "/Dashboard"
      ).length === 0
    ) {
      //window.location.replace("/UnAuthorized");
    }

    getMemberCount();
    getAllBookCount();
    getAllLendedBookCount();
    getCountByStatusComboModel();
    getToRecieveBookCount();
    getToBeReceivedList();
    // getCountByBookComboModel();
  }, [openCreateDialog]);

  const getMemberCount = () => {
    DashboardServicse.getMemberCount(setMemberCount)
  };

  const getAllBookCount = () => {
    DashboardServicse.getAllBookCount(setAvailabaleBook);
  };

  const getToRecieveBookCount = () => {
    DashboardServicse.getToRecieveBookCount(setToRecieveCount);
  };

  const getAllLendedBookCount = () => {
    DashboardServicse.getAllLendedBookCount(setLendedbook);
  };

  const getCountByStatusComboModel = () => {
    DashboardServicse.getCountByStatusComboModel(setBookCountByStatus)
    console.log("DB");
    console.log(+bookCountByStatus);
  };


  const getToBeReceivedList = () => {
    DashboardServicse.getToBeReceivedList(setToBeReceivedList);
    console.log(toBeReceivedList);
  };


  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}

            >
              <LendedBook lendedbook={lendedbook} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <Book availabaleBook={availabaleBook} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <ReceiveCount toReciveCount={toReciveCount} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >

              <Member memberCount={memberCount} />
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              sm={9}
              xs={12}
              sx={{ marginTop: 3}}
            >
              <MainClassification />
            </Grid>
            
            
            <Grid
              item
              xl={6}
              lg={6}
              sm={9}
              xs={12}
              sx={{ marginTop: 3 }}
            >
              <PieChart bookCountByStatus={bookCountByStatus} />

            </Grid>
            <Grid
              item
              xl={12}
              lg={6}
              sm={9}
              xs={12}
              sx={{ marginTop: 3 }}
            >
              <ToBeRecievedBooks toBeReceivedList={toBeReceivedList} />
            </Grid>
            
          </Grid>
        </Container>
      </Box>


    </>
  );
}
