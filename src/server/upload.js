const config = require("./config");
const Flickr = require("flickr-sdk");
const fs = require("fs");

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

    let flickr = new Flickr(
        Flickr.OAuth.createPlugin(
            config.FLICKR.CONSUMER_KEY,
            config.FLICKR.CONSUMER_SECRET,
            config.FLICKR.OAUTH_TOKEN,
            config.FLICKR.OAUTH_TOKEN_SECRET
        )
    );

    console.debug("DEBUG", "Create album " + name);

    let result = await flickr.photosets.create({
        title: name,
        description: "Empty Text",
        primary_photo_id: images[0]
    });

    let albumId = result.body.photoset.id;

    console.log("DEBUG", "Adding photos to album " + name + "...");

    for (const photo of images) {
        try {
            await flickr.photosets.addPhoto({
                photo_id: photo,
                photoset_id: albumId
            });
        } catch (error) {
            console.log("ERROR", error);
        }
    }
    console.log("DEBUG", "Album complete");
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
        config.FLICKR.OAUTH_TOKEN_SECRET
    );

    let photoName;
    let photoToUpload;

    if (typeof photo === "string") {
        photoToUpload = photo;
        photoName = photo.replace(/^.*[\\\/]/, "");
    } else {
        photoName = photo.name;
        photoToUpload = photo;
    }

    try {
        return await new Flickr.Upload(auth, photoToUpload, {
            title: photoName,
            is_public: 0,
            is_friend: 0
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

/**
 * Upload recieved multipart files to Flickr account.
 *
 * @param  {Multipat} files files to upload on Flickr.
 * @return The list of upload photos id.
 */
async function uploadFiles(files) {
    let uploadedPics = [];

    console.debug("DEBUG", "Upload Photos [" + files.length + "]");
    for (const photo of files) {
        //await photo.mv("./uploads/" + photo.name);
        let result = await uploadPhoto("./uploads/" + photo.name);
        if (result) {
            uploadedPics.push(result.body.photoid._content);
            console.debug(
                "DEBUG",
                "Process..... " + uploadedPics.length + "/" + files.length
            );

            process.send({
                uploadedPics: uploadedPics,
            });
        }

        fs.unlink("./uploads/" + photo.name, err => {
            if (err) console.log(err);
            console.log("./uploads/" + photo.name + " was deleted");
        });
    }

    console.log("DEBUG", "Upload complete");

    return uploadedPics;
}

async function uploadFromFiles(request) {
    let photos = await uploadFiles(request.files.image);
    createAlbum(photos, request.albumName);

    return photos;
}

// receive message from master process
process.on("message", async message => {
    console.log("MESSAGE", message.request.files.image[0]);

    await uploadFromFiles(message.request);
});
