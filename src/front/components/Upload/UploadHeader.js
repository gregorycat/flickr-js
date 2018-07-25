import React, { Component, Fragment } from "react";
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Backup from '@material-ui/icons/Backup';
import LinearProgress from '@material-ui/core/LinearProgress';

class UploadHeader extends Component {
    render() {
        return (
            <Fragment>
                <div class="upload-card__header">
                    { this.props.step === 2 ?
                        <Button variant="outlined" color="primary" onClick={this.props.goBack}>
                            <ChevronLeft className="" />
                            Previous
                        </Button> :
                        ""
                    }
                    <div className="uplad-card-header__title">
                        <div>{this.props.step === 1 ? 'Upload your files' : this.props.selectedFiles.length + ' photos to upload'}</div>
                        <div className="upload-card-header__primary">
                        {this.props.step === 1 ? 'Choose a folder to upload' : 'Choose your album'}
                        </div>
                    </div>
                    { this.props.step === 1 ?
                        <Button variant="outlined" color="primary" onClick={this.props.goNext}>
                            Next
                            <ChevronRight className="" />
                        </Button> :
                        <Button variant="outlined" color="primary" onClick={this.props.uploadFolder}>
                            <Backup className="" />
                            Upload
                        </Button>
                    }
                </div>

                {this.props.uploadStatus !== undefined && this.props.uploadStatus.percent !== undefined ?
                    <div className="upload-card-header__upload-status">
                        <div className="upload-card-header__upload-detail">
                            Upload : {this.props.uploadStatus.nbUploaded} / {this.props.uploadStatus.nbSent} ({Math.round(this.props.uploadStatus.percent * 100) / 100}%)
                        </div>
                        <LinearProgress variant="determinate" value={this.props.uploadStatus.percent} />
                    </div>
                : this.props.uploadStatus !== undefined && this.props.uploadStatus.percent === undefined?
                    <div className="upload-card-header__upload-status">
                        <div className="upload-card-header__upload-detail">
                            Transfering files to server ...
                        </div>
                        <LinearProgress value="0" />
                    </div>
                : ''
            }
            </Fragment>
        );
    }
}

export default UploadHeader;
