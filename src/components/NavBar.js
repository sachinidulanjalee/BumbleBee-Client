import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FunctionService from "../services/FunctionService";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from "moment";
import { alpha } from '@mui/material/styles';

import {
  MenuBook,
  PersonOutline,
  Domain,
  Category,
  Extension,
  DynamicFeed,
  VerifiedUser,
  Logout,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { Route, Routes, Link } from "react-router-dom";
import MainClassification from "../views/MainClassification/MainClassification";
import Locations from "../views/Locations/Location";
import LendingDetails from "../views/LendingDetails/LendingDetails";
import SubClassification from "../views/SubClassification/SubClassification";
import Book from "../views/Book/Book";
import Member from "../views/Member/Member";
import UserManagement from "../views/UserManagement/UserManagement";
import Dashboard from "../views/Dashboard/Dashboard";
import Footer from "./Footer";
import Product from"../views/Product/Product";
import ProductCategory from"../views/ProductCategory/ProductCategory";
import Customer from "../views/CustomerRegistration/Customer"
import RegisterForm from "../views/CustomerRegistration/RegisterForm"
import Transaction from "../views/Transaction/Transaction"


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const initialRecordState = {
  FunctionID: "",
  SystemType: "",
  SortOrder: "",
  FunctionName: "",
  FunctionURL: "",
  Icon: "",
  Status: "",
  CreatedDateTime: "",
  CreatedBy: "",
  CreatedMachine: "",
  ModifiedDateTime: "",
  ModifiedBy: "",
  ModifiedMachine: "",
};



export default function MiniDrawer() {
  //setInterval(getTime,1000)

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [LoginSessionChange, setLoginSessionChange] = React.useState("false");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [funcnList, setfuncnList] = useState([]);

  const [time,setTime] = useState(new Date().toLocaleTimeString());

  function getTime(){
      setTime(new Date().toLocaleTimeString());
   }

  useEffect(() => {
    if (localStorage.getItem("LoginState") !== "true") {
      window.location.replace("/Login");
    } else {
      getUserFunctions();
    }
  }, [LoginSessionChange]);

  const getUserFunctions = () => {
    var aa = localStorage.getItem("LoginUserID");
    console.log(aa);
    FunctionService.GetByUserID(Number(aa))
      .then((response) => {
        const newArray = [];
        response.data.forEach((x) => {
          const _object = {
            FunctionName: x.functionName,
            FunctionURL: x.functionURL,
            icon: x.icon,
          };
          newArray.push(_object);
        });

        localStorage.setItem("LoginAccessFunctions", JSON.stringify(newArray));

        setfuncnList(newArray);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function LogOut() {
    localStorage.setItem("LoginState", "false");
    setLoginSessionChange(!LoginSessionChange);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {

    setAnchorElUser(null);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}
      sx={{backgroundColor:alpha('#0B0B61', 0.8)}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 11 }}>
          Bumble bee: Buy first and pay later
          </Typography >
          <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
          <h5 sx={{ display: "flex", alignItems: "center" }}>{moment(new Date()).format("yyyy-MM-DD")}&nbsp;&nbsp; {time}&nbsp;&nbsp;</h5> 
            <Tooltip title="Log Out">

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleOpenUserMenu}
              >
                <AccountCircle />
              </IconButton>

            </Tooltip>
            <Menu
              sx={{
                mt: "40px",
                mr: "100px",
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            
              <MenuItem
                onClick={() => LogOut()}
                key={"Logout"}
              >
              
                {<LogoutIcon />} &nbsp; LogOut
              </MenuItem>
            </Menu>
           
            <h3>{localStorage.getItem("LoginUserName").charAt(0).toUpperCase() + localStorage.getItem("LoginUserName").slice(1)}</h3>
          </Box>

        </Toolbar>
        <Footer></Footer>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div sx={{ display: "flex", alignItems: "center" }}>
            <img width="100" src={process.env.PUBLIC_URL + "img/BumbleBee_Logo.png"} style={{ marginRight: 30 }} />
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>

        </DrawerHeader>
        <Divider />
        <List>
          {funcnList.map((row, index) => (
            <ListItemButton
              component={Link}
              to={row.FunctionURL}
              key={row.FunctionName}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {
                  (row.icon == "MenuBook") ? <MenuBook /> :
                    (row.icon == "Category") ? <Category /> :
                      (row.icon == "Extension") ? <Extension /> :
                        (row.icon == "DynamicFeed") ? <DynamicFeed /> :
                          (row.icon == "Domain") ? <Domain /> :
                            (row.icon == "PersonOutline") ? <PersonOutline /> :
                              (row.icon == "DynamicFeed") ? <DynamicFeed /> :
                                (row.icon == "VerifiedUser") ? <VerifiedUser /> :
                                (row.icon == "Dashboard") ? <DashboardIcon /> :
                                <Extension />
                }
              </ListItemIcon>
              <ListItemText
                primary={row.FunctionName}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          <Route path="/MainClassification" element={<MainClassification />} />
          <Route path="/LendingDetails" element={<LendingDetails />} />
          <Route path="/Locations" element={<Locations />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/SubClassification" element={<SubClassification />} />
          <Route path="/Member" element={<Member />} />
          <Route path="/UserManagement" element={<UserManagement />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/ProductCategory" element={<ProductCategory />} />
          <Route path="/Customer" element={<Customer />} />
          <Route path="/RegisterForm" element={<RegisterForm />} />
          <Route path="/Transaction" element={<Transaction />} />
        </Routes>
      </Box>
    </Box>
  );
}
