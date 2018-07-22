import React, { Component, Fragment } from "react";
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';

class AlbumCreationDialog extends Component {
    state = {
        albumName: ''
    }

    handleClose = () => {
        this.props.onClose();
    };

    handleOk = () => {
        this.props.onClose(this.state.albumName);
    };

    handleChange = (event) => {
        this.setState({
            albumName: event.target.value,
        });
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
            >
                <DialogTitle id="confirmation-dialog-title">New Album</DialogTitle>
                <DialogContent>
                <TextField
                    id="name"
                    label="Album name"
                    value={this.state.albumName}
                    onChange={this.handleChange}
                    margin="normal"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AlbumCreationDialog;
