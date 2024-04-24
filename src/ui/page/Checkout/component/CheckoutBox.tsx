import {Backdrop, Button, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as TransactionApi from "../../../../api/TransactionApi.ts"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
    total: number
    tid: string
}


export default function CheckoutBox({total, tid}: Props) {
    const navigate = useNavigate();
    const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);

    const handleCheckout = async () => {
        try {
            setIsBackdropOpen(true);
            await TransactionApi.finishTransaction(tid);
            navigate("/thankyou");
        } catch (error) {
            navigate("/error");
            throw error;
        }
    }
    return (
        <Stack direction="row" justifyContent="space-between" my={3}>
            <Box>
                <Typography variant="h4">
                    Total: ${total.toLocaleString()}
                </Typography>
            </Box>
            <Box>
                <Button variant="contained" color="success" onClick={handleCheckout}>
                    <Typography variant="h4">
                        磅水啦!!!!
                    </Typography>
                </Button>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Stack>
    )
}