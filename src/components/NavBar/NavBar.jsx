import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Box, Drawer, IconButton, ListItem, Typography, Modal, TextField, Button } from "@mui/material";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/main/logo.png";
import userAvatar from "../../assets/main/user-avatar.svg";
import { navItems } from "../../data.js";
import { Login, LoginOutlined, LoginSharp } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormNew } from "../../hooks/useFormNew";
import LoginService from "../../services/LoginService";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip from '@mui/material/Tooltip';


const theme = createTheme();
const initialRecordState = {
  username: "",
  password: "",
};

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const navigateToComponent = (path) => {
    // Use the history.push method to navigate to the desired route
    navigate(path);
  };
  const handleLoginModalOpen = () => {
    setOpenLoginModal(true);
  };


  const handleLoginModalClose = () => {
    setOpenLoginModal(false);
  };
  //Submenu
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [LoginSessionChange, setLoginSessionChange] = React.useState("false");

  function LogOut() {
    localStorage.setItem("LoginState", "false");
    setLoginSessionChange(!LoginSessionChange);
    sessionStorage.clear();
    window.location.href='/';
  }

  const handleOpenUserMenu = (event) => {

    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {

    setAnchorElUser(null);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event, id) => {
    if (navItems[id - 1].submenu) {
      if (anchorEl == null) {
        setAnchorEl(event.currentTarget);
      }
      setSubmenuItems(navItems[id - 1].submenu);
    } else {
      navigateToComponent(navItems[id - 1].path);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigateSubmenu = (path) => {
    setAnchorEl(null);
    navigateToComponent(path);
  };

  const validate = () => {
    let temp = {};
    temp.username = values.username !== "" ? "" : "This field is required";
    temp.password = values.password !== "" ? "" : "This field is required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useFormNew(initialRecordState, true, validate);

  const [IsOpenPasswordChangeDialog, setIsOpenPasswordChangeDialog] =
    useState(false);

    const [result, setResult] = useState("");
  const LoginClick = async (e) => {
    e.preventDefault();
    if (validate()) {

      try {
        const response = await LoginService.Login(values);
        if (response.data.message === 'Login successful') {
          setLoginSuccess(response.data.message);
          setValues(initialRecordState);
          alert("Login Sucessfull");
          setResult(response.data.username)
          sessionStorage.setItem('logedInUsername', response.data.username);
          window.location.href='/';

        } else {
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("There was a problem with the login operation:", error);
      }
    }
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: "#66b5d7" }}>
      <Container
        maxWidth="xl"
        sx={{
          px: 10,
          pt: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
        disableGutters
      >
        <img
          src={logo}
          alt="logo"
          style={{ cursor: "pointer", width: "100px", height: "auto" }}
        />
        <Box
          sx={{
            display: { xs: "none", lg: "flex" },
            alignItems: "center",
            gap: "54px",
          }}
        >
          Beeze: Psyche Eval
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "54px",
          }}
        >
          {navItems.map((navItem) => (
            <div key={navItem.id}>
              <div>
                <ListItem
                  disablePadding
                  id="basic-button"
                  button
                  onClick={(e) => handleClick(e, navItem.id)}
                  components={Link}
                  to={navItem.path}
                  key={navItem.id}
                  underline="none"
                  color="#fff"
                  sx={{
                    fontWeight: "300",
                    fontSize: "14px",
                    opacity: 0.7,
                    "&:hover": {
                      opacity: 1,
                    },
                    "&:first-of-type": {
                      opacity: 1,
                    },
                  }}
                >
                  {navItem.name}
                </ListItem>
                {navItem.submenu && (
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {submenuItems.map((submenuItem) => (
                      <MenuItem
                        onClick={() => navigateSubmenu(submenuItem.path)}
                      >
                        {submenuItem.name}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </div>
            </div>
          ))}
        </Box>
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            alignItems: "center",
            gap: "8px",
          }}
        >

          {sessionStorage.getItem('logedInUsername') == null ? (
            <Box>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#fff",
                  opacity: "0.5",
                }}
              >
                Hello,
                <IconButton onClick={handleLoginModalOpen}>
                  <Login />
                </IconButton>
                Login
              </Typography>
            </Box>
          ) : (
            <Box>
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
                  mr: "40px",
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
              Hello, {sessionStorage !== "0" && ( <h4>{sessionStorage.getItem('logedInUsername')}</h4> )}
            </Box>
          )}
          <Modal
            open={openLoginModal}
            onClose={handleLoginModalClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                width: 500,
                height: 'auto',
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <form noValidate onSubmit={LoginClick} action="">
                <Typography component="h2" variant="h5">
                  Sign in
                </Typography>
                <Box noValidate autoComplete="on" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="User Name"
                    name="username"
                    autoComplete="email"
                    onChange={handleInputChange}
                    {...(errors.username && {
                      error: true,
                      helperText: errors.username,
                    })}
                    autoFocus
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleInputChange}
                    {...(errors.password && {
                      error: true,
                      helperText: errors.password,
                    })}
                    autoComplete="current-password"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/SignUp" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Modal>
        </Box>
        <MenuIcon
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
            cursor: "pointer",
            color: "#fff",
          }}
          onClick={() => setOpenMobileMenu(true)}
        />
        <Drawer
          anchor="left"
          open={openMobileMenu}
          onClose={() => setOpenMobileMenu(false)}
        >
          <Box
            sx={{
              position: "relative",
              width: 250,
              backgroundColor: "#5243C2",
              height: "100%",
              py: 3,
              px: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
            role="presentation"
            onClick={() => setOpenMobileMenu(false)}
            onKeyDown={() => setOpenMobileMenu(false)}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#fff",
                    opacity: "0.5",
                  }}
                >
                  Hello,
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#fff",
                  }}
                >
                  Login
                </Typography>
              </Box>

              <MenuItem onClick={() => Login()} key={"Login"}>
                {<Login />} &nbsp; Login
              </MenuItem>

            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              {navItems.map((navItem) => (
                <ListItem
                  button
                  onClick={() => navigateToComponent(navItem.path)}
                  components={Link}
                  to={navItem.path}
                  key={navItem.id}
                  underline="none"
                  color="#fff"
                  sx={{
                    fontWeight: "300",
                    fontSize: "14px",
                    opacity: 0.7,
                    "&:hover": {
                      opacity: 1,
                    },
                    "&:first-of-type": {
                      opacity: 1,
                    },
                  }}
                >
                  {navItem.name}
                </ListItem>
              ))}
            </Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: "500",
                cursor: "pointer",
                position: "absolute",
                bottom: "14px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              &#169; Beeze
            </Typography>
          </Box>
        </Drawer>
      </Container>
    </AppBar>
  );
};
export default Navbar;