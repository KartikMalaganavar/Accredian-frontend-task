import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ userID: "", userEmail: "" });

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    const storedUserEmail = localStorage.getItem("userEmail");

    setUserData({
      userID: storedUserID,
      userEmail: storedUserEmail,
    });
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleLogout = () => {
    axios.get("http://localhost:5000/logout").then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        localStorage.removeItem("userID");
        localStorage.removeItem("userEmail");
        navigate("/");
      }
    });
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "16px", padding: "8px" }}
          >
            Accredian
          </Typography>
          <Button color="inherit" sx={{ marginX: 1 }}>
            Home
          </Button>
          <Button color="inherit" sx={{ marginX: 1 }}>
            About
          </Button>
          <Button color="inherit" sx={{ marginX: 1 }}>
            Contact Us
          </Button>
          <Avatar sx={{ marginX: 1 }}>{userData.name?.charAt(0)}</Avatar>
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ marginRight: 1 }}
          >
            {userData.name}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          marginTop: "64px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h4" color="text.primary" gutterBottom>
              Welcome to the Dashboard, {userData.userID}!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              You can customize this dashboard with more content.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              User Email: {userData.userEmail}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
