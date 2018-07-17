import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import UploadButton from "./small-components/UploadButtons";
import { connect } from "react-redux";
import * as actions from "../actions/flickr-upload";

/**
 *
 */
class FlickrBottom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albumName: "",
            files: []
        };
    }

    handleAlbumNameChange = event => {
        this.setState({ albumName: event.target.value });
    };

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

    uploadFolder = () => {
        let params = {
            albumName: this.state.albumName,
            files: this.state.files
        };

        this.props.uploadFiles(params);
    };

    render = () => {
        return (
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
                    <UploadButton
                        handleAlbumNameChange={this.handleAlbumNameChange.bind(
                            this
                        )}
                        albumName={this.state.albumName}
                        uploadFolder={this.uploadFolder.bind(this)}
                        nbSelectedFiles={this.state.files.length}
                        isFolderSelected={this.state.files.length > 0}
                        selectFolder={this.selectFolder.bind(this)}
                    />
                </div>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
    actions
)(FlickrBottom);
