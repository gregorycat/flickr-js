const config = require("../config");
const Flickr = require("flickr-sdk");

module.exports = function(app) {
    async function listAlbums(res) {
        let flickr = new Flickr(
            Flickr.OAuth.createPlugin(
                config.FLICKR.CONSUMER_KEY,
                config.FLICKR.CONSUMER_SECRET,
                config.FLICKR.OAUTH_TOKEN,
                config.FLICKR.OAUTH_TOKEN_SECRET
            )
        );

        let albums = [];
        let result;

        try {
            result = await flickr.photosets.getList({
                user_id: config.FLICKR.USER_ID
            });
        } catch(error) {
            console.error('ERROR', error);
        }

        if (result) {
            albums = result.body.photosets.photoset;
        }

        if (res !== undefined) {
            res.send({
                albums: albums
            })
        }
    }

    /**
     * Controller entry point to upload folder of photos
     */
    app.get('/api/flickr/list-album', (req, res) => {
        listAlbums(res);
    });
};
