import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, TextField } from "@mui/material";
import axios from 'axios';

const defaultTheme = createTheme();

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState({
    email: "",
  });

  const [error, setError] = useState({
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmail({
      ...email, // Use the correct state variable here
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      email.email.trim().length === 0 ||
      !email.email.trim().match(mailFormat)
    ) {
      console.log("The email must be valid");
    } else {

      axios.post('http://localhost:4000/forgot-password', email)
.then(res => {
  if(res.data.Login){
    navigate('/homepage')
  }
  else{
    alert("No Record")
  }
  console.log(res);
})
.catch(err=> console.log(err));
      axios
        .post("http://localhost:4000/signin", email)
        .then((res) => {
          if (res.data.Login) {
            navigate("/signin");
          } else {
            alert("No Record");
          }
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
    return;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
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
          <Box
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            py={2}
            mb={1}
            textAlign="center"
          >
            <Typography variant="h3" fontWeight="medium" color="grey" mt={1}>
              Reset Password
            </Typography>
            <Typography display="block" variant="button" color="grey" my={1}>
              You will receive an e-mail in maximum 60 seconds
            </Typography>
          </Box>
          <Box pt={4} pb={3} px={3}>
            <Box
              component="form"
              role="form"
              method="POST"
              onSubmit={handleSubmit}
            >
              <Box mb={4}>
                <TextField
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={email.email}
                  name="email"
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  id="email"
                  autoComplete="current-password"
                />
              </Box>
              <Box mt={6} mb={1}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  reset
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;
