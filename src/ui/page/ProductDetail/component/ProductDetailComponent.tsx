import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {useState} from "react";
import {Button, CardMedia, TextField} from "@mui/material";
import {ProductDetailDto} from "../../../../data/product/ProductDetailDto.ts";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import AddToCartSuccessSnackbar from "./AddToCartSuccessSnackbar.tsx";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";


type Props = {
    dto: ProductDetailDto
}

export default function ProductDetailComponent({dto}: Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

    const navigator = useNavigate();

    const handleAddToCart = async () => {
        try {
            setIsAddingCart(true);
            await CartItemApi.putCartItem(dto.pid, quantity);
            setIsAddingCart(false);
            setSnackbarOpen(true);
        } catch (error) {
            navigator("/error");
        }
    };



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
                <>
                    <Box component='div'
                         sx={{display: 'table-cell', width: '100%', pt: '6px', verticalAlign: 'middle'}}>
                        <QuantitySelector quantity={quantity} handlePlus={handlePlus} handleMinus={handleMinus}/>
                    </Box>
                </>
            )
        } else {
            return (
                <Box>
                    <Box component='div'
                         sx={{display: 'table-cell', width: '100%', pt: '6px', verticalAlign: 'middle'}}>
                        <QuantitySelector quantity={0} handlePlus={()=>{}} handleMinus={()=> {}} disabled={true}/>
                    </Box>
                </Box>
            )
        }
    }

    const renderButtonStock = () => {
        if (dto.stock > 0) {
            return (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    mt: '20px'
                }}>
                    <Button variant="contained" sx={{
                        flex: 'none',
                        width: 'auto',
                        margin: '9px',
                        background: '#800019',
                        color: '#ffffff',
                        '&:hover': {
                            background: '#800019',
                            color: '#fffff',
                        },
                    }} onClick={handleAddToCart} disabled={isAddingCart}>
                        加入購物車
                    </Button>
                </Box>

            )
        } else {
            return (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    mt: '20px'
                }}>
                    <Button
                        variant="contained"
                        sx={{
                            flex: 'none',
                            width: 'calc(50% - 18px)',
                            margin: '9px',
                            background: '#800019',
                            color: '#ffffff',
                        }}
                        onClick={handleAddToCart}
                        disabled={true}
                    >
                        已售罄
                    </Button>
                    <Box component='div'>
                        <Box
                            component='div'
                            sx={{
                                border: '1px solid #d9d9d9',
                                color: 'grey',
                                lineHeight: '150%',
                                margin: '8px 0',
                                padding: '16px',
                                borderRadius: '4px',
                            }}
                        >
                            <Box
                                component='div'
                                sx={{
                                    fontSize: '110%',
                                    marginBottom: '5px',
                                    textAlign: 'center',
                                    color: '#464646',
                                    fontWeight: '700',
                                    lineHeight: '150%',
                                }}
                            >
                                此產品目前缺貨
                            </Box>
                            <Box
                                component='div'
                                sx={{
                                    marginBottom: '10px',
                                    color: 'grey',
                                    lineHeight: '150%',
                                }}
                            >
                                <Typography
                                    component="span"
                                    sx={{
                                        color: 'grey',
                                        lineHeight: '150%',
                                    }}
                                >
                                    閣下可留下電郵地址，產品返貨時我們會以電郵通知閣下。 <br/> You can leave your
                                    email here and we will notice you immediately once this item is restocked.
                                </Typography>
                            </Box>
                            <Box component='div'>
                                <Box
                                    component='div'
                                    sx={{
                                        marginBottom: '10px',
                                        marginTop: '20px',
                                    }}
                                >
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        type="email"
                                        placeholder="youraddress@email.com"
                                        sx={{
                                            borderLeft: '1px solid #d9d9d9',
                                            borderRight: '1px solid #d9d9d9',
                                            borderColor: '#d9d9d9',
                                            borderStyle: 'solid',
                                            marginBottom: '5px',
                                            backgroundColor: '#fff',
                                            borderBottomLeftRadius: '4px',
                                            borderBottomRightRadius: '0',
                                            borderTopLeftRadius: '4px',
                                            borderTopRightRadius: '0',
                                            color: 'grey',
                                            fontSize: '100%',
                                            fontStyle: 'normal',
                                            width: '69%',
                                            lineHeight: 'normal',
                                            fontFamily: 'inherit',
                                            margin: '0',
                                        }}

                                    />
                                    <Button
                                        data-alert-type="email"
                                        type="button"
                                        style={{
                                            backgroundColor: 'rgb(128, 0, 25)',
                                            borderBottomWidth: '1px',
                                            borderColor: 'transparent',
                                            borderTopWidth: '3px',
                                            color: '#fff',
                                            fontSize: '90%',
                                            height: '57px',
                                            margin: '0',
                                            outline: 'none',
                                            padding: '4px',
                                            verticalAlign: 'top',
                                            borderBottomRightRadius: '4px',
                                            borderTopRightRadius: '4px',
                                        }}
                                    >
                                        send email
                                    </Button>
                                    <Box
                                        component='div'
                                        sx={{
                                            clear: 'both',
                                            marginTop: '5px',
                                            paddingLeft: '15px',
                                            paddingTop: '5px',
                                            textAlign: 'left',
                                        }}
                                    >
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        }
    }

    return (
        <Box sx={{flexGrow: 1, mt: 4}}>
            <Grid container spacing={2} columns={{xs: 8, sm: 16}} justifyContent="center">
                <Grid xs={12} sm={6} sx={{
                    border: '1px solid #e1e3e4',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF'
                }}>
                    <Box component="div" sx={{p: {xs: '20px', sm: '30px'}, textAlign: 'center'}}>
                        <CardMedia
                            component="img"
                            image={dto.image_url}
                            alt={dto.name}
                            sx={{objectFit: "contain"}}
                        />
                    </Box>
                </Grid>
                <Grid xs={12} sm={6} sx={{
                    border: '1px solid #e1e3e4',
                    borderRadius: '3px',
                    mt: {xs: 2, sm: 0},
                    marginLeft: {xs: 0, sm: 4},
                    backgroundColor: '#FFFFFF'
                }}>
                    <Box component="div" sx={{p: '30px'}}>
                        <Box sx={{margin: '-11px 0 5px'}}>
                            <Typography sx={{
                                mb: '14px',
                                fontSize: '27px',
                                lineHeight: '1.43',
                                marginTop: 0,
                                fontFamily: 'var(--heading-font-family), sans-serif',
                                fontWeight: 500,
                                fontStyle: 'normal',
                                color: '#800019'
                            }} variant="h1">{dto.name}</Typography>
                        </Box>
                        <Divider sx={{my: 3}}/>
                        <Box sx={{margin: '-11px 0 5px'}}>
                            <Typography variant="body1" sx={{
                                whiteSpace: 'pre-line',
                                mb: '14px',
                                fontSize: '15px',
                                lineHeight: '1.43',
                                marginTop: 0,
                                fontFamily: 'var(--heading-font-family), sans-serif',
                                fontWeight: 500,
                                fontStyle: 'normal',
                                color: '#800019'
                            }}>
                                {dto.description}
                            </Typography>
                        </Box>
                        <Divider sx={{my: 3}}/>
                        <Box sx={{
                            display: 'table',
                            width: '100%',
                            margin: '-22px 0 6px',
                            borderSpacing: '0 22px',
                        }} component='div'
                        >
                            <Box sx={{
                                display: 'table-row',
                                borderSpacing: '0 22px',
                            }} component='div'>
                                <Box
                                    component='span'
                                    sx={{
                                        display: 'table-cell',
                                        paddingRight: '12px',
                                        verticalAlign: 'baseline',
                                        whiteSpace: 'nowrap',
                                        color: '#800019',
                                        fontWeight: '500'
                                    }}
                                >
                                    售價:
                                </Box>
                                <Box
                                    component='div'
                                    sx={{
                                        display: 'table-cell',
                                        width: '100%',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'baseline',
                                            lineHeight: '1',
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: '25px',
                                                color: ' #800019'
                                            }}
                                        >
                                            HK${dto.price.toLocaleString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{display: 'table-row', borderSpacing: '0 22px'}}>
                                <Box
                                    component='span'
                                    sx={{
                                        display: 'table-cell',
                                        paddingRight: '12px',
                                        verticalAlign: 'baseline',
                                        whiteSpace: 'nowrap',
                                        color: '#800019',
                                        fontWeight: '500'
                                    }}
                                >
                                    貨存狀況:
                                </Box>
                                <Box component='div' sx={{display: 'table-cell', width: '100%'}}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            position: 'relative',
                                            fontSize: '1rem',
                                            display: 'block',
                                            paddingLeft: '1.4em',
                                            lineHeight: '1.2',
                                            color: dto.stock ? '#008a00' : '#800019',
                                            mt: '14px',
                                            '::before': {
                                                position: 'absolute',
                                                display: 'inline-block',
                                                content: '""',
                                                width: '8px',
                                                height: '8px',
                                                left: 0,
                                                top: '.45em',
                                                borderRadius: '100%',
                                                background: 'currentColor',
                                                mr: '14px',
                                            },
                                        }}
                                    >
                                        {dto.stock ? '有存貨' : '已售罄'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'table-row',
                            borderSpacing: '0 22px',
                        }} component='div'>
                            <Box
                                component='span'
                                sx={{
                                    display: 'table-cell',
                                    paddingRight: '12px',
                                    whiteSpace: 'nowrap',
                                    color: '#800019',
                                    fontWeight: '500',
                                    pt: '6px',
                                    verticalAlign: 'middle'
                                }}
                            >
                                數量:
                            </Box>
                            {renderAddToCart()}
                        </Box>
                        {renderButtonStock()}
                        <AddToCartSuccessSnackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen}/>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}