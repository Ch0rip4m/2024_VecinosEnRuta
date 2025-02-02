import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../../Utils/Variables";
import ListaSolicitud from "../../components/listas/ListaBoton";
import SimpleSelectLocation from "../../components/selectores/SimpleSelectLocation";
import { useSnackbar } from "../../contexts/SnackbarContext";

const csrfToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("csrftoken="))
  ?.split("=")[1];

const columns = [{ id: "nombre_usuario", label: "Contacto" }];

export default function Contactos(props) {
  const [formData, setFormData] = useState({});
  const [denuncia, setDenuncia] = useState({});
  const [selectContacts, setSelectContacts] = useState({});
  const [contacts, setContacts] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsR, setOptionsR] = useState([]);
  const [selectContactsR, setSelectContactsR] = useState({});
  const [value, setValue] = useState(0);
  const [isShearing, setIsShearing] = useState(false);
  const [locationInterval, setLocationInterval] = useState(null);
  const snackbar = useSnackbar();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/db-manager/contactos-usuario/`, {
        params: { id_usuario: localStorage.getItem("user_id") },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          setContacts(response.data);

          const contactOptions = response.data.map((contact) => ({
            label: contact.nombre_usuario,
            value: contact.id_usuario,
          }));
          setOptions(contactOptions);
        }
      })
      .catch((error) => {
        console.error("Error al obtener a los miembros de la comunidad", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/db-manager/conductores-rutas/`, {
        params: { id_usuario: localStorage.getItem("user_id") },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          const contactOptions = response.data.map((contact) => ({
            label: contact.nombre_usuario,
            value: contact.id_usuario,
          }));
          setOptionsR(contactOptions);
        }
      })
      .catch((error) => {
        console.error("Error al obtener a los conductores", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = {
      ...formData,
      id_usuario: localStorage.getItem("user_id"),
    };
    await axios
      .post(`${BACKEND_URL}/db-manager/contactos-emergencia/`, formDataToSend, {
        headers: { "X-CSRFToken": csrfToken },
        withCredentials: true,
      })
      .then((response) => {
        snackbar?.success("Correos ingresados exitosamente");
      })
      .catch((error) => {
        console.error("Error al ingresar correos de emergencia", error);
        snackbar?.error("Error al ingresar los correos");
      });
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDataChange = (selectedContact, name) => {
    setSelectContacts({ ...selectContacts, [name]: selectedContact.value });
  };

  const handleTextChangeR = (event) => {
    const { name, value } = event.target;
    setDenuncia({ ...denuncia, [name]: value });
  };

  const handleDataChangeR = (selectedContactR, name) => {
    setDenuncia({ ...denuncia, [name]: selectedContactR.value });
  };

  const handleShareLocation = () => {
    if (isShearing) {
      // Detener el compartido de ubicación
      clearInterval(locationInterval);
      setIsShearing(false);
    } else {
      // Iniciar el compartido de ubicación
      const interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const dataToSend = {
              ...selectContacts,
              id_emisor: localStorage.getItem("user_id"),
              latitud: latitude,
              longitud: longitude,
            };
            if (dataToSend.latitud != null && dataToSend.longitud != null) {
              axios
                .post(
                  `${BACKEND_URL}/db-manager/compartir-ubicacion/`,
                  dataToSend,
                  {
                    headers: { "X-CSRFToken": csrfToken },
                    withCredentials: true,
                  }
                )
                .then((response) => {
                  console.log("Ubicación compartida:", response.data);
                })
                .catch((error) => {
                  console.error("Error al compartir ubicación", error);
                });
            }
          },
          (error) => console.error("Error al obtener ubicación:", error)
        );
      }, 10000); // Enviar ubicación cada 10 segundos

      setLocationInterval(interval);
      setIsShearing(true);
    }
  };

  useEffect(() => {
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(locationInterval);
  }, [locationInterval]);

  const handleViewLocation = () => {
    window.location.href = "/ubicacion-compartida";
  };

  const handleSendAlert = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Formatear la marca de tiempo de manera legible
        const timestamp = new Date(position.timestamp);
        const formattedTimestamp = timestamp.toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const panicLocation = {
          latitud: latitude,
          longitud: longitude,
          timestamp: formattedTimestamp,
        };
        axios
          .post(BACKEND_URL + "/db-manager/boton-de-panico/", panicLocation, {
            params: { id_usuario: localStorage.getItem("user_id") },
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
          })
          .then((response) => {
            snackbar.success("Alerta enviada con exito");
          })
          .catch((error) => {
            console.error("Error al enviar alerta", error);
            snackbar.error("Error al enviar alerta");
          });
      });
    }
  };

  const handleDenuncia = () => {
    const denunciaToSend = {
      ...denuncia,
      id_denunciante: localStorage.getItem("user_id"),
    };
    console.log(denunciaToSend);
    axios.post(BACKEND_URL + "/db-manager/denuncias/", denunciaToSend, {
      headers: { "X-CSRFToken": csrfToken },
      withCredentials: true,
    })
    .then((response) => {
      snackbar.success("Denuncia enviada con exito");
    })
    .catch((error) => {
      console.error("Error al enviar Denuncia", error);
      snackbar.error("Error al enviar Denuncia");
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Tabs value={value} onChange={handleChange} variant="scrollable">
          <Tab label="Botón de pánico" />
          <Tab label="Compartir ubicación" />
          <Tab label="Recibir ubicación" />
          <Tab label="Denuncias" />
        </Tabs>
        <Box sx={{ mt: 2, width: "100%", textAlign: "center" }}>
          {value === 0 && (
            <>
              <Typography
                variant="overline"
                sx={{ mt: 1, mb: 1, textAlign: "center" }}
              >
                Aquí puedes ingresar los correos electrónicos de tus contactos
                de emergencia
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    value={formData.correo_emergencia || ""}
                    name="correo_emergencia"
                    fullWidth
                    onChange={handleTextChange}
                    label="Escriba los correos separándolos por comas"
                    maxRows={5}
                    multiline
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2, bgcolor: "var(--navbar-color)" }}
                onClick={handleSubmit}
              >
                Guardar contactos
              </Button>
              <Grid item xs={12}>
              <Typography variant="overline" sx={{ mt: 2 }}>
                En caso de que te sientas incómodo en tu viaje, presiona este
                  botón para enviar un correo de alerta automaticamente.
              </Typography>
              </Grid>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ mb: 2, padding: 10, bgcolor: "red" }}
                    onClick={handleSendAlert}
                  >
                    botón de pánico
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
          {value === 1 && (
            <>
              <Typography
                variant="overline"
                sx={{ mt: 1, mb: 1, textAlign: "center" }}
              >
                Aquí puedes elegir el contacto compartiras ubicación (miembros de las comunidades a las que perteneces)
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <SimpleSelectLocation
                    values={options}
                    formData={selectContacts}
                    onChange={handleDataChange}
                    required
                    fullWidth
                    label="¿A quien compartiras ubicación?"
                    name="id_receptor"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, bgcolor: "var(--navbar-color)" }}
                onClick={handleShareLocation}
              >
                {isShearing ? "Dejar de compartir" : "Compartir ubicación"}
              </Button>
            </>
          )}
          {value === 2 && (
            <>
              <Typography
                variant="overline"
                sx={{ mt: 1, mb: 1, textAlign: "center" }}
              >
                Aquí puedes ver la ubicación si alguien te la a compartido
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <ListaSolicitud
                    columns={columns}
                    rows={contacts}
                    height={550}
                    buttonLabel="Ver"
                    onClickButtonFunction={handleViewLocation}
                  />
                </Grid>
              </Grid>
            </>
          )}
          {value === 3 && (
            <>
              <Typography
                variant="overline"
                sx={{ mt: 1, mb: 1, textAlign: "center" }}
              >
                Aquí puedes registrar las quejas respecto a los conductores de
                tus rutas
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <SimpleSelectLocation
                    values={optionsR}
                    formData={selectContactsR}
                    onChange={handleDataChangeR}
                    required
                    fullWidth
                    label="Nombre conductor"
                    name="id_denunciado"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={denuncia.info_denuncia || ""}
                    name="info_denuncia"
                    fullWidth
                    onChange={handleTextChangeR}
                    label="Escriba su denuncia aqui"
                    maxRows={5}
                    multiline
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, bgcolor: "var(--navbar-color)" }}
                onClick={handleDenuncia}
              >
                Enviar denuncia
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
