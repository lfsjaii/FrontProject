import NavList from "../../component/NavList";
import ProductDetailComponent from "./component/ProductDetailComponent.tsx";
import {useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/product/ProductDetailDto.ts";
import {useNavigate, useParams} from "react-router-dom";
import * as ProductApi from "../../../api/ProductApi.ts";
import ProductDetailSkeleton from "./component/ProductDetailSkeleton.tsx";

type Params = {
    productId: string;
}

export default function ProductDetail() {
    const [dto, setDto] = useState<ProductDetailDto | undefined>(undefined);
    const {productId} = useParams<Params>();

    const navigate = useNavigate();

    const fetchProducts = async (productId: string) => {
        try {
            const response = await ProductApi.getProductById(productId)
            document.title = `OIHub - ${response.name}`;
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
            <>
                <NavList/>
                {dto ? <ProductDetailComponent dto={dto}/> : <ProductDetailSkeleton/>}
            </>
        </>
    )
}

