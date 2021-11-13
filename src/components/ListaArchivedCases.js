import { Typography } from "@mui/material";
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
            <Typography
                variant="subtitle1"
                sx={{ my: 1 }}
            >
                Lista de casos <b>activos</b>
            </Typography>
            <ListaCasos
                rows={rows}
            />
        </Box>
    )
}