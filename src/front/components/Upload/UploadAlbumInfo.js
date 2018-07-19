import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class UploadAlbumInfo extends Component {
    render() {
        return (
            <div className="upload-card-content__info">
                <div className="upload-card-content-info__title">
                    Albums & Files infos
                </div>

                {this.props.selectedFiles !== undefined &&
                this.props.selectedFiles.length > 0 ? (
                    <div className="upload-card-info__files-info">
                        <div className="file-info__files-counter">
                            {this.props.selectedFiles.length} files to upload
                        </div>
                        <div className="file-info__files-download">
                            <Button
                                variant="outlined"
                                color="primary"
                            >
                                Upload
                            </Button>
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div className="upload-card-info__album-wrapper">
                    <div className="upload-card-info-album-block" />
                </div>
            </div>
        );
    }
}

export default UploadAlbumInfo;
