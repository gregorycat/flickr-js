const config = require('../config');
const Flickr = require('flickr-sdk');
var http = require('http');
var parse = require('url').parse;

module.exports = function(app) {
    let oauth = new Flickr.OAuth(
        config.FLICKR.CONSUMER_KEY,
        config.FLICKR.CONSUMER_SECRET
    );

    let db = {
        users: new Map(),
        oauth: new Map()
    };

    // obtain a request token from the Flickr API. the user will then be
    // redirected to flickr to authorize your application. if they do,
    // they will be redirected back to your application with a request
    // token verifier, which you will exchange for the real oauth token.

    function getRequestToken(req, res) {
        oauth.request('http://localhost:3000/oauth/callback').then(function (_res) {
            var requestToken = _res.body.oauth_token;
            var requestTokenSecret = _res.body.oauth_token_secret;

            // store the request token and secret in the database
            db.oauth.set(requestToken, requestTokenSecret);

            // redirect the user to flickr and ask them to authorize your app.
            // perms default to "read", but you may specify "write" or "delete".
            res.statusCode = 302;
            res.setHeader('location', oauth.authorizeUrl(requestToken, 'write'));
            res.end();

        }).catch(function (err) {
            res.statusCode = 400;
            res.end(err.message);
        });
    }

    // congratulations! the user has authorized your app. now you need to
    // verify and exchange the request token for the user's oauth token
    // and secret. at this point, we no longer need our request token
    // and secret so we can get rid of them, and we can store the user's
    // oauth token and secret in our database to make authenticated api calls.

    function verifyRequestToken(req, res, query) {
        var requestToken = query.oauth_token;
        var oauthVerifier = query.oauth_verifier;

        // retrieve the request secret from the database
        var requestTokenSecret = db.oauth.get(requestToken);

        oauth.verify(requestToken, oauthVerifier, requestTokenSecret).then(function (_res) {
            var userNsid = _res.body.user_nsid;
            var oauthToken = _res.body.oauth_token;
            var oauthTokenSecret = _res.body.oauth_token_secret;
            var flickr;

            // store the oauth token and secret in the database
            db.users.set(userNsid, {
                oauthToken: oauthToken,
                oauthTokenSecret: oauthTokenSecret
            });

            // we no longer need the request token and secret so we can delete them
            db.oauth.delete(requestToken);

            // log our oauth token and secret for debugging
            console.log('oauth token:', oauthToken);
            console.log('oauth token secret:', oauthTokenSecret);

            // create a new Flickr API client using the oauth plugin
            flickr = new Flickr(oauth.plugin(
                oauthToken,
                oauthTokenSecret
            ));

            // make an API call on behalf of the user
            flickr.test.login().pipe(res);

        }).catch(function (err) {
            res.statusCode = 400;
            res.end(err.message);
        });
    }

    /**
     * Log user into his Flickr Account in order to allow the app to manage datas.
     */
    function login() {
        // create a simple server to handle incoming requests.
        http.createServer(function (req, res) {
            var url = parse(req.url, true);

            switch (url.pathname) {
            case '/':
                return getRequestToken(req, res);
            case '/oauth/callback':
                return verifyRequestToken(req, res, url.query);
            default:
                res.statusCode = 404;
                res.end();
            }
        }).listen(3000, function () {
            console.log('Open your browser to http://localhost:3000');
        });
    }

    /**
     * Check if user is currently connected.
     */
    function testLogin() {

    }


    /**
     * Controller entry point to log into Flickr
     */
    app.get('/api/flickr/login', (req, res) => {
        login();
    });

    /**
     * Controller entry point to test login
     */
    app.get('/api/flickr/test_login', (req, res) => {
        testLogin();
    });
};
