import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {GetAllProductDto} from "../../../../data/product/GetAllProductDto.ts";
import Product from "./Product.tsx";

type Props = {
    data: GetAllProductDto[];
    isLoading: boolean;
}

export default function ProductList({data, isLoading}: Props) {
    return (
        <Box sx={{flexGrow: 1, m: 4}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 4, md: 12}}>
                {
                    data && (
                        data.map((index) => (
                            <Product data={index} key={index.pid} isLoading={isLoading}/>
                        )))
                }
            </Grid>
        </Box>
    )
}