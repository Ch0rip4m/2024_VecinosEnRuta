import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { BACKEND_URL } from "../../Utils/Variables";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LogoRedondoVER from "../../styles/LogoRedondo";
import axios from "axios";

export default function Login({ setCheckTokens }) {
  const [formData, setformData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = ["email", "password"];
    const errors = {};
    let hasErrors = false;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = "Este campo es obligatorio";
        hasErrors = true;
      }
    });
    if (hasErrors) {
      setFormErrors(errors);
    } else {
      try {
        const response = await axios.post(
          BACKEND_URL + "/auth/token/",
          formData,
          { withCredentials: true }
        );
        if (response.data.access) {
          localStorage.setItem("email", formData.email);
          setCheckTokens(true);
          localStorage.setItem("selectedElementName", "Inicio");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error.response.data);
      }
    }
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <LogoRedondoVER width="150px" height="150px" />
        <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
          ¡Bienvenido a VecinosEnRuta!
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Correo Electronico"
                name="email"
                value={formData.email}
                onChange={handleTextChange}
                error={Boolean(formErrors.email)}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={handleTextChange}
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "var(--navbar-color)" }}
          >
            Iniciar sesión
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <RouterLink to="/recuperar-pass" variant="body2">
                ¿Olvidaste tu contraseña?
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/register" variant="body2">
                ¿No tienes cuenta? ¡Registrate aqui!
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
