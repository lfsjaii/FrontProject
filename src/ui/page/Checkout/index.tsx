import CheckoutTable from "./component/CheckoutTable.tsx";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/material";
import CheckoutBox from "./component/CheckoutBox.tsx";
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/transaction/TransactionDto.ts";
import LoadingContainer from "../ProductListingPage/component/LoadingContainer.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";


type Params = {
    transactionId: string
}


export default function Checkout() {
    const params = useParams<Params>();
    const loginUser = useContext<UserData | undefined | null>(LoginUserContext);
    const navigate = useNavigate();

    const [dto, setDto] = useState<TransactionDto | undefined>(undefined);

    const fetchTransactionDto = async (tid: string) => {
        try {
            const responseDto = await TransactionApi.getTransactionByTid(tid);
            setDto(responseDto);
        } catch (error) {
            navigate("/error");
            throw error;
        }
    }

    useEffect(() => {
        if (params.transactionId && loginUser) {
            fetchTransactionDto(params.transactionId);
        }
    }, [loginUser]);


    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>
            {
                ( dto && params.transactionId)
                    ?
                    <>
                        <CheckoutTable dto={dto}/>
                        <CheckoutBox total={dto.total} tid={params.transactionId}/>
                    </>
                    : <LoadingContainer/>
            }
        </Container>
    )
}