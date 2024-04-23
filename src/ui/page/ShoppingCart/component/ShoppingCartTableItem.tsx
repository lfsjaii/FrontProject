import {TableCell, TableRow} from "@mui/material";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {GetUserCartItemDto} from "../../../../data/cartItem/GetUserCartItemDto.ts";
import * as CartItemApi from "../../../../api/CartItemApi.ts"
import {Dispatch, SetStateAction, useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {Link} from "react-router-dom";

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
        <TableRow key={dto.pid} sx={{borderTop: '#e1e3e4'}}>
            <TableCell sx={{pl: '30px', pt: '26px', pb: '26px', p: '15px 30px'}}>
                <Box component='div' sx={{alignItems: 'center', display: 'flex'}}>
                    <Box component='div' sx={{width: '90px', minWidth: '90px', mr: '20px'}}>
                        <Box component='div'
                             sx={{pb: '100.0%', position: 'relative', marginLeft: 'auto', marginRight: 'auto'}}>
                            <img
                                src={dto.image_url}
                                alt={dto.name}
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    top: 0,
                                    left: 0,
                                    borderStyle: 'none',
                                    verticalAlign: 'top'
                                }}
                            />
                        </Box>
                    </Box>
                    <Box component='div' sx={{
                        flexGrow: 1,
                        alignItems: 'center',
                        display: 'flex',
                        alignContent: 'stretch',
                        flexWrap: 'wrap'
                    }}>
                        <Box component='div' sx={{fontSize: '13px'}}>
                            <Typography sx={{
                                display: 'block',
                                mb: '4px',
                                lineHeight: '1.5',
                                color: '#800019',
                                fontWeight: '500'
                            }}>{dto.name}</Typography>
                        </Box>
                        <Divider sx={{my: 3}}/>
                        <Box component='div' sx={{fontSize: '13px'}}>
                            <Typography component='span' sx={{
                                display: 'inline-block',
                                fontWeight: '500',
                                color: '#800019'
                            }}>HK${dto.price.toLocaleString()}</Typography>
                        </Box>
                    </Box>
                </Box>
            </TableCell>
            <TableCell sx={{pl: '30px', pt: '26px', pb: '26px', p: '15px 30px'}}>
                 <QuantitySelector quantity={dto.cart_quantity} handleMinus={handleMinusOne} handlePlus={handlePlusOne} isLoading={isQuantityPatching}/>
                {
                    isDeleting ? <Box sx={{textAlign: 'center'}}> <CircularProgress size="1rem"/> </Box> :
                        <Link
                            to="#"
                            onClick={handleDelete}
                            style={{textDecoration: 'none', color: 'inherit'}}
                        >
                            <Box
                                sx={{
                                    display: 'block',
                                    width: 'max-content',
                                    margin: '10px auto 0',
                                    fontSize: '12px',
                                    lineHeight: '1',
                                    transition: 'color .2s ease-in-out',
                                    backgroundColor: 'transparent',
                                }}
                            >
                                Remove
                            </Box>
                        </Link>
                }
            </TableCell>
            <TableCell sx={{
                paddingRight: '30px',
                textAlign: 'right',
                paddingTop: '26px',
                paddingBottom: '26px',
                padding: '15px 30px'
            }}><Typography component='span' sx={{
                display: 'inline-block',
                fontWeight: '400',
                color: '#800019'
            }}>HK${(dto.cart_quantity * dto.price).toLocaleString()}</Typography></TableCell>
        </TableRow>
    )
}