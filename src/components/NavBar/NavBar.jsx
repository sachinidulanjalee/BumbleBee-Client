import { useState } from "react";

import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Box, Drawer, ListItem, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/main/logo.png";
import userAvatar from "../../assets/main/user-avatar.svg";
import { navItems } from "../../data.js";
import { Login } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const navigate = useNavigate();

  const navigateToComponent = (path) => {
    // Use the history.push method to navigate to the desired route
    navigate(path);
  };

  //Submenu
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);
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
              Holla,
            </Typography>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#fff",
              }}
            >
              Ales Nesetril
            </Typography>
          </Box>
          <img src={userAvatar} alt="avatar" style={{ cursor: "pointer" }} />
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
              {/* <img
                src={userAvatar}
                alt="avatar"
                style={{ cursor: "pointer" }}
              /> */}
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
