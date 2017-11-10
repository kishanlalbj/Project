var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var api = require('./server/routes/router');
var mongoose = require('mongoose');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || '4200';

mongoose.connect('mongodb://localhost:27017/uitable',function(succ,error) {
    if(succ) {
        console.log("Mongodb connected")
    } else if(error) {
        console.log(error);
    }
});

app.set('port', port);

app.use('/api', api); 	

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Create HTTP server.
 */
 const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
