const express = require('express');
const pathUtils = require('path');
const fileUpload = require('express-fileupload');


const app = express();
const port = process.env.PORT || 5000;

// default options
app.use(fileUpload());


const appDir = pathUtils.resolve(__dirname, '../../build');
app.use(express.static(appDir));

require('./controllers/FlickrLoginController')(app);
require('./controllers/FlickrMiscController')(app);
require('./controllers/FlickrUploadController')(app);
require('./controllers/FlickrAlbumController')(app);

app.get('*', function(req, res) {
    res.sendFile(pathUtils.resolve(appDir, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
