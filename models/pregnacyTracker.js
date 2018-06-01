'use strict';
//=============================================================================
/**
    at bootstrap_node.js:540:3
 * Module dependencies
 */
//=============================================================================
const    mongoose           = require('mongoose'),
         uniqueValidator    = require('mongoose-beautiful-unique-validation');

//=============================================================================
/**
 * RolesUsers Schema
 */
//=============================================================================
const pregnacyTracker = mongoose.Schema({
    email: {
        type: String
    },
    LMP: {
        type: String,
    },  
    EDD: {
        type: String,
    },
    GA: {
        type: String,
    },
    trimester: {
        type:String
    },
    plate_number: {
        type:String
    },
    gravida: {
        type:String
    },
    Parity: {
        type: String
    },
    abortion: {
        type: String
    }

    
},{timestamps: true}).plugin(uniqueValidator);

//=============================================================================
/**
 * Export RolesUsersModel
 */
//=============================================================================
module.exports = mongoose.model('pregnacy', pregnacyTracker);
//=============================================================================