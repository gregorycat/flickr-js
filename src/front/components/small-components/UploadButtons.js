import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class UploadButton extends Component {
    render = () => {
        return (
            <>
                {this.props.isFolderSelected ? (
                    <>
                        <Button
                            variant="contained"
                            onClick={this.props.uploadFolder}
                        >
                            Upload
                        </Button>
                        <TextField
                            id="name"
                            label="Name"
                            value={this.props.albumName}
                            onChange={this.props.handleAlbumNameChange}
                            margin="normal"
                        />
                        <h1>{this.props.nbSelectedFiles} files</h1>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        onClick={this.props.selectFolder}
                    >
                        Select a folder
                    </Button>
                )}
            </>
        );
    };
}

export default UploadButton;
