import { FormControl, Grid, InputAdornment, TextField, Typography, Button, Tooltip, IconButton, Alert, CircularProgress } from "@mui/material";
import { Box, palette } from "@mui/system";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useState } from "react";
import { useHistory } from "react-router";

import env from "@beam-australia/react-env";

import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { MyAlert } from "../components/MyAlert";


// Valores default del form
const defaultValues = {
    email: "",
    password: ""
}

// Schema de Yup para las validaciones
// - con el env() pongo el mensaje de error
const schema = yup.object({
    email: yup.string().email(env("EMAIL_ERROR_TEXT")).required(env("REQUIRED_FIELD_ERROR_TEXT")),
    password: yup.string().required(env("REQUIRED_FIELD_ERROR_TEXT")),
}).required(env("REQUIRED_FIELD_ERROR_TEXT"));

export default function Home(props) {

    const history = useHistory();

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [cargando, setCargando] = useState(false);

    // React hook form
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues,
        resolver: yupResolver(schema) // Le digo que use el resolver de yup
    });


    const [alert, setAlert] = useState({
        mostrarAlert: false,
        alertTitle: '',
        alertText: '',
        alertSeverity: 'info',
        alertVariant: 'filled'
    })
    function noMostrarAlert() {
        setAlert(prevState => ({
            ...prevState,
            mostrarAlert: false
        }))
    }
    function mostrarAlertDatosErroneos() {
        setAlert({
            mostrarAlert: true,
            alertTitle: "Datos incorrectos",
            alertText: "Los datos ingresados no coinciden o no existen, verificalos y volvé a intentar.",
            alertSeverity: "error",
            alertVariant: "filled"
        })
    }

    function originalSubmit(data, e) {
        setCargando(true);

        let ruta = "api/auth/login";

        let formData = new FormData();
        formData.append("username", data.email);
        formData.append("password", data.password);

        fetch(env("BACKEND_URL") + ruta, {
            method: 'POST',
            credentials: 'include',
            body: formData,
            /*
            headers: {
                'Authorization': 'Bearer ' + getCookie("access_token")
            }
            */
        })
            .then(response => response.json()
                .then(data => {
                    setCargando(false);
                    if (response.ok) loginExitoso(data);
                    else mostrarAlertDatosErroneos();
                })
                .catch(error => {
                    setCargando(false);
                    console.error(error);
                    mostrarAlertDatosErroneos();
                }));
        e.preventDefault();
    }

    function loginExitoso(data) {
        console.log(data);

        let ruta = "/dashboard";
        history.push({
            pathname: ruta,
        });
    }

    return (
        <Box
            sx={{
                bgcolor: '#ffffff',
                m: 10,
                px: 8,
                py: 5,
                maxWidth: 400,
                height: 'fit-content'
            }}>

            {/* FORM */}
            <form onSubmit={handleSubmit(originalSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}
                        sx={{
                            justifyContent: "flex-start"
                        }}>
                        <Typography
                            variant="h5"
                        >
                            Iniciar sesión
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Completá tu email y contraseña para poder ingresar al sistema:
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth={true}>
                            <Controller
                                name="email"
                                control={control}
                                render={({
                                    field
                                }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        name="email"
                                        id="email"
                                        placeholder="Ej: juan@gmail.com"
                                        label="Email"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <MailOutlineIcon />
                                                </InputAdornment>
                                            )
                                        }}
                                        // El message lo trae del resolver de Yup, seteado arriba de todo
                                        helperText={errors.email?.message}
                                        error={errors.email && true}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth={true}>
                            <Controller
                                name="password"
                                control={control}
                                render={({
                                    field
                                }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        name="password"
                                        id="password"
                                        placeholder=""
                                        label="Contraseña"
                                        type={mostrarPassword ? "text" : "password"}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <VpnKeyIcon />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <Tooltip title={mostrarPassword ? "Ocultar contraseña" : "Revelar contraseña"}>
                                                        <IconButton
                                                            onClick={() => setMostrarPassword(!mostrarPassword)}
                                                        >
                                                            {mostrarPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </Tooltip>
                                                </InputAdornment>
                                            )
                                        }}
                                        // El message lo trae del resolver de Yup, seteado arriba de todo
                                        helperText={errors.password?.message}
                                        error={errors.password && true}
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    {/* Alert avisando que hay errores en los campos */}
                    {Object.entries(errors).length !== 0 &&
                        <Grid item xs={12}>
                            <Alert severity="error" variant="outlined"
                                sx={{
                                    fontSize: '.8em'
                                }}
                            >
                                {(Object.entries(errors).length > 1) ?
                                    "Por favor, corregí los campos marcados en rojo y volvé a intentar."
                                    :
                                    "Por favor, corregí el campo marcado en rojo y volvé a intentar."
                                }
                            </Alert>
                        </Grid>
                    }

                    {/* Botón de submit */}
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"

                        >
                            Ingresar
                        </Button>
                    </Grid>
                    {cargando &&
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    }

                    {/* Alert de datos erróneos */}
                    <MyAlert
                        open={alert.mostrarAlert}
                        onClose={noMostrarAlert}
                        title={alert.alertTitle}
                        text={alert.alertText}
                        severity={alert.alertSeverity}
                        variant={alert.alertVariant}
                    />
                </Grid>
            </form>
        </Box>
    )
}