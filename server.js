//Install express server
const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');

const app = express();

app.use(sslRedirect());
app.use(sslRedirect([
    'other',
    'development',
    'production'
])); 

app.use(sslRedirect(['production'], 301));

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/webtuitor2'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/webtuitor2/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);