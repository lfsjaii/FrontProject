import { Card, CardContent, Skeleton} from '@mui/material';

export default function Test() {
    return (
        <Card sx={{maxWidth: 420}}>
            <Skeleton variant="rectangular" width={420} height={240}/>
            <CardContent>
                <Skeleton variant="text" width={200} height={20}/>
                <Skeleton variant="text" width={100} height={20}/>
                <Skeleton variant="text" width={100} height={20}/>
            </CardContent>
        </Card>

    )
}