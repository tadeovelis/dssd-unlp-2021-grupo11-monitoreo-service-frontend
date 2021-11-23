import { Box } from "@mui/system";
import { Footer } from "./Footer";
import Header from "./Header";

import ImageBackground from '../assets/img/background-home.jpg';

export default function GeneralContainer(props) {


    return (
        <>
            {/* Header */}
            <Header location={props.location} />
            {/* Box general */}
            <Box
                sx={{
                    display: 'flex',
                    p: 5,
                    minHeight: '74vh',
                    bgcolor: 'lightgray',
                    justifyContent: 'center',
                    backgroundImage: `url(${ImageBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: 'inset 0 0 200px 30px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                    {props.componente}
                </Box>
            </Box>
            {/* Footer */}
            <Footer />
        </>
    )
}