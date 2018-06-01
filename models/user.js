'use strict';

/***********************
 * Module dependencies *
 ***********************/
const mongoose = require("mongoose");


/********************************************
 *     MONGOOSE MODEL CONFIGURATION         *
 *******************************************/
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your firstname']
    },
    lastName: {
        type: String,
        required: [true, 'Please add your last name']
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    Country: {
        type: String, 
        required: true
    },
    State: {
        type: String, 
        required: true
    },
    l_g_a: {
        type: String, 
        required: true
    },
    ward: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    dob: {
        type: String, 
        required: true
    },
    contact_no: {
        type: String, 
        required: true
    },
    registration_no: {
        type: String, 
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
    meta: {
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now},
    }     
});


/*********************
 * Compile to Model  *
 ********************/
const UsersModel = mongoose.model('Users', userSchema);

/*********************
 * Export UsersModel *
 ********************/
module.exports = UsersModel;
