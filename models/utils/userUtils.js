'use strict';

/***********************
 * Module dependencies *
 ***********************/
const User = require('../user');
const _ = require('lodash');
const Promise = require('bluebird');


    exports.register = (doc) => {
        if (_.isEmpty(doc)) {
            return Promise.reject('Missing fill');
        }
    
        if (_.isArray(doc)) {
            return User.insertMany(doc);
        }
        else {
            const newUser = new User(doc);
            return newUser.save();
        }
        
    };