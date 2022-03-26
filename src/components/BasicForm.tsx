import * as React from "react";
import { TextField, Button, Box } from "@mui/material";

function BasicForm(props: any) {
  return (
    <div>
      <div className="heading-container">
        <h3>{props.title} form</h3>
      </div>

      <Box component="form" noValidate autoComplete="off">
        <TextField id="email" label="Enter the Email" variant="outlined" />
        <TextField
          id="password"
          label="Enter the Password"
          variant="outlined"
        />
      </Box>

      <Button variant="outlined">{props.title}</Button>
    </div>
  );
}

export default BasicForm;
