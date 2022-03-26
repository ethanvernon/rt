import * as React from "react";
import { TextField, Button, Box, Alert, Snackbar } from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BasicFormProps {
  title: string;
}

// React FN component
export const BasicForm = ({ title }: BasicFormProps) => {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authentication = getAuth();
  const navigate = useNavigate();

  const handleAction = () => {
    if (title === "login") {
      signInWithEmailAndPassword(authentication, email, password)
        .then((response) => {
          navigate("/test");
          sessionStorage.setItem("Auth Token", response.user.refreshToken);
        })
        .catch((error) => {
          console.log("sign in error: ", error);
          if (
            error.code === "auth/user-not-found" ||
            error.code === "auth/wrong-password"
          ) {
            setErrorMessage("wrong email and/or password.");
            setOpen(true);
          }
        });
    } else if (title === "register") {
      if (email.length > 0 && password.length > 0)
        createUserWithEmailAndPassword(authentication, email, password)
          .then((response) => {
            console.log("response: ", response);
            sessionStorage.setItem("Auth Token", response.user.refreshToken);
            navigate("/test");
          })
          .catch((error) => {
            console.log("create user error: ", error);
            if (error.code === "auth/email-already-in-use") {
              setErrorMessage("email already in use.");
            }
          });
    }
  };

  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <div className="heading-container">
        <h3>{title} form</h3>
      </div>

      <Box component="form" noValidate autoComplete="off">
        <TextField
          id="email"
          label="Enter the Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <TextField
          id="password"
          label="Enter the Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </Box>

      <Button onClick={handleAction} variant="outlined">
        {title}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BasicForm;
