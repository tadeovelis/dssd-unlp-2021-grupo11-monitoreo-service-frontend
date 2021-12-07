import { Alert, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import env from "@beam-australia/react-env";
import { formatDate } from "../helpers/helpers";
import { useEffect, useState } from "react";
import Tabla from "./Tabla";


export default function ListaUsuarios(props) {

    const [usuarios, setUsuarios] = useState([]);
    const [rows, setRows] = useState([]);
    const [usuariosCargados, setUsuariosCargados] = useState(false);

    function createData(id, firstname, lastname, userName, job_title, creation_date, last_update_date, last_connection, enabled) {
        return { id, firstname, lastname, userName, job_title, creation_date, last_update_date, last_connection, enabled };
    }

    // Obtener casos activos
    useEffect(() => {
        setUsuariosCargados(false);
        let ruta = "api/user";

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
                console.log("Usuarios...");
                console.log(data);
                setUsuarios(data);
                setUsuariosCargados(true);
            })
            .catch(error => console.error(error));
    }, [])


    // Actualizar tabla cuando se actualicen los casos activos
    useEffect(() => {
        let rows = [];
        if (usuarios.length)
            usuarios.map((p) => {
                rows.push(createData(
                    p.id,
                    p.firstname,
                    p.lastname,
                    p.userName,
                    p.job_title,
                    formatDate(p.creation_date),
                    formatDate(p.last_update_date),
                    formatDate(p.last_connection),
                    p.enabled
                ))
            });
        setRows(rows);
    }, [usuarios])


    return (
        <Box>
            <Grid container sx={{ my: 1 }}>
                <Grid item xs={8}>
                    <Typography
                        variant="subtitle1"
                    >
                        Lista de <b>usuarios</b>
                    </Typography>
                </Grid>
                {usuarios.length > 0 &&
                    <Grid item xs={4}>
                        <Typography
                            variant="subtitle1"
                        >
                            Total: <b>{usuarios.length}</b>
                        </Typography>
                    </Grid>
                }
            </Grid>
            {usuariosCargados ? (
                usuarios.length > 0 ?
                    <Tabla
                        headers={[
                            "ID", "Nombre", "Apellido", "Nombre de usuario",
                            "Rol de empleado", "Fecha de creación", "Fecha de última actualización",
                            "Fecha de última conexión", "Estado de habilitación"
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
                        No hay ningún usuario
                    </Alert>
            ) : (
                <Typography>Cargando...</Typography>
            )}
        </Box>
    )
}