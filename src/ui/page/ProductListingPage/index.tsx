import NavList from "../../component/NavList";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {GetAllProductDto} from "../../../data/product/GetAllProductDto.ts";
import ProductList from "./component/ProductList.tsx";
import * as ProductApi from "../../../api/ProductApi.ts";
import {useNavigate} from "react-router-dom";
import Carousels from "./component/Carousels.tsx";
// import LoadingContainer from "./component/LoadingContainer.tsx";
// import Carousels from "./component/Carousels.tsx";


export default function ProductListingPage() {
    const [productListDto, setProductListDto] = useState<GetAllProductDto[] | undefined>(undefined);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>("");




    const fetchAllProducts = async () => {
        try {
            setProductListDto(undefined);
            const ProductListingPage = await ProductApi.getAllProducts();
            setProductListDto(ProductListingPage);
        } catch (error) {
            navigate("/error");
        }
    }
    useEffect(() => {
        fetchAllProducts();
        document.title = "OIHub"
    }, [])

    return (
        <>
            <NavList search={search} setSearch={setSearch} />
                {productListDto && (
                    <Container>
                        <Carousels />
                        <ProductList data={productListDto}  search={search}/>
                    </Container>
                )}
        </>
    )
}