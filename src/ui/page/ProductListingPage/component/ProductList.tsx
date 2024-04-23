import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {GetAllProductDto} from "../../../../data/product/GetAllProductDto.ts";
import Product from "./Product.tsx";

type Props = {
    data: GetAllProductDto[];
    isLoading: boolean;
    search: string;
}

export default function ProductList({data,isLoading, search}: Props) {
    const filteredData = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <Box sx={{flexGrow: 1, m: 4}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 4, md: 12}}>
                {
                    filteredData.map((index) => (
                        <Product data={index} key={index.pid} isLoading={isLoading} />
                    ))
                }
            </Grid>
        </Box>
    )
}