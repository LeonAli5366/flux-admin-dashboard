import { useContext, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import UnarchiveOutlinedIcon from "@mui/icons-material/UnarchiveOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { AuthContext } from "../../page/ContextApi/UserContex";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}>
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [width, setWidth] = useState(0);
  const { user } = useContext(AuthContext);
  
console.log(window.innerWidth);
  const innerWidth = () => {
    if (window.innerWidth < 700) {
      setIsCollapsed(true);
      console.log(window.innerWidth);
    }

    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("load", innerWidth);
    return () => {
      window.removeEventListener("load", innerWidth);
    };
  }, [width]);

  return (
    <Box
    height="100vh"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}>
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <div>
              <div className="rounded-full flex justify-center">
                <img
                  className="w-20 rounded-full"
                  src={`https://hips.hearstapps.com/hmg-prod/images/keanu-reeves-john-wick-4-1668099111.jpg?crop=0.406xw:1.00xh;0.376xw,0&resize=1200:*`}
                  alt=""
                />
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-sky-600">
                  {user?.displayName}
                </h1>
                <h1 className="text-xl mt-2 mb-7 text-white">Flux Admin</h1>
              </div>
            </div>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
            
              title="Home"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Product */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Products
            </Typography>

            <Item
              title="All Product"
              to="/"
              icon={<Inventory2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Create Product"
              to="/createproduct"
              icon={<UnarchiveOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Our Story */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Our Story
            </Typography>
            <Item
              title="All Story"
              to="/allstory"
              icon={<NewspaperOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create Story"
              to="/createstory"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Admin Profile */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}>
              Admin Profile
            </Typography>
            <Item
              title="Profile Page"
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update Name"
              to="/userName"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Update Email"
              to="/changeemail"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Change Password"
              to="/changepass"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
