import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// Or Create your Own theme:
const theme = createTheme({
  palette: {
    primary: {
      /* verde
      main: "#4ebc58",
      contrastText: '#ffffff'
      */
      main: "#2e1e51",
      contrastText: '#ffffff'
    },
    secondary: {
      //main: "#6783FF"
      main: '#4378d4'
    },
    white: {
      main: '#ffffff',
      contrastText: '#2e1e51'
    },

  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard'
      }
    }

  }

});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);