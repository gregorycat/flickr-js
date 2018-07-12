const config = require('../config');
const Flickr = require('flickr-sdk');
const fs = require('fs');

module.exports = function(app) {
    /**
     * Browse a folder recursively to retrieve all files.
     *
     * @return The list of files in the folder and sub folders
     */
    function browseFolder(folder, photos) {
        fs.readdirSync(folder).forEach(file => {
            if (fs.statSync(folder + '/' + file).isDirectory()){
                browseFolder(folder + '/' + file, photos);
            } else {
                photos.push(folder + '/' + file);
            }
        });

        return photos;
    }

    /**
     * Create a photoset in Flicjr add add the photos
     *
     * @param {Array} images The list of photos id to add in the photoset
     * @param {string} name  The name to give to the photoset
     */
    async function createAlbum(images, name) {
        if (images.length === 0 && name === undefined) {
            return;
        }

        let flickr = new Flickr(Flickr.OAuth.createPlugin(
            config.FLICKR.CONSUMER_KEY,
            config.FLICKR.CONSUMER_SECRET,
            config.FLICKR.OAUTH_TOKEN,
            config.FLICKR.OAUTH_TOKEN_SECRET,
        ));

        let result =  await flickr.photosets.create({
            title: name,
            description: 'Empty Text',
            primary_photo_id: images[0]
        });

        let albumId = result.body.photoset.id;

        console.log('DEBUG', 'Adding photos to album ' + name + '...');

        for (const photo of images) {
            try {
                await flickr.photosets.addPhoto({
                    photo_id: photo,
                    photoset_id: albumId,
                });
            } catch(error) {
                console.log('ERROR', error);
            }
        }
        console.log('DEBUG', 'Album complete');
    }

    /**
     * Retrive the file in the fomder and upload them to Flickr
     *
     * @param {string} folder The path to folder to upload
     */
    async function uploadFolder(folder) {
        let pics = browseFolder(folder, []);
        let uploadedPics = [];


        console.debug('DEBUG', 'Upload Photos [' + pics.length + ']');
        for (const photo of pics) {
            let result = await uploadPhoto(photo);
            if (result) {
                uploadedPics.push(result.body.photoid._content);
                console.debug('DEBUG', 'Process..... ' + uploadedPics.length + '/' +pics.length);
            }
        }

        console.log('DEBUG', 'Upload complete');

        return uploadedPics;
    }

    /**
     * Upload a phot to Flickr.
     *
     * @param {string} photo The path to the photo to upload.
     */
    async function uploadPhoto(photo) {
        var auth = Flickr.OAuth.createPlugin(
            config.FLICKR.CONSUMER_KEY,
            config.FLICKR.CONSUMER_SECRET,
            config.FLICKR.OAUTH_TOKEN,
            config.FLICKR.OAUTH_TOKEN_SECRET,
        );

        let photoName = photo.replace(/^.*[\\\/]/, '')

        try {
            return await new Flickr.Upload(auth, photo, {
                title: photoName,
                is_public: 0,
                is_friend: 0,
            })
        } catch(error) {
            console.error(error);
            return null;
        }
    }

    /**
     * Process the photos upload from selected folder and add them to the photoset.
     *
     * @param {Request} request The requested attributes
     */
    async function uploadMyPhotos(request) {
        let photos = await uploadFolder(request.dirName, 'TEST');
        createAlbum(photos, request.albumName);

    }

    /**
     * Controller entry point to upload photos
     */
    app.get('/api/flickr/upload', (req, res) => {
        uploadMyPhotos(req);
    });
}
