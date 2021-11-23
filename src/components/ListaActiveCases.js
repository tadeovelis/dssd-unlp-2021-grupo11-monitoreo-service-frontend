import { Grid, Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';

import env from "@beam-australia/react-env";
import { formatDate, getCookie } from "../helpers/helpers";
import { useEffect, useState } from "react";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#393939",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function ListaActiveCases(props) {

    const [casosActivos, setCasosActivos] = useState([]);
    const [cantCasosActivos, setCantCasosActivos] = useState(null);
    const [rows, setRows] = useState([]);

    function createData(id, fecha_inicio, fecha_ultima_actualizacion, cantidad_rechazos_mesa_entradas, cantidad_rechazos_area_legales) {
        return { id, fecha_inicio, fecha_ultima_actualizacion, cantidad_rechazos_mesa_entradas, cantidad_rechazos_area_legales };
    }

    // Obtener casos activos
    useEffect(() => {
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
                <Grid item xs={4}>
                    <Typography
                        variant="subtitle1"
                    >
                        Total: <b>{cantCasosActivos}</b>
                    </Typography>
                </Grid>
            </Grid>

            <Table sx={{ minWidth: 500 }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Fecha de inicio</StyledTableCell>
                        <StyledTableCell align="right">Fecha de última actualización</StyledTableCell>
                        <StyledTableCell align="right">Rechazos por mesa de entradas</StyledTableCell>
                        <StyledTableCell align="right">Rechazos por área de legales</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.fecha_inicio}</StyledTableCell>
                            <StyledTableCell align="right">{row.fecha_ultima_actualizacion}</StyledTableCell>
                            <StyledTableCell align="right">{row.cantidad_rechazos_mesa_entradas}</StyledTableCell>
                            <StyledTableCell align="right">{row.cantidad_rechazos_area_legales}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}