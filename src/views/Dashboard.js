import { Card, CardContent, Divider, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CardMetrica from "../components/CardMetrica";
import ListaActiveCases from "../components/ListaActiveCases";
import ListaArchivedCases from "../components/ListaArchivedCases";


export default function Dashboard(props) {



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
                            valor="2.6 hs"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CardMetrica
                            title="Cantidad de rechazos por parte de mesa de entradas"
                            color="#ffa800"
                            valor="12"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <CardMetrica
                            title="Cantidad de rechazos por parte del área de legales"
                            color="#f12c28"
                            valor="18"
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}