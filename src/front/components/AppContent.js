import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/flickr-upload";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

/**
 * TODO :
 *  - Separate components
 *  - Manage file selection
 *  - Display selected images
 *  - Send files to server (add a button & implement redux logic)
 *  - Get callback information
 *  - Get upload status
 *  - Provide a field to define folder name
 *  - Provide fields to edit phot name (in Flickr)
 *
 * In top container :
 *  - Get albums from flickr
 *  - Get loged user info
 *  - Maybe last uploaded pics
 * 
 */
class AppContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        };
    }

    /**
     * Open the file selector dialog.
     */
    selectFolder = () => {
        this.refs.fileUploader.click();
    };

    /**
     * Intercept changes in file input field.
     */
    onFileChange = event => {
		/**
		 * TODO Filter files to keep only images (png / jpg / jpeg / tiff / exif / gif / bmp )
		 * and video (avi / flv / wmv / mov / mp4)
		 */
        this.setState({ files: event.target.files });
    };

    render() {
        return (
            <div className="content">
                <Card>
                    <CardContent className="flickr-uploader">
                        <div className="flickr-upload__top" />
                        <div className="flickr-upload__actions">
                            <div className="flick-uplad-action__add-folder">
                                <input
                                    type="file"
                                    id="file"
                                    ref="fileUploader"
                                    webkitdirectory=""
                                    multiple=""
                                    onChange={this.onFileChange}
                                    style={{ display: "none" }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={this.selectFolder}
                                >
                                    Select a folder
                                </Button>
                                {this.state.files.length > 0 ? (
                                    <h1>{this.state.files.length} files</h1>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    actions
)(AppContent);
