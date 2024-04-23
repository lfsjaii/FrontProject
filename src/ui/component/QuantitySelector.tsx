import {Box} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";


type Props = {
    quantity: number;
    handleMinus: () => void;
    handlePlus: () => void;
    disabled?: boolean;
    isLoading?: boolean;
}

export default function QuantitySelector({quantity, handleMinus, handlePlus ,disabled,isLoading = false}: Props) {
    return (
        <Box sx={{
            height: '44px',
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '14px',
            border: '1px solid #e1e3e4',
            borderRadius: '3px',
            boxShadow: '0 1px 1px rgba(225, 227, 228, 0.2)',
            verticalAlign: 'middle',
            borderSpacing: '0 22px'
        }}>
            <IconButton
                onClick={handleMinus}
                sx={{
                    padding: '0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(128, 0, 25, 0.6)',
                    height: '100%',
                    transition: 'color 0.2s ease-in-out',
                    touchAction: 'manipulation',
                    overflow: 'visible',
                    background: 'none',
                    border: 'none',
                    borderRadius: 0,
                    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.2)'
                }}
                disabled = {disabled || isLoading}

            >
                <RemoveIcon sx={{fill: 'currentColor'}}/>
            </IconButton>
            <Box sx={{
                height: '100%',
                minWidth: '64px',
                borderLeft: '1px solid #e1e3e4',
                borderRight: '1px solid #e1e3e4',
                boxShadow: '0 1px rgba(225, 227, 228, .4) inset',
                color: '#800019',
                appearance: 'none',
                padding: '0 5px',
                textAlign: 'center',
                border: 'none',
                background: 'transparent',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                {
                    isLoading
                    ? <CircularProgress size="1.5rem"/> : <Typography sx={{ color: disabled ? 'text.disabled' : 'text.primary' }}>
                            {quantity}
                        </Typography>
                }
            </Box>
            <IconButton
                onClick={handlePlus}
                sx={{
                    boxShadow: 2,
                    padding: '0 12px',
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(128, 0, 25, .6)',
                    height: '100%',
                    transition: 'color .2s ease-in-out',
                    touchAction: 'manipulation',
                    overflow: 'visible',
                    background: 'none',
                    border: 'none',
                    borderRadius: 0
                }}
                disabled = {disabled || isLoading}
            >
                <AddIcon sx={{fill: 'currentColor'}}/>
            </IconButton>
        </Box>
    )
}