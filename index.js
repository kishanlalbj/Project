var express = require("express");
var app = express();

var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
// app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  // parse application/json
  app.use(bodyParser.json())

  app.use('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Authorization, x-user-access-token, x-access-token, Content-Type, Accept"
    );
    next();
})
  
  
  app.get("/", function(req, res) {
    res.json({message: "Express is up!"});
  });
  

var users = [
    {
      id: 1,
      admin:false,
      name: 'guest',
      password: 'guest'
    },
    {
      id: 2,
      admin:true,
      name: 'test',
      password: 'test'
    }
  ];

  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  jwtOptions.secretOrKey = 'tasmanianDevil';
  
  var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, {id: jwt_payload.id})];
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  
  passport.use(strategy);

  app.post("/login", function(req, res) {
    if(req.body.name && req.body.password){
      var name = req.body.name;
      var password = req.body.password;
    }
    // usually this would be a database call:
    var user = users[_.findIndex(users, {name: name})];
    if( ! user ){
      res.status(401).json({message:"no such user found"});
    }
  
    if(user.password === req.body.password) {
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = {id: user.id};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: "ok", token: token,user});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  });

  app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
      console.log(req.get('Authorization')); 
      console.log(req.user);
     res.json({user:req.user.name,admin:req.user.admin,status:"Success"});
  });

  app.listen(3000, function() {
    console.log("Express running");
  });