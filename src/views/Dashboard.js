import { Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import CardMetrica from "../components/CardMetrica";
import ListaActiveCases from "../components/ListaActiveCases";
import ListaArchivedCases from "../components/ListaArchivedCases";
import env from "@beam-australia/react-env";


export default function Dashboard(props) {

    const [averageTime, setAverageTime] = useState(null);
    const [cantidadRechazosMesaEntradas, setCantidadRechazosMesaEntradas] = useState(null);
    const [cantidadRechazosLegales, setCantidadRechazosLegales] = useState(null);


    // Obtener las métricas
    useEffect(() => {
        getAverageTime();
        getCantidadRechazosLegales();
        getCantidadRechazosMesaEntradas();
    }, [])

    // Obtener average time
    function getAverageTime() {
        let ruta = "api/stats/averageCaseTime";

        fetch(env("BACKEND_URL") + ruta, {
            method: 'GET',
            credentials: 'include',
            /*
            headers: {
                'Authorization': 'Bearer ' + getCookie("access_token")
            }
            */
        })
            .then(response => response.json()
                .then(data => {
                    //console.log(response);
                    console.log("Average time...");
                    console.log(data);
                    setAverageTime(data.toFixed(4));
                })
                .catch(error => console.error(error)));
    }

    // Obtener cantidad rechazos mesa de entradas
    function getCantidadRechazosMesaEntradas() {
        let ruta = "api/stats/cantidadRechazosMesaEntradas";

        fetch(env("BACKEND_URL") + ruta, {
            method: 'GET',
            credentials: 'include',
            /*
            headers: {
                'Authorization': 'Bearer ' + getCookie("access_token")
            }
            */
        })
            .then(response => response.json()
                .then(data => {
                    console.log("Cantidad rechazos mesa entradas...");
                    console.log(data);
                    if (response.ok) {
                        setCantidadRechazosMesaEntradas(data);
                    }
                })
                .catch(error => console.error(error)));
    }

    // Obtener cantidad rechazos legales
    function getCantidadRechazosLegales() {
        let ruta = "api/stats/cantidadRechazosLegales";

        fetch(env("BACKEND_URL") + ruta, {
            method: 'GET',
            credentials: 'include',
            /*
            headers: {
                'Authorization': 'Bearer ' + getCookie("access_token")
            }
            */
        })
            .then(response => response.json()
                .then(data => {
                    console.log("Cantidad rechazos legales...");
                    console.log(data);
                    if (response.ok) {
                        setCantidadRechazosLegales(data);
                    }
                })
                .catch(error => console.error(error)));
    }



    return (
        <Box>
            <Paper
                sx={{
                    p: 5,
                    minWidth: '90vw'
                }}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 3
                    }}
                >
                    Métricas del proceso de registro de una Sociedad Anónima
                </Typography>

                {/* Box de las dos listas */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ListaActiveCases />
                    </Grid>
                    <Grid item xs={12}>
                        <ListaArchivedCases />
                    </Grid>
                </Grid>

                {/* Divider para separar */}
                <Divider
                    sx={{
                        my: 4
                    }}
                />

                {/* Algunas métricas */}
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <CardMetrica
                            title="Tiempo promedio"
                            color="#41c462"
                            valor={averageTime ? averageTime + ' hs' : '-'}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CardMetrica
                            title="Cantidad de rechazos por parte de mesa de entradas"
                            color="#ffa800"
                            valor={cantidadRechazosMesaEntradas >= 0 ? cantidadRechazosMesaEntradas : '-'}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CardMetrica
                            title="Cantidad de rechazos por parte del área de legales"
                            color="#f12c28"
                            valor={cantidadRechazosLegales >= 0 ? cantidadRechazosLegales : '-'} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}