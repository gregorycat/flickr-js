import React, { Component } from "react";
import AlbumBlock from "./AlbumBlock";

class AlbumSelection extends Component {
    render() {
        return (
            <div className="albums-block__wrapper">
                <AlbumBlock 
                    selectAlbum={this.props.selectAlbum}
                    selectedAlbumId={this.props.abumId}
                    selectedAlbumName={this.props.abumName}/>
                {this.props.albumList && this.props.albumList.albums.map(album => (
                    <AlbumBlock 
                        album={album} 
                        selectAlbum={this.props.selectAlbum}
                        selectedAlbumId={this.props.albumId}
                        selectedAlbumName={this.props.albumName}/>
                ))}
            </div>
        )
    }
}

export default AlbumSelection;
