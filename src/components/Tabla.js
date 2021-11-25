import { TableCell, tableCellClasses } from "@mui/material";
import { styled } from "@mui/system";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        //backgroundColor: "#393939",
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


export default function Tabla(props) {
    
    const { headers, data } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }}>
                <TableHead>
                    <TableRow>
                        {headers.map((r) => {
                            <StyledTableCell align="right">{r}</StyledTableCell>
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((d) => (
                        <StyledTableRow
                            key={d.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {Object.keys(d).map((val, k) => {
                                return (
                                    <StyledTableCell align="right" k={k}>{val}</StyledTableCell>
                                )
                            })}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}