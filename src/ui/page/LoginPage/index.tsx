import NavList from "../../component/NavList";
import {
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput, Paper,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {Link, useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import Divider from "@mui/material/Divider";
import {GoogleLoginButton} from "react-social-login-buttons";
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from "react";
import Typography from "@mui/material/Typography";


export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginFailed, setLoginFailed] = useState<boolean>(false);

    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password)
        if (loginResult) {
            navigate(-1);
        } else {
            setLoginFailed(true);
        }
    }

    const handleGoogleSignIn = async () => {
        if (await FirebaseAuthService.handleSignInWithGoogle()) {
            navigate(-1);
        }
    }

    useEffect(() => {
        if (loginUser) {
            navigate('/');
        }
    }, [loginUser])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <NavList/>
            <Grid container component="main" sx={{height: '93vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 27,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: '#800019',
                                mb: '15px',
                                fontWeight: 500,
                                fontSize: '27px',
                                lineHeight: '38.51px'
                            }}
                        >
                            Login to my account
                        </Typography>
                        <Typography
                            sx={{
                                color: '#800019',
                                mb: '15px',
                                fontSize: '14px',
                                lineHeight: '26.18px'
                            }}
                        >
                            Enter your e-mail and password:
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLogin} sx={{mt: 1}}>
                            {isLoginFailed && <Alert severity="error" sx={{mb: 2}}>Incorrect email or password.</Alert>}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                variant="outlined"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                onChange={handleEmailChange}
                            />
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>
                            <Button type="submit" variant="contained" fullWidth  sx={{ height: 50, mt: 3, backgroundColor: "#800019", "&:hover": { backgroundColor: "#800019" } }}>Login</Button>
                            <Divider sx={{my: 3}}/>
                            <GoogleLoginButton style={{width: '100%', margin: 0}} onClick={handleGoogleSignIn}/>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 400,
                                    lineHeight: "22.44px",
                                    textAlign: "center",
                                    color: "rgb(128, 0, 25)",
                                    mt: 2,
                                }}
                            >
                                New customer?
                                <Link
                                    to="/register"
                                    style={{
                                        marginLeft: 3,
                                        color: 'rgb(128, 0, 25)',
                                    }}
                                >
                                    Create your account
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}