import { Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow } from "@mui/material";
import { styled } from '@mui/material/styles';


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

export default function ListaCasos(props) {

    const rows = props.rows;

    return (
        <Table sx={{ minWidth: 500 }}>
            <TableHead>
                <TableRow>
                    <StyledTableCell>ID</StyledTableCell>
                    <StyledTableCell align="right">Fecha de inicio</StyledTableCell>
                    <StyledTableCell align="right">Fecha de finalización</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <StyledTableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell component="th" scope="row">
                            {row.id}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.fecha_inicio}</StyledTableCell>
                        <StyledTableCell align="right">{row.fecha_finalizacion}</StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    )
}