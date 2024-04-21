import NavList from "../../component/NavList";
import ProductDetailComponent from "./component/ProductDetailComponent.tsx";
import {Container} from "@mui/material";
import {useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/product/ProductDetailDto.ts";
import {useNavigate, useParams} from "react-router-dom";
import * as ProductApi from "../../../api/ProductApi.ts";
import LoadingContainer from "../ProductListingPage/component/LoadingContainer.tsx";

type Params = {
    productId: string;
}

export default function ProductDetail() {
    const [dto, setDto] = useState<ProductDetailDto | undefined>(undefined);
    const {productId} = useParams<Params>();
    const navigate = useNavigate();

    const fetchProducts = async ( productId: string) => {
        try {
            const response = await ProductApi.getProductById(productId)
            setDto(response);
        } catch (error) {
            navigate("/error");
        }
    }


    useEffect(() => {
        if (productId) {
            fetchProducts(productId);
        } else {
            navigate("/error")
        }
    }, [])

    return (
        <>
            <NavList/>
            <Container>
                {dto ? <ProductDetailComponent dto={dto}/> : <LoadingContainer/>}
            </Container>
        </>
    )
}

