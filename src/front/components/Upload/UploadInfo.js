import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import LinearProgress from '@material-ui/core/LinearProgress';

class UploadInfo extends Component {
    /* displayAlbums() {
        if (this.props.albumList === undefined) {
            return;
        }

        let albumBlock = [];
        let albumList = [];

        for (let i = 0; i < this.props.albumList.length; i++) {
            albumBlock.push(<AlbumBlock album={this.props.listAlbums[i]} />);
        }

        albumList.push(
            <div className="albums-block__wrapper">{albumBlock}</div>
        );

        return albumList;
    } */

    render() {
        let progressType = this.props.uploadStatus !== undefined && this.props.uploadStatus > 0 ? "determinate" : "";

        return (
            <div className="upload-card-content__info">
                <div className="upload-card-content-info__title">
                    Albums & Files infos
                </div>

                <div className="upload-card-content-info__upload">
                    {this.props.selectedFiles !== undefined &&
                    this.props.selectedFiles.length > 0 ? (
                        <div className="upload-card-info__files-info">
                            <div className="file-info__files-counter">
                                {this.props.selectedFiles.length} files to upload
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    {this.props.uploadStatus !== undefined ?
                        <div className="upload-card-info__upload-status">
                            <LinearProgress variant={progressType} value={this.props.uploadStatus} />
                        </div>
                    : ''}
                </div>

                <div className="upload-card-info__photo-details">
                    <div className="upload-photo-detail photo-details__profile">
                        <div className="upload-photo-detail__title">
                            Profile details
                        </div>
                        <div className="upload-photo-detail__field">
                            User name : {this.props.profile !== undefined ? this.props.profile.profile.first_name + " " + this.props.profile.profile.last_name : 'NC'}
                        </div>
                        <div className="upload-photo-detail__field">
                            City : {this.props.profile !== undefined ? this.props.profile.profile.city : 'NC'}
                        </div>
                        <div className="upload-photo-detail__field">
                            Country : {this.props.profile !== undefined ? this.props.profile.profile.country : 'NC'}
                        </div>
                    </div>
                    <div className="upload-photo-detail photo-details__account">
                        <div className="upload-photo-detail__title">
                            Account details
                        </div>
                        <div className="upload-photo-detail__field">
                            Photos : {this.props.photoCount !== undefined ? this.props.photoCount.nbPhotos : 'NC'}
                        </div>
                        <div className="upload-photo-detail__field">
                            Albums : {this.props.albumList !== undefined ? this.props.albumList.albums.length : 'NC'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadInfo;
