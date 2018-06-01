'use strict'

var mongoose = require("mongoose");
const hospitalSchema = new mongoose.Schema({
	
    hospitalName:{
        type: String,
    
    },
    hospitalNum:{
        type: String,
        
    },
    location:{
        type: String,
        // required: [true, 'Please enter Your Hospital Location']
    },
    ward:{
        type: String,
        
    },
    email:{
        type:String,
        // required: [true, 'Please enter your Email']
    }
})

module.exports = mongoose.model("Hospital", hospitalSchema)


