const passportJwt = require('passport-jwt');
const jwtStartagy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const User = require('../api/models/user');
const tokenKey = require('./keys').tokenKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tokenKey;

module.exports = passport => {
    passport.use( new jwtStartagy(opts, (jwt_payload, done) => {
        // jwt_payload === userData
        User.findById(jwt_payload.id).then( user => {
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        }).catch(err => {
            console.log(err);
        });
    }));
};

