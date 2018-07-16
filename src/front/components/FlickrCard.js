import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FlickrTop from "./FlickrTop";
import FlickrBottom from "./FlickrBottom";

class FlickrCard extends Component {
    render() {
        return (
            <Card>
                <CardContent className="flickr-uploader">
                    <FlickrTop />
                    <FlickrBottom />
                </CardContent>
            </Card>
        );
    }
}

export default FlickrCard;
