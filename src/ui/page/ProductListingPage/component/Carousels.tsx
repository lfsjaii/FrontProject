import {Paper, IconButton} from '@mui/material';
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import {useEffect, useState} from "react";

const images = [
    'https://funshopoutdoor.com.hk/cdn/shop/files/nemo_s24_tent_1200_x_480_px.png?v=1710818109&width=1200',
    'https://funshopoutdoor.com.hk/cdn/shop/files/Nemo_Duffel_1200_x_480_px.png?v=1710472686&width=1200',
    'https://funshopoutdoor.com.hk/cdn/shop/files/MHW_-_new_hat_1200_x_480_px_4d20ffa2-cc15-4273-812f-34b5ff07706b.png?v=1712296731&width=1200',
];

export default function Carousels() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <Paper elevation={3} sx={{position: 'relative'}}>
            <IconButton onClick={handlePrev} sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1
            }}><ArrowBack/></IconButton>
            <img src={images[index]} alt={`Image ${index + 1}`} style={{width: '100%', height: 'auto', display: 'block',maxWidth: '100vw', maxHeight: '100vh'}}/>
            <IconButton onClick={handleNext} sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 1
            }}><ArrowForward/></IconButton>
        </Paper>

    )
}