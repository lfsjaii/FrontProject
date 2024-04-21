import {Box, Stack} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";


type Props = {
    quantity: number;
    handleMinus: () => void;
    handlePlus: () => void;
}

export default function QuantitySelector({quantity, handleMinus, handlePlus}: Props) {
    return (
        <Stack direction="row" alignItems="center">
            <Box>
                <IconButton color="error" onClick={handleMinus} size="small" sx={{boxShadow:2,}}>
                    <RemoveIcon sx={{ fill: 'currentColor' }}/>
                </IconButton>
            </Box>
            <Box sx={{
                minWidth: "32px",
                minHeight: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Typography>
                    {quantity}
                </Typography>
            </Box>
            <Box>
                <IconButton color="success" sx={{boxShadow:2,}} onClick={handlePlus} size="small">
                    <AddIcon sx={{ fill: 'currentColor' }}/>
                </IconButton>
            </Box>
        </Stack>
    )
}