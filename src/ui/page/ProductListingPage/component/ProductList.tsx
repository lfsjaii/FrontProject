import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {GetAllProductDto} from "../../../../data/product/GetAllProductDto.ts";
import Product from "./Product.tsx";
import Typography from "@mui/material/Typography";

type Props = {
    data: GetAllProductDto[];
    search: string;
}

export default function ProductList({data, search}: Props) {
    const filteredData = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    return (
        <Box sx={{flexGrow: 1, m: 4}}>
            <Grid container spacing={{xs: 3, md: 3}}>
                {
                    filteredData && filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <Product data={item} key={item.pid}/>
                        ))
                    ) : (
                        <Typography variant="body1">找不到符合條件的產品。</Typography>
                    )
                }
            </Grid>
        </Box>
    )
}