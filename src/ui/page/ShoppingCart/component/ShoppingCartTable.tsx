import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {GetUserCartItemDto} from "../../../../data/cartItem/GetUserCartItemDto.ts";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faTrash} from "@fortawesome/free-solid-svg-icons";
// import * as CartItemApi from "../../../../api/CartItemApi.ts";
// import {useNavigate} from "react-router-dom";
// import {useState} from "react";
import ShoppingCartTableItem from "./ShoppingCartTableItem.tsx";
import {Dispatch, SetStateAction} from "react";


type Props = {
    dto: GetUserCartItemDto[],
    setDtoList: Dispatch<SetStateAction<GetUserCartItemDto[] | undefined>>,
    dtoList: GetUserCartItemDto[],
}

export default function ShoppingCartTable({dto,setDtoList,dtoList }: Props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Sub-total</TableCell>
                        <TableCell></TableCell>
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