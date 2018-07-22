const config = require("../config");
const Flickr = require("flickr-sdk");

module.exports = function(app) {
    async function getPhotoCount(res) {
        let flickr = new Flickr(
            Flickr.OAuth.createPlugin(
                config.FLICKR.CONSUMER_KEY,
                config.FLICKR.CONSUMER_SECRET,
                config.FLICKR.OAUTH_TOKEN,
                config.FLICKR.OAUTH_TOKEN_SECRET
            )
        );

        let start = '1514764800';
        let end = new Date().getTime();
        let result;

        try {
            result = await flickr.photos.getCounts({
                dates: start + ',' + end,
            });
            
            res.send({
                nbPhotos: result.body.photocounts.photocount[0].count
            })
        } catch (err) {
            console.log('GET COUNTS ERROR', err);

            res.send({
                count: 0
            })
        }
    }

    async function getProfile(res) {
        let flickr = new Flickr(
            Flickr.OAuth.createPlugin(
                config.FLICKR.CONSUMER_KEY,
                config.FLICKR.CONSUMER_SECRET,
                config.FLICKR.OAUTH_TOKEN,
                config.FLICKR.OAUTH_TOKEN_SECRET
            )
        );

        let result;

        try {
            result = await flickr.profile.getProfile({
                user_id: config.FLICKR.USER_ID,
            });
            
            res.send({
                profile: result.body.profile
            })
        } catch (err) {
            console.log('GET PROFILE ERROR', err);

            res.send({
                profile: undefined
            })
        }
    }

    /**
     * Controller entry point to retrieve the photos count
     */
    app.get("/api/flickr/get-photo-count", (req, res) => {
        getPhotoCount(res);
    });

    app.get("/api/flickr/get-profile", (req, res) => {
        getProfile(res);
    })
};