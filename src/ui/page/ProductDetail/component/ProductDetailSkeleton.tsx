import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import {Skeleton} from '@mui/material';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";


export default function ProductDetailSkeleton() {
    return (
        <Box sx={{flexGrow: 1, mt: 10}}>
            <Grid container spacing={2} columns={{xs: 8, sm: 16}} justifyContent="center">
                <Grid xs={12} sm={6} sx={{
                    border: '1px solid #e1e3e4',
                    borderRadius: '3px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'column'
                }}>
                    <Box component="div" sx={{p: {xs: '20px', sm: '30px'}, textAlign: 'center'}}>
                        <Skeleton variant="rectangular" width={500} height={500} animation="wave" />
                    </Box>
                </Grid>
                <Grid xs={12} sm={6} sx={{
                    border: '1px solid #e1e3e4',
                    borderRadius: '3px',
                    mt: {xs: 2, sm: 0},
                    marginLeft: {xs: 0, sm: 4},
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'column'
                }}>
                    <Box component="div" sx={{p: '30px'}}>
                        <Box sx={{margin: '-11px 0 5px'}}>
                            <Typography variant="h1">
                                <Skeleton variant="text" width={450} animation="wave" />
                            </Typography>
                        </Box>
                        <Divider sx={{my: 3}}/>
                        <Box sx={{
                            display: 'table',
                            width: '100%',
                            margin: '-22px 0 6px',
                            borderSpacing: '0 22px',
                        }} component='div'
                        >
                            <Box sx={{
                                display: 'table-row',
                                borderSpacing: '0 22px',
                            }} component='div'>
                                <Box
                                    component='span'
                                    sx={{
                                        display: 'table-cell',
                                        paddingRight: '12px',
                                        verticalAlign: 'baseline',
                                        whiteSpace: 'nowrap',
                                        color: '#800019',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Skeleton variant="text" width={50} height={50} animation="wave" />
                                </Box>
                                <Box
                                    component='div'
                                    sx={{
                                        display: 'table-cell',
                                        width: '100%',
                                    }}
                                >
                                    <Box
                                        component='div'
                                        sx={{
                                            display: 'inline-flex',
                                            alignItems: 'baseline',
                                            lineHeight: '1',
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: '25px',
                                                color: ' #800019'
                                            }}
                                        >
                                            <Skeleton variant="text" width={200} height={80} animation="wave"/>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{display: 'table-row', borderSpacing: '0 22px'}}>
                                <Box
                                    component='span'
                                    sx={{
                                        display: 'table-cell',
                                        paddingRight: '12px',
                                        verticalAlign: 'baseline',
                                        whiteSpace: 'nowrap',
                                        color: '#800019',
                                        fontWeight: '500'
                                    }}
                                >
                                    <Skeleton variant="text" width={50} height={50} animation="wave" />
                                </Box>
                                <Box component='div' sx={{display: 'table-cell', width: '100%'}}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            position: 'relative',
                                            fontSize: '1rem',
                                            display: 'block',
                                            paddingLeft: '1.4em',
                                            lineHeight: '1.2',
                                            mt: '14px',
                                        }}
                                    >
                                        <Skeleton variant="text" width={200} height={80} animation="wave"/>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'table-row',
                            borderSpacing: '0 22px',
                        }} component='div'>
                            <Box
                                component='span'
                                sx={{
                                    display: 'table-cell',
                                    paddingRight: '12px',
                                    whiteSpace: 'nowrap',
                                    color: '#800019',
                                    fontWeight: '500',
                                    pt: '6px',
                                    verticalAlign: 'middle'
                                }}
                            >
                                <Skeleton variant="text"  width={50} height={50} animation="wave"/>
                            </Box>
                            <Box component='div'
                                 sx={{display: 'table-cell', width: '100%', pt: '6px', verticalAlign: 'middle'}}>
                                <Skeleton variant="rectangular" width={150} height={36} animation="wave"/>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            mt: '20px'
                        }}>
                            <Skeleton variant="rectangular" width={200} height={36} animation="wave" />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}