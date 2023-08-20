import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Paper
      elevation={4}
      className="ml-auto mr-auto mt-16 w-[300px] p-8 text-center"
    >
      <div className="mb-4 text-xl font-semibold">Log In</div>

      <TextField
        fullWidth
        value={email}
        label="Correo"
        variant="outlined"
        onChange={event => setEmail(event.target.value)}
      />
      <br />
      <br />

      <TextField
        fullWidth
        type="password"
        value={password}
        label="Contraseña"
        variant="outlined"
        onChange={event => setPassword(event.target.value)}
      />
      <br />
      <br />

      <Button variant="contained">Entrar</Button>
    </Paper>
  );
};

export default Login;
