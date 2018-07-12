const config = require('../config');
const Flickr = require('flickrapi');
const fs = require('fs');

module.exports = function(app) {
    function browseFolder(folder, photos) {
        fs.readdirSync(folder).forEach(file => {
            if (fs.statSync(folder + file).isDirectory()){
                browseFolder(folder + file, photos);
            } else {
                photos.push(folder + file);
            }
        });

        return photos;
    }

    function retrievePhotos(folder, photos) {
        let photos = browseFolder(folder, []);

        photos.forEach(function forEachPhoto(photo) {
            let result = uploadPhoto(photo);

            console.log(result);
        });


        let flickr = new Flickr(config.FLICKR.CONSUMER_KEY);
    }

    async function uploadPhoto(photo) {
        var auth = Flickr.OAuth.createPlugin(
            config.FLICKR.CONSUMER_KEY,
            config.FLICKR.CONSUMER_SECRET,
            config.FLICKR.OAUTH_TOKEN,
            config.FLICKR.OAUTH_TOKEN_SECRET,
        );

        return await new Flickr.Upload(auth, photo, {
            title: 'TEST',
        })

        /* var upload = new Flickr.Upload(auth, photo, {
            title: 'TEST',
        });

        upload.then(function (res) {
            console.log('res', res.body);
            let photoId = res.body.photoid._content;



        }).catch(function (err,test) {
            console.log('err', err);
        }); */
    }


    app.get('/api/flickr/upload', (req, res) => {
        retrievePhotos(req.dirName);
    });
}
