const express = require('express');
const pathUtils = require('path');
const Flickr = require('flickr-sdk');
const config = require('./config');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;


/*
var auth = Flickr.OAuth.createPlugin(
    config.FLICKR.CONSUMER_KEY,
    config.FLICKR.CONSUMER_SECRET,
    config.FLICKR.OAUTH_TOKEN,
    config.FLICKR.OAUTH_TOKEN_SECRET,
);

var upload = new Flickr.Upload(auth, '/home/gregory/Images/Office.jpeg', {
    title: 'TEST',
});

upload.then(function (res) {
	console.log('res', res.body);
}).catch(function (err,test) {
	console.log('err', err);
}); */


/*
var flickr = new Flickr(config.FLICKR.CONSUMER_KEY,);


flickr.photos.getInfo({
	photo_id: 43341476711
}).then(function (res) {
	console.log('yay!', res.body.photo.urls.url);
}).catch(function (err) {
	console.error('bonk', err);
}); */


/* const appDir = pathUtils.resolve(__dirname, '../../build');
app.use(express.static(appDir));

app.get('*', function(req, res) {
    res.sendfile(pathUtils.resolve(appDir, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
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

async function uploadFolder(folder, name) {
    let pics = browseFolder(folder, []);
    let uploadedPics = [];

    //console.log(pics);

    for (const photo of pics) {
        let result = await uploadPhoto(photo);
        if (result) {
            uploadedPics.push(result.body.photoid._content);
        }
    }
    console.log('LENGTH', uploadedPics.length)

   /*  pics.forEach(async function forEachPhoto(photo) {
    }); */

    if (uploadedPics.length === 0 && name === undefined) {
        return;
    }

    let flickr = new Flickr(Flickr.OAuth.createPlugin(
        config.FLICKR.CONSUMER_KEY,
        config.FLICKR.CONSUMER_SECRET,
        config.FLICKR.OAUTH_TOKEN,
        config.FLICKR.OAUTH_TOKEN_SECRET,
    ));
    let albumId;

    let result =  await flickr.photosets.create({
        title: name,
        description: 'Empty Text',
    });

    console.log('album', result.body);


    return uploadedPics;
}

async function createAlbum(images, name) {

}

async function uploadPhoto(photo) {
    var auth = Flickr.OAuth.createPlugin(
        config.FLICKR.CONSUMER_KEY,
        config.FLICKR.CONSUMER_SECRET,
        config.FLICKR.OAUTH_TOKEN,
        config.FLICKR.OAUTH_TOKEN_SECRET,
    );

    try {
        return await new Flickr.Upload(auth, photo, {
            title: 'TEST',
        })
    } catch(error) {
        console.error(error);
        return null;
    }

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

async function uploadToFlickr() {
    await uploadFolder('/home/gregory/Images/EA', 'TEST');
}

uploadToFlickr()
