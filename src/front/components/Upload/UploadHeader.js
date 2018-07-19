import React, { Component } from "react";

class UploadHeader extends Component {
    render() {
        return (
            <div class="upload-card__header">
                <div>
                    <div>Upload your files</div>
                    <div className="upload-card-header__primary">
                        Choose a folder to upload
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadHeader;
