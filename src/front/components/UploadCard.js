import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import UploadHeader from "./Upload/UploadHeader";
import UploadZone from "./Upload/UploadZone";
import UploadAlbumInfo from "./Upload/UploadAlbumInfo";

class UploadCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albumName: "",
            files: []
        };
    }

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

    /**
     * Open the file selector dialog.
     */
    selectFolder = () => {
        document.getElementById("folder-upload").click();
    };

    /**
     * Uploadthe selected files to Flicjr
     */
    uploadFolder = () => {
        let params = {
            album : {
                id: undefined,
                name: this.state.albumName,
            },
            albumName: this.state.albumName,
            files: this.state.files
        };

        this.props.uploadFiles(params);
    };

    render() {
        return (
            <Card className="upload-card">
                <CardContent>
                    <UploadHeader />
                    <div className="upload-card__content">
                        <UploadZone
                            onFileChange={this.onFileChange.bind(this)}
                            selectFolder={this.selectFolder.bind(this)}
                            selectedFiles={this.state.files}
                        />
                        <UploadAlbumInfo selectedFiles={this.state.files} />
                    </div>
                </CardContent>
            </Card>
        );
    }
}

export default UploadCard;

/* jaoWX22?^eljwVNUKA928?^ */
