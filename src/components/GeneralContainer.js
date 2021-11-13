import { Box } from "@mui/system";


export default function GeneralContainer(props) {


    return (
        <>
            {/* Header */}

            {/* Box general */}
            <Box
                sx={{
                    display: 'flex',
                    p: 5,
                    minHeight: '1vh',
                    bgcolor: 'lightgray',
                    justifyContent: 'center'
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

        </>
    )
}