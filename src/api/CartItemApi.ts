import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts"
import axios from "axios";
import {GetUserCartItemDto} from "../data/cartItem/GetUserCartItemDto.ts";


const baseUrl = 'http://localhost:8080';

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken();

    if (!accessToken) {
        throw new Error();
    }

    return{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }
}



export async function putCartItem(pid: number, quantity: number) {
    try {
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        )
    }catch(error) {
        console.error(error);
        throw error;
    }
}

export async function getUserCartItem():Promise<GetUserCartItemDto[]> {
    try {

         const response = await axios.get<GetUserCartItemDto[]>(
            `${baseUrl}/cart`,
            await getAuthConfig()
        )
        return response.data;
    }catch(error) {
        console.error(error);
        throw error;
    }
}

export async function patchCartItemQuantity(pid: number, quantity: number) {
    try {
        const response = await axios.patch<GetUserCartItemDto>(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        )
        return response.data;
    }catch(error) {
        console.error(error);
        throw error;
    }
}

export async function deleteCartItem(pid:number) {

    try {
        await axios.delete(
            `${baseUrl}/cart/${pid}`,
            await getAuthConfig()
        )
    } catch (error) {
        console.error(error);
        throw error;
    }

}