import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/flickr-upload";
import FlickrCard from "./FlickrCard";

/**
 * TODO :
 *  - Separate components
 *  - Manage file selection
 *  - Display selected images
 *  - Send files to server (add a button & implement redux logic)
 *  - Get callback information
 *  - Get upload status
 *  - Provide a field to define folder name
 *  - Provide fields to edit phot name (in Flickr)
 *
 * In top container :
 *  - Get albums from flickr
 *  - Get loged user info
 *  - Maybe last uploaded pics
 *
 */
class AppContent extends Component {
    render() {
        return (
            <div className="content">
                <FlickrCard />
            </div>
        );
    }
}

export default AppContent;
