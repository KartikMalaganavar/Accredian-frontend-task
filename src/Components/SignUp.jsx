import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Navbar";

import axios from "axios";

const defaultTheme = createTheme();

export default function SignUp() {
  useEffect(() => {
    const handleResize = () => {
      const imageUrl = window.innerWidth <= 600 ? "mobile.jpeg" : "desktop.jpg";
      document.getElementById(
        "backgroundBox"
      ).style.backgroundImage = `url('${imageUrl}')`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [warnings, setWarnings] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const updatedWarnings = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };


    // -------------------------------------------------------------
    // Example for sign-up data 
    // name - Kartik M
    // email = kartikmalaganavar19@gmail.com
    // password = Accredian@12345
    // -------------------------------------------------------------    


    if (!values.name.trim()) {
      updatedWarnings.name = "Name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim() || !emailRegex.test(values.email)) {
      updatedWarnings.email = "Valid email is required";
      isValid = false;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!values.password || !passwordRegex.test(values.password)) {
      updatedWarnings.password = "Password must meet the requirements";
      isValid = false;
    }

    if (values.password !== values.confirmPassword) {
      updatedWarnings.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setWarnings(updatedWarnings);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(values);
      axios
        .post("http://localhost:5000/register", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            alert("Registered Successfully");
            navigate("/");
          } else {
            alert("Failed to register");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />

      <CssBaseline />
      <Box
        id="backgroundBox"
        sx={{
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "25px",
            padding: "20px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={"#1976d2"}>
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  error={Boolean(warnings.name)}
                  helperText={warnings.name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  error={Boolean(warnings.email)}
                  helperText={warnings.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  error={Boolean(warnings.password)}
                  helperText={warnings.password}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  onChange={(e) =>
                    setValues({ ...values, confirmPassword: e.target.value })
                  }
                  error={Boolean(warnings.confirmPassword)}
                  helperText={warnings.confirmPassword}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree terms and conditions."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
