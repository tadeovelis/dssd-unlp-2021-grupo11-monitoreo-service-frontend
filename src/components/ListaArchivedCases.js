import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ListaCasos from "./ListaCasos";


export default function ListaArchivedCases(props) {

    function createData(id, fecha_inicio, fecha_finalizacion) {
        return { id, fecha_inicio, fecha_finalizacion };
    }

    const rows = [
        createData(1, "1/10/2021", "1/10/2021"),
        createData(2, "10/12/2021", "4/11/2021"),
        createData(2, "20/03/2021", "18/10/2021"),
    ];

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
                <Grid item xs={4}>
                    <Typography
                        variant="subtitle1"
                    >
                        Total: <b>3</b>
                    </Typography>
                </Grid>
            </Grid>
            <ListaCasos
                rows={rows}
            />
        </Box>
    )
}