'use strict';

/***********************
 * Module dependencies *
 ***********************/
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/utils/userUtils');
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');

/********************
 * Router instance  *
 ********************/
const router      = express.Router();

/************************************************
 *      POST RESQUEST FOR REGISTRATION          *
 ***********************************************/

router.post('/register', (req, res) => {
  let {firstName, lastName, email, password} = req.body;
  return User.register(req.body)
      .then(doc => {
     //email notification is sent the moment you register on the app
     var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'pregnancyappdemo@gmail.com',
          pass: 'pass word'
  }
  });

  var mailOptions = {
      from: 'pregnancyappdemo@gmail.com',
      to: User.email,
      subject: 'Pregnancy App',
      text: `Hello ${firstName} ${lastName},
      
      Welcome to pregnancy app, This is a demo version of the real app.

                 
      Thank you for using Pregnancy App!
      The Pregnancy App Team (https://${req.headers.host})`
  };

  transporter.sendMail(mailOptions, (error, info)=>{
      if (error) {
          console.log(error);
      } else {
          console.log(`Email sent:  ${info.response}`);
      }
  }); 
    return res.status(200).json(`Welcome ${firstName} ${lastName}, you're now registered!`);
          log.info("Successfully created a User");
          return res.status(200).json(doc);
      })
      .catch(err => {
          console.log(err);
          return res.status(400).json("Could not create Account");
      });
});

  
  /**********************************
   *      POST RESQUEST FOR LOGIN   *
   *********************************/
router.post('/login', (req, res) =>{
  User.findOne({email: req.body.email}, function(err, user) {
  if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, function (error, user) {
          if (!user) {
              res.json({status: 404, message: config.messages.INVALID_CREDENTIALS});
          }
          else if (user){
            jwt.sign(user, config.jwt.secret, config.jwt.options, (err, token) => {
              return res.json({
                  success: "You're now login",
                  user,
                  token,
              });
          });
          }
        });
      }
      else{
        res.json({success: false, message: config.messages.NO_DATA});
      }
  })
})


/********************************
*    FORGOT PASSWORD            *  
********************************/
router.post('/forgot_pword', (req, res) => {
    let {firstName, lastName, email, password} = req.body;
    async.waterfall([
      (done)=> {
            User.findOne({
              email: email
            }).exec(function(err, user) {
              if (user) {
                done(err, user);
              } else {
                done('User not found.');
              }
            });
          },
          (user, done) =>{
          // create the random token
        crypto.randomBytes(20, (err, buf)=> {
          var token = buf.toString('hex');
          done(err, user, token);
        });
      },
      (user, token, done)=> {
        User.findByIdAndUpdate({ _id: user._id }, {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000}, // 1 hour
            { upsert: true, new: true }).exec((err, new_user)=>{
                done(err, token, new_user);
            });
        }, 

      (token, user, done)=> {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pregnancyappdemo@gmail.com',
                pass: 'pass word'
        }
        });
        var mailOptions = {
            from: 'pregnancyappdemo@gmail.com',
            to: user.email,
            subject: 'Link to reset your password',
            text: `Hi,

            You are receiving this because you (or someone else) have requested the reset of the password for your account.

            To change your Pregnancy App password, click here or paste the following link into your browser:
            
            https://${req.headers.host}/reset_pword/${token},
            
            This link will expire in 24 hours, so be sure to use it right away.

            If you did not request this, please ignore this email and your password will remain unchanged.
            

            Thank you for using Pregnancy App!
            The Pregnancy App Team`
        };

        transporter.sendMail(mailOptions, (err) => {
        res.json(`An e-mail has been sent to ${user.email} with further instructions.`);
          done(err, 'done');
        });
      }
    ], (err) => {
      if (err)
      res.status(422).json({ message: err });
    });
  });


/********************************
*       RESET PASSWORD          *  
* ******************************/
router.post('/reset_pword', (req, res, next)=> {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
        $gt: Date.now()
      }
    }).exec((err, user)=> {
      if (!err && user) {
        if (req.body.newPassword === req.body.verifyPassword) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          user.save(function(err) {
            if (err) {
                return res.status(422).send({
                  message: err
                });
              } else {
                var mailOptions = {
                    to: user.email,
                    from: 'pregnancyappdemo@gmail.com',
                    subject: `Password was successfully reset`,
                    text: `Hi,
 
                    You've successfully changed your Pregnancy App password.
                     
                    Thanks for using Pregnancy App!
                    The Pregnancy App Team`
                  };
                  smtpTransport.sendMail(mailOptions, (err) => {
                    if (!err) {
                      return res.json({ message: 'Password reset successful' });
                    } else {
                      return done(err);
                    }
                  });
                }
            });
          } else {
            return res.status(422).send({
              message: 'Passwords do not match'
            });
          }
        } else {
          return res.status(400).send({
            message: 'Password reset token is invalid or has expired.'
          });
        }
      });
});


    
/******************
 * Export router  *
 ******************/
module.exports = router;
