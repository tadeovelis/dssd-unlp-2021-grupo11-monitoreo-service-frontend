import { Alert, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import env from "@beam-australia/react-env";
import { formatDate } from "../helpers/helpers";
import { useEffect, useState } from "react";
import Tabla from "./Tabla";


export default function ListaActiveCases(props) {

    const [casosActivos, setCasosActivos] = useState([]);
    const [cantCasosActivos, setCantCasosActivos] = useState(null);
    const [rows, setRows] = useState([]);
    const [casosActivosCargados, setCasosActivosCargados] = useState(false);

    function createData(id, fecha_inicio, fecha_ultima_actualizacion, cantidad_rechazos_mesa_entradas, cantidad_rechazos_area_legales) {
        return { id, fecha_inicio, fecha_ultima_actualizacion, cantidad_rechazos_mesa_entradas, cantidad_rechazos_area_legales };
    }

    // Obtener casos activos
    useEffect(() => {
        setCasosActivosCargados(false);
        let ruta = "api/activeCase";

        fetch(env("BACKEND_URL") + ruta, {
            method: 'GET',
            credentials: 'include',
            /*
            headers: {
                'Authorization': 'Bearer ' + getCookie("access_token")
            }
            */
        })
            .then(response => response.json())
            .then(data => {
                console.log("Active cases...");
                console.log(data);
                setCasosActivos(data);
                setCasosActivosCargados(true);
            })
            .catch(error => console.error(error));
    }, [])

    // Obtener cant de casos activos
    useEffect(() => {
        let ruta = "api/activeCaseCount";

        fetch(env("BACKEND_URL") + ruta, {
            method: 'GET',
            credentials: 'include',
            /*
            headers: {
                'Authorization': 'Bearer ' + getCookie("access_token")
            }
            */
        })
            .then(response => response.json())
            .then(data => {
                setCantCasosActivos(data);
            })
            .catch(error => console.error(error));
    }, [])

    // Actualizar tabla cuando se actualicen los casos activos
    useEffect(() => {
        let rows = [];
        if (casosActivos.length)
            casosActivos.map((c) => {
                rows.push(createData(
                    c.id,
                    formatDate(c.start),
                    formatDate(c.last_update_date),
                    c.cantidad_rechazos_mesa_entradas,
                    c.cantidad_rechazos_area_legales
                ))
            });
        setRows(rows);
    }, [casosActivos])


    return (
        <Box>
            <Grid container sx={{ my: 1 }}>
                <Grid item xs={8}>
                    <Typography
                        variant="subtitle1"
                    >
                        Lista de casos <b>activos</b>
                    </Typography>
                </Grid>
                {cantCasosActivos > 0 &&
                    <Grid item xs={4}>
                        <Typography
                            variant="subtitle1"
                        >
                            Total: <b>{cantCasosActivos}</b>
                        </Typography>
                    </Grid>
                }
            </Grid>
            {casosActivosCargados ? (
                cantCasosActivos > 0 ?
                    <Tabla
                        headers={[
                            'ID', 'Fecha de inicio', 'Fecha de última actualización',
                            'Rechazos por mesa de entradas', 'Rechazos por área de legales'
                        ]}
                        data={rows}
                    />
                    :
                    <Alert
                        severity="info"
                        sx={{
                            maxWidth: 'fit-content'
                        }}
                    >
                        No hay ningún caso activo
                    </Alert>
            ) : (
                <Typography>Cargando...</Typography>
            )}
        </Box>
    )
}