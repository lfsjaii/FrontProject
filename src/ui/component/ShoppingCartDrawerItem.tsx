import {Typography, Grid, Button} from '@mui/material';
import './ShoppingCartDrawer.css';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";


export default function ShoppingCartDrawerItem() {
    return (
        <Box className="mini-cart__line-item">
            <Grid container spacing={2}>
                <Grid item xs={4} sm={3}>
                    <Box className="imageWrapper">
                        <img
                            className="image"
                            src="https://funshopoutdoor.com.hk/cdn/shop/files/T5-47-TN15_585633ff-6787-43c7-b8c7-f3e6368ebe1a.png?v=1711077928&width=1214"
                            alt="[連營底墊] DOD ONE POLE TENT (M) 五人金仔露營帳篷 T5-47-BK / T5-47-TN 連營底墊"
                        />
                    </Box>
                </Grid>
                <Grid item xs={8} sm={6}>
                    <Typography variant="subtitle1" className="productTitle" component="div" sx={{mb: 2}}>
                        [連營底墊] DOD ONE POLE TENT (M) 五人金仔露營帳篷 T5-47-BK / T5-47-TN 連營底墊
                    </Typography>
                    <Typography variant="body1" className="price" component="div" color="text.secondary">
                        HK$3,040.00
                    </Typography>
                    <Typography variant="body1" className="price" component="div" color="text.secondary">
                        quantity: 10
                    </Typography>
                </Grid>
                <Grid item xs={8} sm={3}>
                    <Box className="mini-cart__quantity">
                        <Box className="quantity-selector">
                            <Button className="quantity-selector__button" variant="contained" color="primary"
                                    size="small" aria-label="減少數量" title="減少數量">
                                -
                            </Button>
                            <input aria-label="數量" className="quantity-selector__value" inputMode="numeric"
                                   data-current-value="1" data-line="1" value="1"/>
                            <Button className="quantity-selector__button" variant="contained" color="primary"
                                    size="small" aria-label="增加數量" title="增加數量">
                                +
                            </Button>
                        </Box>
                        <a href="/cart/change?quantity=0&amp;line=1" className="mini-cart__quantity-remove link"
                           data-action="decrease-quantity" data-quantity="0" data-line="1">
                            移除貨品
                        </a>
                    </Box>
                </Grid>
                <Divider sx={{my: 2}}/>
            </Grid>
        </Box>

    )
}

{/*<Box>*/
}
{/*    <img*/
}
{/*        src="https://funshopoutdoor.com.hk/cdn/shop/files/T5-47-TN15_585633ff-6787-43c7-b8c7-f3e6368ebe1a.png?v=1711077928&width=1214"*/
}
{/*        width={250}*/
}
{/*    />*/
}
{/*</Box>*/
}