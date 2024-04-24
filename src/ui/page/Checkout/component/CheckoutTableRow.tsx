import {TableCell, TableRow} from "@mui/material";
import {TransactionProductDto} from "../../../../data/transaction/TransactionDto.ts";

type Props = {
    dto: TransactionProductDto
}

export default function CheckoutTableRow({dto}: Props) {
    return (
        <>
            <TableRow>
                <TableCell>
                    <img
                        src={dto.product.image_url}
                        alt={dto.product.name}
                        height="150px"
                    />
                </TableCell>
                <TableCell>{dto.product.name}</TableCell>
                <TableCell>${dto.product.price.toLocaleString()}</TableCell>
                <TableCell>{dto.quantity}</TableCell>
                <TableCell>${dto.subtotal.toLocaleString()}</TableCell>
            </TableRow>
        </>
    )
}