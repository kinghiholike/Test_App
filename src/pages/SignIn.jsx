import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Paper from "@mui/material/Paper";



const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  // const { signin } = useUser();
  // Add state for form data and validation errors
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form
  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email Address is required";
    }

    if (formData.password.length < 8) {
      errors.password = "Password too short";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
  
    if (validateForm()) {
      axios
        .post('http://ec2-3-236-249-44.compute-1.amazonaws.com:4000/signin ', formData)
        .then((res) => {
          if (res.data.token) {
            // Store the token in localStorage or cookies
            const token = res.data.token;
            localStorage.setItem('token', res.data.token);
            
            console.log("this is the token stored in the local host", token)
  
          } else {
            alert('No Record');
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('Form is invalid. Please correct the errors.');
    }
  };
  
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Paper        elevation={4}
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
        }}>
        <Container component="main" maxWidth="xs" sx={{backgroundColor:"whitesmoke", borderRadius: '15px', padding:"10px"}}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {/* Email input with error message */}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p className="error">{formErrors.email}</p>
              )}
              {/* Password input with error message */}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
              />
              {formErrors.password && (
                <p className="error">{formErrors.password}</p>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                <Link to="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <div>
                    <Link to="/signup" variant="body2">
                      Don't have an account? Sign Up
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
