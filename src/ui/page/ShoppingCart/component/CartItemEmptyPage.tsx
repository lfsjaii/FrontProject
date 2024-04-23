import {Button, Container} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";

export default function CartItemEmptyPage() {
    return (
        <Box>
            <Container>
                <Box
                    component="div"
                    sx={{
                        margin: '100px 0',
                        textAlign: 'center',
                        '@media screen and (min-width: 641px)': {
                            margin: '170px 0',
                        },
                    }}
                >
                    <Box component="div"
                        sx={{
                            position: 'relative',
                            display: 'inline-block',
                            marginBottom: '6px',
                        }}
                    >
                        <svg
                            focusable="false"
                            width="81"
                            height="70"
                            viewBox="0 0 81 70"
                        >
                            <g
                                transform="translate(0 2)"
                                strokeWidth="4"
                                stroke="#800019"
                                fill="none"
                                fillRule="evenodd"
                            >
                                <circle
                                    strokeLinecap="square"
                                    cx="34"
                                    cy="60"
                                    r="6"
                                ></circle>
                                <circle
                                    strokeLinecap="square"
                                    cx="67"
                                    cy="60"
                                    r="6"
                                ></circle>
                                <path
                                    d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"
                                ></path>
                            </g>
                        </svg>
                    </Box>
                    <Typography
                        component="p"
                        sx={{
                            marginBottom: '15px',
                            fontSize: '27px',
                            lineHeight: 1.43,
                            fontWeight: 500,
                            color: '#800019',
                        }}
                    >
                        Your cart is empty
                    </Typography>
                    <Box component="div" sx={{mt: '16px'}}>
                        <Button
                            variant="contained"
                            sx={{
                                minWidth: '230px',
                                background: '#800019',
                                color: '#ffffff',
                                '&:hover': {
                                    background: '#800019',
                                    color: '#fffff',
                                },
                            }}
                            component={Link}
                            to="/"
                        >
                            Shop our products
                        </Button>

                    </Box>
                </Box>
            </Container>
        </Box>
    )
}