import {Snackbar} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import Alert from "@mui/material/Alert";
import {Link} from "react-router-dom";

type Props = {
    snackbarOpen: boolean;
    setSnackbarOpen:  Dispatch<SetStateAction<boolean>>
}

export default function AddToCartSuccessSnackbar({snackbarOpen, setSnackbarOpen}: Props) {
    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={() => setSnackbarOpen(false)}
        >
            <Alert severity="success">
                已加入了!!!!<Link to={"/shoppingcart"}>go shoppingCart</Link>
            </Alert>
        </Snackbar>
    )
}