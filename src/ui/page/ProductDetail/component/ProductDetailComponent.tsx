import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {useState} from "react";
import {Button} from "@mui/material";
import {ProductDetailDto} from "../../../../data/product/ProductDetailDto.ts";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import AddToCartSuccessSnackbar from "./AddToCartSuccessSnackbar.tsx";
import {useNavigate} from "react-router-dom";



type Props = {
    dto: ProductDetailDto
}

export default function ProductDetailComponent({dto}: Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen ] = useState<boolean>(false);

    const navigator = useNavigate();

    const handleAddToCart = async () => {
        try {
            setIsAddingCart(true);
            await CartItemApi.putCartItem(dto.pid, quantity);
            setIsAddingCart(false);
            setSnackbarOpen(true);
        } catch (error) {
            navigator("/error")
        }

    }

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity((prevState) => (prevState - 1));
        }
    }

    const handlePlus = () => {
        if (quantity < dto.stock) {
            setQuantity((prevState) => (prevState + 1));
        }
    }

    const renderAddToCart = () => {
        if (dto.stock > 0) {
            return (
                <Box mt={2} display="flex">
                    <QuantitySelector quantity={quantity} handlePlus={handlePlus} handleMinus={handleMinus}/>
                    <Button variant="contained" sx={{ml: 2, borderRadius: "20px"}}
                            onClick={handleAddToCart} disabled={isAddingCart}>加入購物車</Button>
                </Box>
            )
        } else {
            return (
                <Box>
                    <Typography color="red">
                        真係賣完!!!
                    </Typography>
                </Box>
            )
        }
    }

    return (
        <Box>
            <Box>
                <img src={dto.image_url} alt={dto.name}
                     height={240}
                />
            </Box>
            <Box>
                <Typography variant="h4">
                    {dto.name}
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1" sx={{whiteSpace: 'pre-line'}}>
                    {dto.description}
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1">
                    ${(dto.price).toLocaleString()}
                </Typography>
            </Box>
            {renderAddToCart()}
            <AddToCartSuccessSnackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen}/>
        </Box>
    )
}