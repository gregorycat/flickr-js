import React, { Component, Fragment } from "react";
import Add from '@material-ui/icons/Add';
import AlbumCreationDialog from "./AlbumCreationDialog";
var classNames = require('classnames');

class AlbumBlock extends Component {
    state = {
        open: false,
        newAlbumName: undefined,
    };
    
    handleClickOpen = () => {
        this.setState({
          open: true,
        });
    };
    
    handleClose = value => {
        this.setState({ newAlbumName: value, open: false });

        if (value !==undefined) {
            this.props.selectAlbum(value);
        }
    };

    render() {
        let blockStyle = {};

        if (this.props.album !== undefined) {
            blockStyle = {
                backgroundImage: `url(${this.props.album.primaryStaticUrl})`,
            };
        }

        let newAlbumClass = classNames({
            'album-block': true,
            'album-block--selected': this.props.selectedAlbumId === undefined && this.state.newAlbumName !== undefined,
        });

        let albumClass = classNames({
            'album-block': true,
            'album-block--selected': this.props.album !== undefined && this.props.selectedAlbumId === this.props.album.id,
        });

        return (
            <Fragment>
                {this.props.album !== undefined ? 
                    <div className={albumClass} onClick={() => this.props.selectAlbum(this.props.album)}>
                            <div className="album-block__picture-wrapper">
                                <div className="album-block__picture" style={blockStyle}></div>
                            </div>
                            <div className="album-block__field--primary album-block__title">{this.props.album.title._content}</div>
                            <div className="album-block__field--secondary album-block__photos">{this.props.album.photos} photos</div>
                            <div className="album-block__field--secondary album-block__videos">{this.props.album.videos} videos</div>
                        
                    </div>:
                    <div className={newAlbumClass} onClick={this.handleClickOpen}>
                            <div className="album-block__new-icon">
                                <Add/>
                            </div>
                            <div className="album-block__field--primary album-block__title">
                                {this.state.newAlbumName !== undefined ? 
                                    this.state.newAlbumName : 
                                    'New Album'
                                }</div>
                            <div className="album-block__field--secondary album-block__photos">Create a new album</div>
                    </div>
                }
                <AlbumCreationDialog
                    open={this.state.open}
                    onClose={this.handleClose}/>
            </Fragment>
        )
    }
}

export default AlbumBlock;
