import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import UploadHeader from "./Upload/UploadHeader";
import UploadZone from "./Upload/UploadZone";
import UploadInfo from "./Upload/UploadInfo";
import { connect } from "react-redux";
import * as actions from "../actions/flickr-upload";
import AlbumSelection from "./Upload/AlbumSelection";

class UploadCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            albumId: undefined,
            albumName: undefined,
            files: [],
            step: 1,
            uploadStatus: undefined,
        };

        this.props.getPhotoCount();
        this.props.getProfile();
        this.props.listAlbums();
    }

    /**
     * Cancel the process
     */
    cancel = () => {
        this.setState({
            albumId: undefined,
            albumName: '',
            files: [],
            step: 1,
        })
    }

    /**
     * Go to previous step
     */
    goBack = () => {
        this.setState({
            step: 1,
        });
    }

    /**
     * Go to next upload step
     */
    goNext = () => {
        this.setState({
            step: 2,
        })
    }

    /**
     * Intercept changes in file input field.
     */
    onFileChange = event => {
        /**
         * TODO Filter files to keep only images (png / jpg / jpeg / tiff / exif / gif / bmp )
         * and video (avi / flv / wmv / mov / mp4)
         */
        let files = [];

        for (let file of event.target.files) {
            let extension = file.name.split('.').pop().toUpperCase();
            if (extension === 'JPG' || extension === 'JPEG' || extension === 'PNG' || extension === 'BMP' || extension === 'GIF' ||
                extension === 'MP4' || extension === 'MOV')  {
                files.push(file);
            }
        }

        this.setState({ files: files });
    };

    /**
     * Select an album
     */
    selectAlbum = (album) => {
        if (album) {
            if (album.id !== undefined) {
                this.setState({
                    albumId: album.id,
                    albumName: album.title._content
                });
            } else {
                this.setState({
                    albumId: undefined,
                    albumName: album,
                })
            }
        }
    }
    /**
     * Open the file selector dialog.
     */
    selectFolder = () => {
        document.getElementById("folder-upload").click();
    };

    /**
     * Uploadthe selected files to Flickr
     */
    uploadFolder = () => {
        if (this.state.files.length === 0 || this.state.albumName === undefined) {
            return;
        }

        let params = {
            albumId: this.state.albumId,
            albumName: this.state.albumName,
            files: this.state.files
        };

        this.props.uploadFiles(params);
        let completePercent = 0;

        this.setState({
            uploadStatus: completePercent,
        })

        // Start the get upload status interval
        this.getStatusInterval = window.setInterval(() => {
            if (this.props.uploadStatus !== undefined && this.props.uploadStatus.status === 'DONE') {
                clearInterval(this.getStatusInterval);
                completePercent = undefined;

                this.setState({
                    uploadStatus: completePercent,
                });

                this.props.getPhotoCount();
                this.props.listAlbums();
                this.cancel();
                return;
            }

            if (this.props.uploadStatus !== undefined && this.props.uploadStatus.uploadedPhotos !== undefined &&
                this.props.uploadStatus.nbSentPhotos !== undefined) {
                completePercent = (this.props.uploadStatus.uploadedPhotos.length / this.props.uploadStatus.nbSentPhotos) * 100;

                this.setState({
                    uploadStatus: {
                        percent: completePercent,
                        nbUploaded: this.props.uploadStatus.uploadedPhotos.length,
                        nbSent: this.props.uploadStatus.nbSentPhotos,
                    }
                });
            }

            this.props.getUploadStatus();
        }, 5 * 1000)
    };

    render() {
        return (
            <Card className="upload-card">
                <CardContent>
                    <UploadHeader
                        albumName={this.state.albumName}
                        cancel={this.cancel.bind(this)}
                        fileCount={this.state.files.length}
                        goBack={this.goBack.bind(this)}
                        goNext={this.goNext.bind(this)}
                        step={this.state.step}
                        uploadFolder={this.uploadFolder.bind(this)}
                        uploadStatus={this.state.uploadStatus}
                    />

                    {this.state.step === 1 ?
                        <div className="upload-card__content">
                            <UploadZone
                                onFileChange={this.onFileChange.bind(this)}
                                selectFolder={this.selectFolder.bind(this)}
                                selectedFiles={this.state.files}
                            />
                            <UploadInfo
                                albumList={this.props.albumList}
                                goNext={this.goNext.bind(this)}
                                selectedFiles={this.state.files}
                                photoCount={this.props.photoCount}
                                profile={this.props.profile}
                                uploadFolder={this.uploadFolder.bind(this)}
                                uploadStatus={this.state.uploadStatus}
                            />
                        </div> :
                        <div className="upload-card__albums">
                            <AlbumSelection
                                albumList={this.props.albumList}
                                selectAlbum={this.selectAlbum.bind(this)}
                                albumId={this.state.albumId}
                                albumName={this.state.albumName}
                            />
                        </div>
                    }
                </CardContent>
            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        albumList: state.flickrUpload.albumList,
        photoCount: state.flickrUpload.photoCount,
        profile: state.flickrUpload.profile,
        uploadStatus: state.flickrUpload.uploadStatus,
    };
}

/* jaoWX22?^eljwVNUKA928?^ */
