import React, { useState, useEffect } from "react";
import { Grid, Container, Box } from "@mui/material";
import { Member } from "../../components/Dashboard/member";
import { Category } from "../../components/Dashboard/category-barChart";
import { PieChart } from "../../components/Dashboard/pieChart";
import ReactECharts from 'echarts-for-react';
import { ActiveProduct } from "../../components/Dashboard/activeProduct";
import DashboardServicse from "../../services/DashboardServicse";
import { InactiveProduct } from "../../components/Dashboard/inactiveProduct";
import { ProductCategory } from "../../components/Dashboard/ProductCategory";
import { ProductList } from "../../components/Dashboard/ProductList";
import UserService from "../../services/UserService";
import CssBaseline from "@mui/material/CssBaseline";

var userID = localStorage.getItem("LoginUserID")


export default function Dashboard() {

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [memberCount, setMemberCount] = useState(0);
  const [inactiveProduct, setInactiveProduct] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [customerBygender, setCustomerBygender] = useState([]);
  const [productCategory, setCategory] = useState(0);
  const [productList, setProductList] = useState([]);
  const [bookClassification, setBookClassification] = useState([]);
  const [userType, setUserType] = useState(3);

  useEffect(() => {
    console.log("user", userID)
    let response;
    response = UserService.get(Number(userID))
    response.then((res) => {
        console.log('resdata',res.data)   
        setUserType(res.data.userType);
      })
  }, [])

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
    getInactiveProductCount();
    getAllProductCount();
    getCountByStatusComboModel();
    getAllCategoryCount();
    getProductList();
  //  getCountByProductComboModel();
  }, [openCreateDialog]);

  const getMemberCount = () => {
    DashboardServicse.getMemberCount(setMemberCount)
  };

  const getInactiveProductCount = () => {
    DashboardServicse.getInactiveProductCount(setInactiveProduct);
  };

  const getAllCategoryCount = () => {
    DashboardServicse.getAllCategoryCount(setCategory);
  };

  const getAllProductCount = () => {
    DashboardServicse.getAllProductCount(setActiveProduct);
  };

  const getCountByStatusComboModel = () => {
    DashboardServicse.getCountByStatusComboModel(setCustomerBygender)
  };


  const getProductList = () => {
    DashboardServicse.getProductList(setProductList);
  };


  return (
    <>
    {userType !== 3 ?
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
              <ActiveProduct activeProduct={activeProduct} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}civeCount
              sm={6}
              xs={12}
            >
              <InactiveProduct inactiveProduct={inactiveProduct} />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              sm={6}
              xs={12}
            >
              <ProductCategory productCategory={productCategory} />
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
              <Category />
            </Grid>
            
            
            <Grid
              item
              xl={6}
              lg={6}
              sm={9}
              xs={12}
              sx={{ marginTop: 3 }}
            >
              <PieChart customerBygender={customerBygender} />

            </Grid>
            <Grid
              item
              xl={12}
              lg={6}
              sm={9}
              xs={12}
              sx={{ marginTop: 3 }}
            >
              <ProductList productList={productList} />
            </Grid>
            
          </Grid>
        </Container>
      </Box>
      :
      <Box>
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={8}
              md={12}
              sx={{
                backgroundImage: `url(${
                  process.env.PUBLIC_URL + "/img/Best-Apps-like-Klarna-1.webp"
                })`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "100%",
                backgroundPosition: "center",
              }}
            />
            </Grid>
      </Box>
}

    </>
  );
}
