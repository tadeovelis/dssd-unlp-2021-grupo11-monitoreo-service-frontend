import { React, Component } from 'react';

import { Box, AppBar, Typography, Slide, useScrollTrigger } from '@mui/material';
import Logout from './Logout';
import { estoyEnDashboard } from '../helpers/helpers';


function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default class Header extends Component {

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <HideOnScroll {...this.props}>
                    {/* Sacar position para que tome la función de hideonscroll, pero tapa el fondo */}
                    <AppBar position="relative">
                        <Box sx={{ display: 'flex', p: 2, alignItems: 'center' }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ fontWeight: 800 }}>Dirección Nacional de Personas Jurídicas</Typography>
                            </Box>
                            {estoyEnDashboard(this.props.location.pathname) &&
                                <Box>
                                    <Logout />
                                </Box>
                            }
                        </Box>
                    </AppBar>
                </HideOnScroll>
            </Box>
        )

    }
}
