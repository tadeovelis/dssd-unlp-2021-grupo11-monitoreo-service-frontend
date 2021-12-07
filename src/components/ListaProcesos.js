import { Alert, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import env from "@beam-australia/react-env";
import { formatDate } from "../helpers/helpers";
import { useEffect, useState } from "react";
import Tabla from "./Tabla";


export default function ListaProcesos(props) {

    const [procesos, setProcesos] = useState([]);
    const [rows, setRows] = useState([]);
    const [procesosCargados, setProcesosCargados] = useState(false);

    function createData(id, name, deploymentDate, last_update_date, activationState) {
        return { id, name, deploymentDate, last_update_date, activationState };
    }

    // Obtener casos activos
    useEffect(() => {
        setProcesosCargados(false);
        let ruta = "api/process";

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
                console.log("Procesos...");
                console.log(data);
                setProcesos(data);
                setProcesosCargados(true);
            })
            .catch(error => console.error(error));
    }, [])


    // Actualizar tabla cuando se actualicen los casos activos
    useEffect(() => {
        let rows = [];
        if (procesos.length)
            procesos.map((p) => {
                rows.push(createData(
                    p.id,
                    p.name,
                    formatDate(p.deploymentDate),
                    formatDate(p.last_update_date),
                    p.activationState
                ))
            });
        setRows(rows);
    }, [procesos])


    return (
        <Box>
            <Grid container sx={{ my: 1 }}>
                <Grid item xs={8}>
                    <Typography
                        variant="subtitle1"
                    >
                        Lista de <b>procesos</b>
                    </Typography>
                </Grid>
                {procesos.length > 0 &&
                    <Grid item xs={4}>
                        <Typography
                            variant="subtitle1"
                        >
                            Total: <b>{procesos.length}</b>
                        </Typography>
                    </Grid>
                }
            </Grid>
            {procesosCargados ? (
                procesos.length > 0 ?
                    <Tabla
                        headers={[
                            'ID', 'Nombre', 'Fecha de deployment',
                            'Fecha de última actualización', 'Estado de activación'
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
                        No hay ningún proceso
                    </Alert>
            ) : (
                <Typography>Cargando...</Typography>
            )}
        </Box>
    )
}