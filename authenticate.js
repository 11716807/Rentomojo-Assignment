var passport= require("passport");
var localStrategy=require("passport-local").Strategy;
var jwtStrategy=require("passport-jwt").Strategy;
var extractJwt=require("passport-jwt").ExtractJwt;
var jwt= require("jsonwebtoken");

var config= require("./config");

var User=require("./model/user");

exports.local=passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken=function(user){
    return jwt.sign(user,config.secretKey,
        {expiresIn:3600});
}

opts={}
opts.jwtFromRequest=extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;

exports.jwtPassport= passport.use(new jwtStrategy(opts,(jwt_payload,done)=>{
    console.log("payload:::",jwt_payload);
    User.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err)
        {
            return done(err,false);
        }
        else if(user)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false);
        }

    });
}));
exports.verifyUser = passport.authenticate("jwt",{session:false});

