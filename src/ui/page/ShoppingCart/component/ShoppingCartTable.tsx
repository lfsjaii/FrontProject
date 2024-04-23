import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {GetUserCartItemDto} from "../../../../data/cartItem/GetUserCartItemDto.ts";
import ShoppingCartTableItem from "./ShoppingCartTableItem.tsx";
import {Dispatch, SetStateAction} from "react";


type Props = {
    dto: GetUserCartItemDto[],
    setDtoList: Dispatch<SetStateAction<GetUserCartItemDto[] | undefined>>,
    dtoList: GetUserCartItemDto[],
}

export default function ShoppingCartTable({dto,setDtoList,dtoList }: Props) {
    return (
        <TableContainer>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead sx={{width:'100%',textAlign:'left', fontSize:'13px'}}>
                    <TableRow>
                        <TableCell sx={{pl: '30px',p:'15px 30px', fontWeight:'400'}}>Product</TableCell>
                        <TableCell sx={{p:'15px 30px', fontWeight:'400',textAlign:'center'}}>Quantity</TableCell>
                        <TableCell sx={{pr:'30px',p:'15px 30px', fontWeight:'400',textAlign:'right'}}>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dto &&
                        dto.map((dto) => (
                            <ShoppingCartTableItem key={dto.pid} dto={dto} setDtoList={setDtoList} dtoList={dtoList}/>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}