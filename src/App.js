import React, { Component } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppContent from './front/components/AppContent';
import Store from './store';
import 'typeface-montserrat';
import './css/flickr-js.scss';

const StoreInstance = Store();

window.axios = axios.create();

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Montserrat,Roboto,"Helvetica Neue",Arial,sans-serif'
    }
});

class App extends Component {
    render() {
        return (
            <Provider store={StoreInstance}>
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
            </Provider>
        );
    }
}

export default App;
