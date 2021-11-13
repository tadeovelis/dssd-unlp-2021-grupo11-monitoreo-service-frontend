import { FormControl, Grid, InputAdornment, TextField, Typography, Button } from "@mui/material";
import { Box, palette } from "@mui/system";

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { useState } from "react";
import { useHistory } from "react-router";


export default function Home(props) {

    const [state, setState] = useState({ email: '', password: '' });

    const history = useHistory();

    function handleChange(e) {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState, [name]: value
        }))
    }

    function handleSubmit(e) {
        loginExitoso();
        e.preventDefault();
    }

    function loginExitoso(data) {

        // Seteo las cookies
        //setearCookies(data);

        let ruta = "/dashboard";
        history.push({
            pathname: ruta,
            //state: { data: data }
        });
    }

    return (
        <Box
            sx={{
                bgcolor: '#ffffff',
                m: 10,
                px: 8,
                py: 5,
                maxWidth: '40%',
            }}>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
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
                        <FormControl fullWidth={true}>
                            <TextField
                                name="email"
                                id="email"
                                placeholder="Ej: juan@gmail.com"
                                label="Email"
                                type="email"
                                required={true}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MailOutlineIcon />
                                        </InputAdornment>
                                    )
                                }}
                                value={state.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth={true}>
                            <TextField
                                name="password"
                                id="password"
                                placeholder=""
                                label="Contraseña"
                                type="password"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon />
                                        </InputAdornment>
                                    )
                                }}
                                value={state.password}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"

                        >
                            Ingresar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}