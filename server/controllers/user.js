var User = require('../models/user.js');
var jwt = require('jwt-simple');

module.exports = function(passport) {
  return {
    login: function(req, res, next) {
      passport.authenticate('local-login', {
        session: false
      }, function(err, user, info) {
        if (err) {
          return next(err)
        }

        if (!user) {
          res.status(401);
          res.json({
            message: info
          });
        }

        //user has authenticated correctly, create a JWT token 
        //encode user id as token
        var token = jwt.encode({
          id: user._id
        }, 'secret');

        res.status(200);

        res.json({
          token: token,
          id: user._id
        });

      })(req, res, next);
    },

    isAuth: function(req, res, next) {
      // checking to see if the user is authenticated
      // grab the token in the header, if any
      // then decode the token, which we end up being the user object
      // check to see if that user exists in the database
      var token = req.headers['x-access-token'] || req.params.token;
      if (!token) {
        next(new Error('No token'));
      } else {
        var user_Id = jwt.decode(token, 'secret');
        //decode userid as token, attempt to find user
        User.findOne({
            _id: user_Id.id
          })
          .then(function(foundUser) {
            if (foundUser) {
              next();
            } else {
              res.status(401);
              res.json({
                message: "Not Authorized"
              });
            }
          })
          .catch(function(error) {
            next(error);
          });
      }
    },

    register: function(req, res, next) {
      passport.authenticate('local-register', {
        session: false
      }, function(err, user, info) {
        if (err) {
          return next(err)
        }

        if (!user) {
          res.status(401);
          res.json({
            message: info
          });
        }

        //user has authenticated correctly, create a JWT token 
        //encode user id as token
        var token = jwt.encode({
          id: user._id
        }, 'secret');
        res.status(200);
        res.json({
          token: token
        });
      })(req, res, next);
    },

    delete: function(req, res, next) {
      // checking to see if the user is authenticated
      // grab the token in the header, if any
      // then decode the token, which we end up being the user object
      // check to see if that user exists in the database
      var token = req.headers['x-access-token'] || req.params.token;
      var user_Id = jwt.decode(token, 'secret');
      //decode userid as token, attempt to find user
      User.findOne({
          _id: user_Id.id
        })
        .then(function(foundUser) {
          if (foundUser) {
            foundUser.remove(function(err, deleted) {
              if (err) {
                next(err);
              }
              res.status(200);
              res.json(deleted);
            });
          } else {
            res.status(404);
            res.json({
              message: "Not Found"
            });
          }
        })
        .catch(function(error) {
          next(error);
        });
    }
  }
}