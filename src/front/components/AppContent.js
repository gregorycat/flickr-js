import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

class AppContent extends Component {
    selectFolder = () => {
        this.refs.fileUploader.click();
    };

    onFileChange = event => {
		console.log(event.target);
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
                                    nwdirectory=""
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
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default AppContent;
