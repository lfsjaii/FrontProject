import {GetAllProductDto} from "../data/product/GetAllProductDto.ts";
import axios from "axios";
import {ProductDetailDto} from "../data/product/ProductDetailDto.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

export async function getAllProducts() {
    try {
        const response = await axios.get<GetAllProductDto[]>(`${baseUrl}/public/product`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getProductById(productId: string) {
    try {
        const response = await axios.get<ProductDetailDto>(`${baseUrl}/public/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

