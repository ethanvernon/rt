import * as React from "react";
import { TextField, Button, Box } from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

interface BasicFormProps {
  title: string;
}

// React FN component
export const BasicForm = ({ title }: BasicFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authentication = getAuth();

  const handleAction = () => {
    if (title === "register") {
      if (email.length > 0 && password.length > 0)
        createUserWithEmailAndPassword(authentication, email, password).then(
          (response) => {
            console.log(response);
          }
        );
    }
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
    </div>
  );
};

export default BasicForm;
