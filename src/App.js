import React, { Component } from 'react';
import 'typeface-montserrat';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppContent from './front/components/AppContent';
import './css/flickr-js.scss';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Montserrat,Roboto,"Helvetica Neue",Arial,sans-serif'
    }
});

class App extends Component {
    render() {
        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit">
                                FlickrJS
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <AppContent/>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
