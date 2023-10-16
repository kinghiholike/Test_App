import React, { useState } from "react"; // Import React and useState
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const defaultTheme = createTheme();

export default function ResetPassword() { 
  const navigate = useNavigate();
  const [PassReset, setPassReset] = useState({ 
    email: "",
    temporary_password:"",
    new_password: "",
    confirm_password: "",
  });

  const [PassResetErrors, setPassResetErrors] = useState({ 
    email: "",
    temporary_password:"",
    new_password: "",
    confirm_password: "",
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPassReset({
      ...PassReset, 
      [name]: value,
    });
  };

  // Validate the form
  const validateForm = () => {
    const errors = {};
    if (!PassReset.email.trim()) {
      errors.email = "Email Address is required";
    }
    if (PassReset.temporary_password.length < 1) {
      errors.new_password = "Please input Temporary password";
    }
    if (PassReset.confirm_password.length < 8) {
      errors.confirm_password = "Password too short";
    }
    if (PassReset.confirm_password.length < 8) {
      errors.confirm_password = "Password too short";
    }

    if (PassReset.new_password !== PassReset.confirm_password) {
      errors.confirm_password = "Passwords don't match";
    }

    if (Object.keys(errors).length > 0) {
      console.log(errors);
      setPassResetErrors(errors);
      return false;
    } else {
      return true; 
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      axios
        .post("http://localhost:4000/signup", PassReset)
        .then((res) => {
          console.log("Server response:", res);
        })
        .catch((err) => {
          console.error("Error sending request:", err);
        });
    } else {
      console.log("Form is invalid. Please correct the errors.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              value={PassReset.email}
              onChange={handleInputChange}
            />
            {PassResetErrors.email && (
              <p className="error">{PassResetErrors.email}</p>
            )}
            <TextField
            margin="normal"
              required
              fullWidth
              id="temporary_password"
              label="Temporary password"
              name="temporary_password"
              type="password"
              value={PassReset.temporary_password}
              onChange={handleInputChange}
            />
            {PassResetErrors.email && (
              <p className="error">{PassResetErrors.temporary_password}</p>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="new_password"
              label="New Password"
              type="password"
              id="new_password"
              value={PassReset.new_password}
              onChange={handleInputChange}
            />
            {PassResetErrors.new_password && (
              <p className="error">{PassResetErrors.new_password}</p>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm_password" 
              label="Confirm Password"
              name="confirm_password"
              type="password"
              autoFocus
              value={PassReset.confirm_password}
              onChange={handleInputChange}
            />
            {PassResetErrors.confirm_password && (
              <p className="error">{PassResetErrors.confirm_password}</p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
