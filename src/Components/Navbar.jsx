import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";


const Navbar = () => {
    const [showIcons, setShowIcons] = useState(window.innerWidth <= 600);
  
    useEffect(() => {
      const handleResize = () => {
        setShowIcons(window.innerWidth <= 600);
      };
  
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  
  return (
     <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: "16px", padding: "8px" }}
        >
          Accredian
        </Typography>
        {showIcons ? (
          <>
            <Button color="inherit" sx={{ marginX: 1 }}>
              <HomeIcon />
            </Button>
            <Button color="inherit" sx={{ marginX: 1 }}>
              <InfoIcon />
            </Button>
            <Button color="inherit" sx={{ marginX: 1 }}>
              <MailIcon />
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" sx={{ marginX: 1 }}>
              Home
            </Button>
            <Button color="inherit" sx={{ marginX: 1 }}>
              About
            </Button>
            <Button color="inherit" sx={{ marginX: 1 }}>
              Contact Us
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;