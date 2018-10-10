import React, { Component } from "react";

class FileBlock extends Component {
    constructor(props) {
        super(props);

        this.fileUrl = URL.createObjectURL(this.props.file);
    }

    render() {
        return (
            <div className="file-block">
                <img src={this.fileUrl} alt="file"/>
                <div className="file-block__fields">
                    <div className="file-block__title">{this.props.file.name}</div>
                </div>
            </div>
        )
    }
}

export default FileBlock;
