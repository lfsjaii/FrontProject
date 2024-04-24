import NavList from "../../component/NavList";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ThankYou() {
    const [second, setSecond] = useState<number>(5);
    const navigate = useNavigate();

    const handleCountDown = () => {
        setSecond((prevState) => (
            prevState - 1
        ))
    }

    useEffect(() => {
        const countDown = setTimeout(handleCountDown, 1000)

        if(second <= 0) {
            navigate("/");
        }
        return (() => {
            clearTimeout(countDown);
        })
    }, [second]);
    return (
        <>
            <NavList/>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{height: '85vh'}}>
                <Box>
                    <Typography variant="h5">
                        在{second}秒回到主頁!
                    </Typography>
                </Box>
                <img src="https://i.giphy.com/lE2bgeir5KNj43q2Ne.webp"/>
            </Box>
        </>
    )
}