import NavList from "../../component/NavList";
import {useContext, useEffect, useState} from "react";
import {GetUserCartItemDto} from "../../../data/cartItem/GetUserCartItemDto.ts";
import {useNavigate} from "react-router-dom";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import ShoppingCartTable from "./component/ShoppingCartTable.tsx";
import {Button, Container} from "@mui/material";
import LoadingContainer from "../ProductListingPage/component/LoadingContainer.tsx";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ShoppingCart() {
    const [dto, setDto] = useState<GetUserCartItemDto[] | undefined>(undefined);
    const navigate = useNavigate();
    const loginUser = useContext<UserData | undefined | null>(LoginUserContext)

    const fetchGetUserCartItems = async () => {
        try {
            // setDto(undefined)
            const response = await CartItemApi.getUserCartItem()
            setDto(response);
        } catch (error) {
            navigate("/error");
        }
    }

    useEffect(() => {
        if (loginUser) {
            fetchGetUserCartItems();
        }
    }, [loginUser])


    const calTotal = () => {
        let total = 0;

        dto!.forEach((dto) => {
            total += dto.price * dto.cart_quantity;
        });
        return total;
    }

    const renderSubmitBox = () => {
        return (
            <Box
                component="div"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    my: 3,
                }}
            >
                <Box component="div">Total: ${calTotal().toLocaleString()}</Box>
                <Button variant="contained" color="success" sx={{width: '30%', height: '50px'}}>
                    Checkout
                </Button>
            </Box>
        )
    }


    return (
        <>
            <NavList/>
            <Container>
                {
                    dto
                        ? dto.length > 0
                            ? <>
                                <ShoppingCartTable dto={dto} setDtoList={setDto} dtoList={dto}/>
                                {renderSubmitBox()}
                            </>
                            : <Typography variant="h2" >冇野呀，去買野啦，仲等乜x!!!!!</Typography>
                        : <LoadingContainer/>
                }
            </Container>
        </>
    )
}