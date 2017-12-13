var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var multer = require('multer');
var api = require('./server/routes/router');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var extractJWT = passportJWT.ExtractJwt;
var jwtStrategy = passportJWT.Strategy;
var jwtOptions = {};
jwtOptions.jwtFromReq = passportJWT.ExtractJwt.fromAuthHeader();
jwtOptions.secret = 'othaa';

var app = express();


var users = [ 
    {
    id:1,
    admin:false,
    username:"guest",
    password:"guest"

},
{
    id:2,
    admin:true,
    username:"admin",
    password:"admin"
}
]



var stratedy = new jwtStrategy(jwtOptions,function(jwt_payload,next) {
    console.log('payload received',jwt_payload);
    var user = users[_.findIndex(users,{id: jwt_payload.id})];
    if(user) {
        next(null,user);
    }else{
        next(null,false);
    }
})

app.use(passport.initialize())
passpor.use(stratedy);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || '3000';

mongoose.connect('mongodb://localhost:27017/uitable',function(succ,error) {
    if(succ) {
        console.log("Mongodb connected")
    } else if(error) {
        console.log(error);
    }
});


app.set('port', port);

app.use('/api', api); 	

app.use('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Authorization, x-user-access-token, x-access-token, Content-Type, Accept"
    );
    next();
})




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
