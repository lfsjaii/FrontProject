import {ProductDetailDto} from "../product/ProductDetailDto.ts";

export interface TransactionDto {
    tid:       number;
    dateTime:  string;
    status:    string;
    total:     number;
    buyer_uid: number;
    items:     TransactionProductDto[];
}

export interface TransactionProductDto {
    tpid:     number;
    product:  ProductDetailDto;
    quantity: number;
    subtotal: number;
}
