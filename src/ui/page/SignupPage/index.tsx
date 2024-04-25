import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, useNavigate} from 'react-router-dom';
import NavList from "../../component/NavList";
import {ChangeEvent, FormEvent, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"



export default function SignupPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [emailError, setEmailError] = useState("");


    const navigate = useNavigate();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
        setEmailError("");
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
        } else {
            setPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newPassword = event.target.value;
        setConfirmPassword(newPassword);

        if (newPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };



    const handleSignup = async (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }
        if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
            return;
        }
        const signupResult = await FirebaseAuthService.handleSignupWithEmailAndPassword(email, password)
        if (signupResult) {
            navigate("/login");
        } else {
            setEmailError("Someone has already used this email");
        }
    }



    return (
        <Container component="main" maxWidth="xs">
            <NavList/>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 25,
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
                    Create my account
                </Typography>
                <Typography
                    sx={{
                        color: '#800019',
                        mb: '15px',
                        fontSize: '14px',
                        lineHeight: '26.18px'
                    }}
                >
                    Please fill in the information below:
                </Typography>
                <Box component="form" noValidate onSubmit={handleSignup} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={handleEmailChange}
                                error={Boolean(emailError)}
                                helperText={emailError}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                error={!!passwordError}
                                helperText={passwordError}
                                onChange={handlePasswordChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                value={confirmPassword}
                                error={!!confirmPasswordError}
                                helperText={confirmPasswordError}
                                onChange={handleConfirmPasswordChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ height: 50, mt: 3, backgroundColor: "#800019", "&:hover": { backgroundColor: "#800019" }}}
                    >
                        Create my account
                    </Button>
                    <Grid container justifyContent="center" sx={{mt: 3}}>
                        <Grid item>
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
                                Already have an account?
                                <Link
                                    to="/login"
                                    style={{
                                        marginLeft: 3,
                                        color: 'rgb(128, 0, 25)',
                                    }}
                                >
                                    Login here
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}