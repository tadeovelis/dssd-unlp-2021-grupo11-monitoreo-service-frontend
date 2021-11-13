import { Card, CardContent, Typography } from "@mui/material";


export default function CardMetrica(props) {

    const { title, color, valor } = props;

    return (
        <Card
            sx={{
                bgcolor: color,
                borderRadius: 3,
                maxWidth: '60%'
            }}>
            <CardContent>
                <Typography
                    variant="h7"
                    color="#ffffff"
                >
                    {title}
                </Typography>
                <Typography
                    variant="h4"
                    color="#ffffff"
                    sx={{ fontWeight: 700, my: 1 }}
                >
                    {valor}
                </Typography>
            </CardContent>
        </Card>
    )
}