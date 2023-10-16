import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "user",
    status: "Active",
  });

  const [formErrors, setFormErrors] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.full_name.trim()) {
      errors.full_name = "First Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email Address is required";
    }

    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form data being sent:", formData);

      axios
        .post(
          "http://localhost:4000/signup",

          formData
        )
        .then((res) => {
          console.log("Server response:", res);
          // Handle the response here
          navigate("/signin");
        })
        .catch((err) => {
          console.error("Error sending request:", err);
          // Handle the error here
        });
    } else {
      console.log("Form is invalid. Please correct the errors.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          height: '100vh',
          margin: 0,      
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundRepeat:"no-repeat",
          backgroundSize:"cover",
          backgroundImage:
            'url("https://static.wixstatic.com/media/9c7957_fe36476a7254414199bc39e191905939~mv2.png/v1/crop/x_470,y_211,w_980,h_658,q_90,enc_auto/9c7957_fe36476a7254414199bc39e191905939~mv2.png")',
        }}
      >
        <Container component="main" maxWidth="xs" sx={{backgroundColor:"whitesmoke", borderRadius: '15px', padding:"10px"}}>

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
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
                    name="full_name"
                    required
                    fullWidth
                    id="full_name"
                    label="Full Name"
                    autoFocus
                    type="text"
                    value={formData.full_name}
                    onChange={handleInputChange}
                  />
                  {formErrors.full_name && (
                    <p className="error">{formErrors.full_name}</p>
                  )}
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
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && (
                    <p className="error">{formErrors.email}</p>
                  )}
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
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {formErrors.password && (
                    <p className="error">{formErrors.password}</p>
                  )}
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
                  <div>
                    <Link to="/signin" varient="body2">
                      Already have an account? Sign In
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </ThemeProvider>
  );
}
