import NavList from "../../component/NavList";
import {useContext, useEffect, useState} from "react";
import {GetUserCartItemDto} from "../../../data/cartItem/GetUserCartItemDto.ts";
import {useNavigate} from "react-router-dom";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import ShoppingCartTable from "./component/ShoppingCartTable.tsx";
import {Backdrop, Button, Container, SvgIcon} from "@mui/material";
import LoadingContainer from "../ProductListingPage/component/LoadingContainer.tsx";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import Box from "@mui/material/Box";
import CartItemEmptyPage from "./component/CartItemEmptyPage.tsx";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import {Amex,Unionpay,Visa,Mastercard} from "react-payment-logos/dist/flat";
import CircularProgress from "@mui/material/CircularProgress";
import * as TransactionApi from "../../../api/TransactionApi.ts";


export default function ShoppingCart() {
    const [dto, setDto] = useState<GetUserCartItemDto[] | undefined>(undefined);
    const navigate = useNavigate();
    const loginUser = useContext<UserData | undefined | null>(LoginUserContext)
    const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);

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

    const handlePay = async () => {
        setIsBackdropOpen(true);
        const responseData = await TransactionApi.prepareTransaction();
        navigate(`/checkout/${responseData.tid}`);
    }

    const renderSubmitBox = () => {
        return (
            <Box
                component="div"
                sx={{
                    p: '30px',
                    position: 'relative',
                }}
            >
                <Box component="div" sx={{
                    fontSize: '17px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: '4px',
                    color: '#800019',
                    mt: '-.435em'
                }}>
                    <Typography component='span' sx={{fontWeight: '700'}}>Total</Typography>
                    <Typography component='span' sx={{fontWeight: '700'}}>HK${calTotal().toLocaleString()}</Typography>
                </Box>
                <Divider sx={{my: 3}}/>
                <Box component="div" sx={{m: '24px 0'}}>
                    <Typography component='p'
                                sx={{fontSize: '12px', mb: '4px', fontWeight: '500', color: '#800019', mt: '-.435em'}}>Shipping
                        calculated at checkout</Typography>
                </Box>
                <Button variant="contained" color="success" onClick={handlePay} sx={{
                    width: '100%',
                    height: '50px',
                    backgroundColor: '#800019',
                    color: '#ffffff',
                    fontSize: '15px',
                    lineHeight: '55px',
                    '&:hover': {
                        background: '#800019',
                        color: '#fffff',
                    },
                }}>
                    Checkout
                </Button>
                <Box component='div' sx={{mt: 4,justifyContent: 'center' ,display: 'flex', maxWidth: '300px',
                    flexWrap: 'wrap',}}>
                    <Typography variant="body1" className="cart-recap__secure-payment-title" sx={{ display: 'flex', alignItems: 'center', marginBottom: 0, fontWeight: 500, marginTop: 0, fontSize: 'inherit',color: '#800019' }}>
                        <SvgIcon component="svg" focusable="false" viewBox="0 0 12 15" role="presentation" sx={{ mr: '5px', color: '#800019', fontSize:'15px' }}>
                            <g stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="square">
                                <path d="M6 1C4.32 1 3 2.375 3 4.125V6h6V4.125C9 2.375 7.68 1 6 1zM1 6h10v8H1z"></path>
                            </g>
                        </SvgIcon>
                        100% Secure Payments
                    </Typography>
                    <Box sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        flexWrap: 'wrap',
                        maxWidth: '300px',
                    }} component='div'>
                        <Box sx={{margin: '0 2px'}}><Amex/></Box>
                        <Box sx={{margin: '0 2px'}}><Mastercard/></Box>
                        <Box sx={{margin: '0 2px'}}><Unionpay/></Box>
                        <Box sx={{margin: '0 2px'}}><Visa/></Box>
                    </Box>
                </Box>
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
                                <Container>
                                    <Box component="div" style={{
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '28px 0'
                                    }}>
                                        <Typography component="h1" variant="h5" style={{
                                            marginBottom: 0,
                                            fontSize: 27,
                                            lineHeight: 1.43,
                                            fontWeight: '500',
                                            color: '#800019'
                                        }}>
                                            My cart
                                        </Typography>
                                    </Box>
                                </Container>
                                <Grid container spacing={2} columns={{xs: 8, sm: 16}}>
                                    <Grid xs={12} sm={11} sx={{
                                        border: '1px solid #e1e3e4',
                                        borderRadius: '3px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#FFFFFF',
                                        mr: '30px'
                                    }}>
                                        <ShoppingCartTable dto={dto} setDtoList={setDto} dtoList={dto}/>
                                    </Grid>
                                    <Grid xs={12} sm={4} sx={{
                                        border: '1px solid #e1e3e4',
                                        borderRadius: '3px',
                                        backgroundColor: '#FFFFFF',
                                        mb: '30px',
                                        position: 'relative',
                                    }}>
                                        {renderSubmitBox()}
                                    </Grid>
                                </Grid>

                            </>
                            : <CartItemEmptyPage/>
                        : <LoadingContainer/>
                }
            </Container>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}