import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import CheckoutTableRow from "./CheckoutTableRow.tsx";
import {TransactionDto} from "../../../../data/transaction/TransactionDto.ts";


type Props = {
    dto: TransactionDto
}

export default function CheckoutTable({ dto }: Props) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Sub-total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        dto.items.map((item) => (
                            <CheckoutTableRow dto={item} key={item.tpid}/>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}