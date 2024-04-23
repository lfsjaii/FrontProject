import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import {GetAllProductDto} from "../../../../data/product/GetAllProductDto.ts";
import ProductSkeleton from "./ProductSkeleton.tsx";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faCartShopping} from "@fortawesome/free-solid-svg-icons";

type Props = {
    data: GetAllProductDto;
    isLoading: boolean;
}


export default function Product({data, isLoading}: Props) {
    const navigate = useNavigate();


    return (
        <Grid sm={4} md={3} key={data.pid} justifyContent="center" alignItems="center">
            {isLoading ? ( <ProductSkeleton/> ) : (
            <Card sx={{maxWidth: 420}}>
                <CardActionArea onClick={() => {
                    navigate(`/product/${data.pid}`)
                }}>
                    <CardMedia
                        component="img"
                        height="240"
                        image={data.image_url}
                        alt={data.name}
                        sx={{objectFit: "contain"}}
                    />
                    <CardContent>
                        <Typography gutterBottom component="div" height="5rem"
                                    sx={{fontSize: '14px', mb: '12px', color: '#800019', fontWeight: '500'}}>
                            {data.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" pt={3}
                                    sx={{fontSize: '20px', color: '#800019'}}>
                            {`HK$${data.price.toLocaleString()}`}
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                position: 'relative',
                                display: 'block',
                                paddingLeft: '1.4em',
                                lineHeight: '1.2',
                                color: data.has_stock ? '#008a00' : '#800019',
                                mt: '14px',
                                fontSize: '12px',
                                '::before': {
                                    position: 'absolute',
                                    display: 'inline-block',
                                    content: '""',
                                    width: '8px',
                                    height: '8px',
                                    left: 0,
                                    top: '.45em',
                                    borderRadius: '100%',
                                    background: 'currentColor',
                                },
                            }}
                        >
                            {data.has_stock ? '有存貨' : '已售罄'}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            )}
            {/*<CardActions>*/}
            {/*    <Button*/}
            {/*        className="btn btn--primary w-full"*/}
            {/*        variant="contained"*/}
            {/*        color="primary"*/}
            {/*        aria-haspopup="dialog"*/}
            {/*    >*/}
            {/*        <FontAwesomeIcon icon={faCartShopping} bounce size="xl" />*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Grid>
    )
}