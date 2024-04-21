import {Button, LinearProgress, TableCell, TableRow} from "@mui/material";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {GetUserCartItemDto} from "../../../../data/cartItem/GetUserCartItemDto.ts";
import * as CartItemApi from "../../../../api/CartItemApi.ts"
import {Dispatch, SetStateAction, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
    dto: GetUserCartItemDto,
    dtoList: GetUserCartItemDto[],
    setDtoList: Dispatch<SetStateAction<GetUserCartItemDto[] | undefined>>,
}


export default function ShoppingCartTableItem({dto, setDtoList, dtoList}: Props) {
    const [isQuantityPatching, setIsQuantityPatching] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);


    const handlePlusOne = async () => {
        if (dto.cart_quantity + 1 < dto.stock) {
            setIsQuantityPatching(true);
            const responseDto = await CartItemApi.patchCartItemQuantity(dto.pid, dto.cart_quantity + 1);
            const updateDtoList = dtoList.map((item) => {
                if (item.pid === dto.pid) {
                    item.cart_quantity = responseDto.cart_quantity;
                }
                return item;
            })
            setDtoList(updateDtoList);
            setIsQuantityPatching(false);
        }
    }

    const handleMinusOne = async () => {
        if (dto.cart_quantity + 1 < dto.stock) {
            setIsQuantityPatching(true);
            const responseDto = await CartItemApi.patchCartItemQuantity(dto.pid, dto.cart_quantity - 1);
            const updateDtoList = dtoList.map((item) => {
                if (item.pid === dto.pid) {
                    item.cart_quantity = responseDto.cart_quantity;
                }
                return item;
            })
            setDtoList(updateDtoList);
            setIsQuantityPatching(false);
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        await CartItemApi.deleteCartItem(dto.pid)
        const updateDtoList = dtoList.filter((item) => (
            item.pid !== dto.pid
        ))
        setDtoList(updateDtoList);
    }


    return (
        <TableRow key={dto.pid}>
            <TableCell><img src={dto.image_url} alt={dto.name} height={150}/></TableCell>
            <TableCell>{dto.name}</TableCell>
            <TableCell>${dto.price.toLocaleString()}</TableCell>
            <TableCell>
                {
                    isQuantityPatching
                        ? <LinearProgress/>
                        : <QuantitySelector quantity={dto.cart_quantity} handleMinus={handleMinusOne}
                                            handlePlus={handlePlusOne}/>
                }
            </TableCell>
            <TableCell>${(dto.cart_quantity * dto.price).toLocaleString()}</TableCell>
            <TableCell>
                {
                    isDeleting
                        ? <CircularProgress size="1rem"/>
                        : <Button onClick={handleDelete}>
                            <FontAwesomeIcon icon={faTrash} size="lg"/>
                        </Button>
                }
            </TableCell>
        </TableRow>
    )
}