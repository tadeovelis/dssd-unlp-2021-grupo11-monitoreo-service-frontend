import { Alert, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import env from "@beam-australia/react-env";
import { formatDate } from "../helpers/helpers";
import { useEffect, useState } from "react";
import Tabla from "./Tabla";


export default function ListaArchivedCases(props) {

    const [casosArchivados, setCasosArchivados] = useState([]);
    const [cantCasosArchivados, setCantCasosArchivados] = useState(null);
    const [rows, setRows] = useState([]);
    const [casosArchivadosCargados, setCasosArchivadosCargados] = useState(false);

    function createData(id, fecha_inicio, fecha_finalizacion, fecha_ultima_actualizacion, cantidad_rechazos_mesa_entradas, cantidad_rechazos_area_legales) {
        return { id, fecha_inicio, fecha_finalizacion, fecha_ultima_actualizacion, cantidad_rechazos_mesa_entradas, cantidad_rechazos_area_legales };
    }

    // Obtener casos activos
    useEffect(() => {
        setCasosArchivadosCargados(false);
        let ruta = "api/archivedCase";

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
                console.log("Casos archivados:");
                console.log(data);
                setCasosArchivados(data);
                setCasosArchivadosCargados(true);
            })
            .catch(error => console.error(error));
    }, [])

    // Obtener cant de casos activos
    useEffect(() => {
        let ruta = "api/archivedCaseCount";

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
                setCantCasosArchivados(data);
            })
            .catch(error => console.error(error));
    }, [])

    // Actualizar tabla cuando se actualicen los casos activos
    useEffect(() => {
        let rows = [];
        if (casosArchivados.length)
            casosArchivados.map((c) => {
                rows.push(createData(
                    c.id,
                    formatDate(c.start),
                    formatDate(c.end_date),
                    formatDate(c.last_update_date),
                    c.cantidad_rechazos_mesa_entradas,
                    c.cantidad_rechazos_area_legales
                ))
            });
        setRows(rows);
    }, [casosArchivados])


    return (
        <Box>
            <Grid container sx={{ my: 1 }}>
                <Grid item xs={8}>
                    <Typography
                        variant="subtitle1"
                    >
                        Lista de casos <b>archivados</b>
                    </Typography>
                </Grid>
                {cantCasosArchivados > 0 &&
                    <Grid item xs={4}>
                        <Typography
                            variant="subtitle1"
                        >
                            Total: <b>{cantCasosArchivados}</b>
                        </Typography>
                    </Grid>
                }
            </Grid>
            {casosArchivadosCargados ? (
                cantCasosArchivados > 0 ?
                    <Tabla
                        headers={[
                            'ID', 'Fecha de inicio', 'Fecha de finalización', 'Fecha de última actualización',
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
                        Todavía no hay ningún caso archivado
                    </Alert>
            ) : (
                <Typography>Cargando...</Typography>
            )}
        </Box>
    )
}