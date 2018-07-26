const { fork } = require("child_process");
const fs = require("fs");

module.exports = function(app) {
    /**
     * Globals vars
     */
    let uploadedPhotos = [];
    let sentPhotos;

    /**
     * Controller entry point to upload multiple photos
     */
    app.post("/api/flickr/upload-photos", async (req, res) => {
        res.send({
            status: "RECEIVED"
        });

        uploadedPhotos = [];
        let photoPaths = [];
        sentPhotos = req.files.image.length;

        for (let photo of req.files.image) {
            if (fs.existsSync("./uploads/" + photo.name)) {
                console.log('DEBUG', photo.name + ': photo already if folder -> rename it');
                photo.name = 'new_'+photo.name;
            }
            await photo.mv("./uploads/" + photo.name);
            photoPaths.push("./uploads/" + photo.name)
            console.log("DEBUG", "photo moved to : ./uploads/" + photo.name);
        }

        let request = {
            files: photoPaths,
            albumId: req.body.albumId,
            albumName: req.body.albumName
        }

        console.log("Prepare fork process")
        // Initiate forked upload process
        const process = fork('./src/server/upload.js');
        process.send({request: request});

        // Listen for messages from upload process
        process.on('message', message => {
            if (message.uploadedPics) {
                uploadedPhotos = message.uploadedPics;
            } else if (message.status && message.status === 'DONE') {
                sentPhotos = 0;
                uploadedPhotos = []
            }
        });
    });

    /**
     * Controller entry point to retrieve the upload status
     */
    app.get("/api/flickr/get-upload-status", (req, res) => {
        let status = 'PROCESS';

        if (uploadedPhotos !== undefined && sentPhotos === uploadedPhotos.length) {
            status = 'DONE';
        }

        res.send({
            status: status,
            nbSentPhotos: sentPhotos,
            uploadedPhotos: uploadedPhotos,
        });
    });
};
