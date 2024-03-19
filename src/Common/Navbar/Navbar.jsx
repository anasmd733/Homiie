import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavHeadings } from "./NavHeadings.jsx";
import { ExpandLess, ExpandMore, FiberManualRecord, Logout, Star } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { AppBar, Drawer, DrawerHeader } from "./styles.jsx";
import { Colors } from "../../Colors/Colors.js";
import Router from "../../Routes/Router.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { EndPoint } from "../../EndPoints/EndPoint.js";

export default function Navbar() {
  const location = useLocation() 
  const Navigate = useNavigate()
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [headings, setHeadings] = React.useState(NavHeadings);

  // React.useEffect(()=>{
  //   Navigate(`dashboard`)
  // },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isHeadingActive = (path) => {
    // console.log(path.toLowerCase());
    return location.pathname.toLowerCase().includes(path.toLowerCase());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>  
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon/>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}> */}
        <List sx={{ overflowX: open ? "auto" : "hidden",paddingX: open ?'4px':'0px' }}>
          {headings && headings.length > 0 && headings.map((head, index) => (
            <ListItem
            key={index}
            disablePadding
            sx={{
              display: "block",
              backgroundColor: isHeadingActive(head.pathName) && theme.colors.secondary,
              borderRadius: '5px'
            }}
              onClick={() => {
                // setSelectedIndex(index)
                !head.isNested &&
                Navigate(head.path);
              }
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  let temp = headings;
                  head.isNested
                    ? (temp = temp.map((val, i) =>
                        i == index ? { ...val, open: !val.open } : val
                      ))
                    : null;
                  temp = temp.map((val, i) =>
                    i != index ? { ...val, open: false } : val
                  );
                  setHeadings(temp);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <head.icon
                    style={{
                      color: (!head.isNested && isHeadingActive(head.path)) ? Colors.white : Colors.darkblue,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={head.heading}
                  sx={{
                    opacity: open ? 1 : 0,
                    fontSize: "16px",
                    color: !head.isNested && isHeadingActive(head.path) ? Colors.white : Colors.darkblue,
                    fontWeight:'bold'
                  }}
                />
                {head.isNested &&
                  (head.open ? (
                    <ExpandLess
                      // sx={{ color: isHeadingActive(head.path) ? Colors.white : Colors.black }}
                    />
                  ) : (
                    <ExpandMore
                      // sx={{ color: isHeadingActive(head.path) ? Colors.white : Colors.black }}
                    />
                  ))}
              </ListItemButton>
              <Collapse in={head.open} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  sx={{ overflowX: open ? "auto" : "hidden" }}
                >
                  {
                    // head.isNested &&
                    // head.open &&
                    head.nestedHeads.map((val, i) => (
                      <ListItemButton key={i} sx={{ pl: 4,backgroundColor:isHeadingActive(val.path) && theme.colors.secondary,"&:hover":{backgroundColor:theme.colors.secondary} }} onClick={()=>Navigate(val.path)}>
                        <ListItemIcon>
                          <FiberManualRecord />
                        </ListItemIcon>
                        {open ? (
                          <ListItemText
                            sx={{ color: isHeadingActive(val.path) ? Colors.white : Colors.darkblue }}
                            primary={val.heading}
                          />
                        ) : null}
                      </ListItemButton>
                    ))
                  }
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
        <List>
          <ListItemButton>
          <ListItemIcon><Logout/></ListItemIcon>
            <ListItemText>LogOut</ListItemText>
          </ListItemButton>
        </List>
        {/* </Box> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, padding:'10px',backgroundColor:Colors.lightWhite,minHeight:'100vh' }}>
        <DrawerHeader />
        <Router/>
      </Box>
    </Box>
  );
}