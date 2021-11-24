import { Alert, Grid, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';

import env from "@beam-australia/react-env";
import { formatDate, getCookie } from "../helpers/helpers";
import { useEffect, useState } from "react";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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

export default function ListaArchivedCases(props) {

    const [casosArchivados, setCasosArchivados] = useState([]);
    const [cantCasosArchivados, setCantCasosArchivados] = useState(null);
    const [rows, setRows] = useState([]);

    function createData(id, fecha_inicio, fecha_finalizacion, fecha_ultima_actualizacion, cantidad_rechazos_mesa_entradas, cantidad_rechazos_area_legales) {
        return { id, fecha_inicio, fecha_finalizacion, fecha_ultima_actualizacion, cantidad_rechazos_mesa_entradas, cantidad_rechazos_area_legales };
    }

    // Obtener casos activos
    useEffect(() => {
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
            {cantCasosArchivados > 0 ?
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">Fecha de inicio</StyledTableCell>
                                <StyledTableCell align="right">Fecha de finalización</StyledTableCell>
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
                                    <StyledTableCell align="right">{row.fecha_finalizacion}</StyledTableCell>
                                    <StyledTableCell align="right">{row.fecha_ultima_actualizacion}</StyledTableCell>
                                    <StyledTableCell align="right">{row.cantidad_rechazos_mesa_entradas}</StyledTableCell>
                                    <StyledTableCell align="right">{row.cantidad_rechazos_area_legales}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Alert
                    severity="info"
                    sx={{
                        maxWidth: 'fit-content'
                    }}
                >
                    Todavía no hay ningún caso archivado
                </Alert>
            }
        </Box>
    )
}