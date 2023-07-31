import { Card,Box,Drawer ,Button ,List ,Divider ,ListItem ,ListItemButton ,ListItemIcon ,ListItemText ,Collapse} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import FactoryIcon from '@mui/icons-material/Factory';
import ArticleIcon from '@mui/icons-material/Article';
import WorkIcon from '@mui/icons-material/Work';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { useMediaQuery } from 'react-responsive';
import { useState } from "react";
import * as React from 'react';
import { useNavigate } from "react-router-dom"; 
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import './sidebar.css';
import Products from "./products";
const Sidebar=()=>{

  // navigate to other page
  const navigate= useNavigate();

  // using media query to mobile view conditional rendering
  const isMobile = useMediaQuery({ maxWidth: 950 });

  // in mobile view click the button to view options
  const [state,setState] = useState({
    left: false
   });

  //  using submenu's in menu option
   const [open,setOpen] = useState(false),
         [profile,setProfile] =useState(false);

  // declare the open direction in mobile view
  const anchor = 'left';


  // submenu open & close  
  const handleClick = () =>{
    setOpen(!open);
   
  }

  const handleProfile =() =>{
    setProfile(!profile)
 
  }

  const handleLogout=()=>{
        localStorage.removeItem('user');
        navigate('/')

  }

  // mobile view drawer open
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ state, anchor : open });
  };

  // view of the side bar in mobile size
  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "rgb(134,110,199)",
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key={"Home"}>
          <ListItemButton onClick={() => navigate("/dashboard")}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Products"}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FactoryIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={"Products"} />
            {open ? (
              <ExpandLessIcon sx={{ color: "white" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "white" }} />
            )}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton onClick={() => navigate("/accessories")}>
              <ListItemIcon>
                <ShoppingBagIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }} primary="Accessories" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText sx={{ color: "white" }} primary="FootWears" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText sx={{ color: "white" }} primary="HomeAppliance" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider sx={{ backgroundColor: "white" }} />
        <ListItem key={"About"}>
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={"About"} />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ backgroundColor: "white" }} />
        <ListItem key={"Profile"} sx={{ textDecoration: "none" }}>
          <ListItemButton onClick={handleProfile}>
            <ListItemIcon>
              <PersonIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={"Profile"} />
            {profile ? (
              <ExpandLessIcon sx={{ color: "white" }} />
            ) : (
              <ExpandMoreIcon sx={{ color: "white" }} />
            )}
          </ListItemButton>
        </ListItem>
        <Collapse in={profile} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              className={"active"}
              onClick={() => navigate("/profile")}
            >
              <ListItemIcon>
                <LibraryAddIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }} primary="AddDetails" />
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "white" }} primary="Logout" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider sx={{ backgroundColor: "white" }} />
        <ListItem key={"Careers"}>
          <ListItemButton>
            <ListItemIcon>
              <WorkIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "white" }} primary={"Careers"} />
          </ListItemButton>
        </ListItem>
       
      </List>
    </Box>
  );
    return (
      <>
        {isMobile ? (
          <>
            <React.Fragment key={anchor}>
              <Button
                onClick={toggleDrawer(anchor, true)}
                sx={{ position: "fixed",left: 0,top:5,color:'white' ,zIndex: 1 }}
              >
                <MenuIcon />
              </Button>
              <Drawer
                anchor={anchor}
                open={state.anchor}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          </>
        ) 
        
        
        :
        
        
        (
          <Card
            sx={{
              height: "92vh",
              backgroundColor: "rgb(134,110,199)",
              position: 'fixed',
              top: 54,
            }}
          >
            <List className='side_navbar'>
              <ListItem key={"Home"}>
                <ListItemButton onClick={() => navigate("/dashboard")}>
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white" }} primary={"Home"} />
                </ListItemButton>
              </ListItem>
              <ListItem key={"Products"}>
                <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <FactoryIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white" }} primary={"Products"} />
                  {open ? (
                    <ExpandLessIcon sx={{ color: "white" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
               
                    <ListItemButton onClick={()=>navigate('/accessories')}>
                      <ShoppingBagIcon sx={{ color: "white" }} />
                
                    <ListItemText
                      sx={{ color: "white" }}
                      primary="Accessories"
                    />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText sx={{ color: "white" }} primary="FootWears" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemText
                      sx={{ color: "white" }}
                      primary="HomeAppliances"
                    />
                  </ListItemButton>
                </List>
              </Collapse>
              <Divider sx={{ backgroundColor: "white" }} />
              <ListItem key={"About"}>
                <ListItemButton>
                  <ListItemIcon>
                    <ArticleIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white" }} primary={"About"} />
                </ListItemButton>
              </ListItem>
              <Divider sx={{ backgroundColor: "white" }} />
              <ListItem key={"Profile"} sx={{ textDecoration: "none" }}>
                <ListItemButton onClick={handleProfile}>
                  <ListItemIcon>
                    <PersonIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white" }} primary={"Profile"} />
                  {profile ? (
                    <ExpandLessIcon sx={{ color: "white" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={profile} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    className={"active"}
                    onClick={() => navigate("/profile")}
                  >
                    <ListItemIcon>
                      <LibraryAddIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: "white" }}
                      primary="AddDetails"
                    />
                  </ListItemButton>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "white" }} primary="Logout" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Divider sx={{ backgroundColor: "white" }} />
              <ListItem key={"Careers"}>
                <ListItemButton>
                  <ListItemIcon>
                    <WorkIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "white" }} primary={"Careers"} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider sx={{ backgroundColor: "white" }} />
            <ListItem key={"Careers"}>
            <Products/>
        </ListItem>
          </Card>
        )}
      </>
    );
}
export default Sidebar;