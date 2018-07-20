import React, { Component } from "react";

class AlbumBlock extends Component {
    render() {
        const blockStyle = {
            backgroundImage: `url(${this.props.album.primaryStaticUrl})`,
        };

        return (
            <div className="album-block">
                <div className="album-block__field--primary album-block__title">{this.props.album.title._content}</div>
                <div className="album-block__field--secondary album-block__photos">{this.props.album.photos} photos</div>
                <div className="album-block__field--secondary album-block__videos">{this.props.album.videos} videos</div>
            </div>
        )
    }
}

export default AlbumBlock;
