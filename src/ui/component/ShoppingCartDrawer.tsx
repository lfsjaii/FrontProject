import Drawer from "@mui/material/Drawer";
import {Dispatch, SetStateAction} from "react";
import Box from "@mui/material/Box";
import ShoppingCartDrawerItem from "./ShoppingCartDrawerItem.tsx";
import {Button, Container, Typography} from "@mui/material";
import './ShoppingCartDrawer.css';
import {Link} from "react-router-dom";


type Props = {
    drawerOpen: boolean;
    setDrawerOpen: Dispatch<SetStateAction<boolean>>
}

export default function ShoppingCartDrawer({drawerOpen, setDrawerOpen}: Props) {

    const toggleDrawer = (newOpen: boolean) => () => {
        setDrawerOpen(newOpen);
    };

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer(false)}
        >
            <Container>
                <Box sx={{width: 400}} role="presentation" onClick={toggleDrawer(false)}>
                    {
                        Array.from({length: 5}).map(() => (
                            <ShoppingCartDrawerItem/>
                        ))
                    }
                    <Box className="recapContainer">
                        <Box className="recapPriceLine">
                            <Typography variant="body1">合計</Typography>
                            <Typography variant="body1" className="money">
                                HK$3,040.00
                            </Typography>
                        </Box>
                        <Box className="buttonContainer">
                            <Box className="buttonGroup">

                                <Link to="/shoppingcart" style={{textDecoration: 'none'}}>
                                    <Button sx={{my: 2, color: 'white', display: 'block'}} variant="contained"
                                            color="primary">
                                        檢視購物車
                                    </Button>
                                </Link>
                                <Button sx={{my: 2, color: 'white', display: 'block'}} type="submit" name="checkout"
                                        variant="contained" color="primary"
                                        data-localpickup-hook="hooked">
                                    結算
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Drawer>

    )
}