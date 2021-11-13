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
                setAverageTime(data);
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
                //console.log(response);
                console.log("Rechazos mesa entradas...");
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
                //console.log(response);
                console.log("Rechazos legales...");
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
                <Box
                    sx={{
                        mb: 4,
                        display: 'flex',
                        gap: 10
                    }}
                >
                    <Box>
                        <ListaActiveCases />
                    </Box>
                    <Box>
                        <ListaArchivedCases />
                    </Box>
                </Box>

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
                            valor={cantidadRechazosMesaEntradas ? cantidadRechazosMesaEntradas : '-'}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CardMetrica
                            title="Cantidad de rechazos por parte del área de legales"
                            color="#f12c28"
                            valor={cantidadRechazosLegales ? cantidadRechazosLegales : '-'}                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}