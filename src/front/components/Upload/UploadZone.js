import React, { Component } from "react";
import logo from "../../../assets/logo-upload.png";
import FileBlock from "./FileBlock";

class UploadZone extends Component {
    displayFiles(files) {
        let fileBlock = [];
        let fileList = [];

        for (let i = 0; i < files.length; i++) {
            fileBlock.push(<FileBlock file={files[i]} />);
        }

        fileList.push(<div className="file-block__wrapper">{fileBlock}</div>);

        return fileList;
    }

    render() {
        return (
            <div className="upload-card-content__block">
                {this.props.selectedFiles === undefined ||
                this.props.selectedFiles.length === 0 ? (
                    <div className="upload-card-content__block-content upload-content--empty">
                        <div className="upload-card-content__block-logo">
                            <img src={logo} alt="cloud-logo" />
                        </div>
                        <div className="upload-card-content__block-info">
                            <input
                                type="file"
                                id="folder-upload"
                                ref="fileUploader"
                                webkitdirectory=""
                                multiple=""
                                onChange={this.props.onFileChange}
                                style={{ display: "none" }}
                            />
                            Drag your files here or{" "}
                            <a onClick={this.props.selectFolder}>browse</a>
                        </div>
                    </div>
                ) : (
                    <div className="upload-card-content__block-content upload-content--full">
                        {this.displayFiles(this.props.selectedFiles)}
                    </div>
                )}
            </div>
        );
    }
}

export default UploadZone;
