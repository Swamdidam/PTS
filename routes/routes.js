'use strict';



/***********************
 * Module dependencies *
 ***********************/
const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital'),
    user                    = require('./user'),
    pregnacyTrack           = require('../models/pregnacyTracker');


router.post('/pregnacyTrackiing', (req, res) => {

/*************************************************************************
            Function for calculating EDD
**************************************************************************/

     /****************************************************
      *  Create Hospital                 *
      ****************************************************/
     router.post("/hospitalreg", function (req, res) {
        var form = {

            hospitalName: req.body.hospitalName,
            hospitalNum: req.body.hospitalNum,
            location: req.body.location,
            ward: req.body.ward,
            email: req.body.email,
            
        }

        Hospital.create(form, (err, data) => {
            if (err) {
                console.log("error!")
                res.json({ "status": 400, "message": "record not found", err: err });
            } else {
                res.json({ "status": 200, "message": "record found", data: data });
            }
        })
    })

/*************************************************
 * View byOne
*************************************************/

router.get('/hosiptal/:one', (req, res)=>{
        Hospital.findOne(req.params.hospitalNum, (err, data) => {
            if(err){
                res.json({ "status": 400, "message": "record not found", err: err });
                           
            }else{
                res.json({"status": 200, "message": "The Hospital's detail is shown below", data: data})
            }
        })
    })


/*****************************************************
*         To view all register Hospitals         *
******************************************************/

    router.get('/allHospital', (req, res)=>{
        return Hospital.find({}, (err, doc) =>{
            if(err){
                return res.status(400).json({message:"Sorry an error has occured"})
            } 
        else{ 
            return res.status(200).json({message:"List of all registered hospitals", doc:doc})
        }
        
    })
})

/***********************************************
*       Edit Hospital details         *
***********************************************/
    router.post('/edit/:hospitalNum', (req, res)=>{
        let {hospitalNum:hospitalNum} = req.body;
        return Hospital.update({hospitalNum}, {$set:req.body})
            .then(doc=>{
                return res.status(200).json({status:200, message:"Hospital successfully updated", doc:doc})
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    });
    

/*****************************************
*   To delete a Hospital       *
*****************************************/     
    router.post('/deleteHospital', (req, res)=>{
        return Hospital.findOneAndRemove(req.body)
            .then(ok =>{
                return res.status(200).json({ message:"Hospital's Account successfully deleted"})
            })
            .catch(err=>{
                return res.status(400).json(err)
            })
    })
    

/***********************
 *   Routes            *
 **********************/
router.use('/', user);

    function getEDD(LMP){
        var someDate = new Date(LMP);
        // var numberOfDaysToAdd = n;
        someDate.setDate(someDate.getDate() + 282); 
        
        var dd = someDate.getDate();
        if(dd.length < 2){
            return dd = '0' + dd
        }
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();
        
        var someFormattedDate = mm + '/'+ dd + '/'+ y;
        return someFormattedDate
        }

/*************************************************************************
            Function for calculating GA
**************************************************************************/

    function GA(LMP){
        // var LMP =    "05/10/2018";
        var today = new Date();
        var LMP = new Date(LMP);

        var timeDiff = Math.abs(today.getTime() - LMP.getTime());
        // console.log(LMP)
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

            if ( diffDays > 7 ){
                var days  = diffDays % 7;
                    
                if(diffDays % 7 == 0){
                   var weeks = diffDays/7
                }
                else {
                    weekFraction = diffDays / 7;
                    weekFractionToString = weekFraction.toString(),
                    weeks = weekFraction - ('0.' + weekFractionToString.split('.').pop());
                    weeks = weeks + " weeks " + days + " days"
                }
                return weeks
            }
            else{
                return diffDays
            }

        // console.log(diffDays + ' Days after LMP');
    }
      
/*************************************************************************
             Function for calculating trimester
*************************************************************************/

function getTrimester(){
    // var LMP =    "05/10/2018";
    var today = new Date();
    var LMP = new Date(LMP);

    var timeDiff = Math.abs(today.getTime() - LMP.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        if ( diffDays > 7 ){
            var 
                days  = diffDays % 7,
                weekFraction = diffDays / 7,
                weekFractionToString = weekFraction.toString(),
                weeks = weekFraction - ('0.' + weekFractionToString.split('.').pop());

                if(weeks > 23 ){
                    return 3
                }
                if( 13 <= weeks || weeks <= 22 ){
                    return 2
                }
                if( 0 <= weeks || weeks <= 12){
                    return 1
                }
                else {
                    return 0
                }

        }
        else {
            return 0
        }
        
    console.log(diffDays + ' Days after LMP');
    }

    var form = {
        email:req.body.email,
        LMP: req.body.LMP,  
        EDD: getEDD(req.body.LMP),
        GA: GA(req.body.LMP),
        trimester: getTrimester(req.body.LMP),
        gravida: req.body.gravida,
        Parity: req.body.parity,
        abortion: req.body.abortion
    }
   
return pregnacyTrack.create(form)
    .then(doc => {
        return res.json({status:200, doc:doc})
    })
    .catch(err => {
        return res.json({status:500, err:err})
    })


})

router.post('/myData', (req, res) => {
    router.get()

/*****************************************************************
        Function for calculating GA                                  
*****************************************************************/

function GA(LMP){
    // var LMP =    "05/10/2018";
    var today = new Date();
    var LMP = new Date(LMP);

    var timeDiff = Math.abs(today.getTime() - LMP.getTime());
    // console.log(LMP)
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        if ( diffDays > 7 ){
            var days  = diffDays % 7;
                
            if(diffDays % 7 == 0){
               var weeks = diffDays/7
            }
            else {
                weekFraction = diffDays / 7;
                weekFractionToString = weekFraction.toString(),
                weeks = weekFraction - ('0.' + weekFractionToString.split('.').pop());
                weeks = weeks + " weeks " + days + " days"
            }
            return weeks
        }
        else{
            return diffDays
        }

    // console.log(diffDays + ' Days after LMP');
}
  
/*************************************************************************
         Function for calculating trimester
*************************************************************************/

function getTrimester(){
// var LMP =    "05/10/2018";
    var today = new Date();
    var LMP = new Date(LMP);

    var timeDiff = Math.abs(today.getTime() - LMP.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        if ( diffDays > 7 ){
            var 
                days  = diffDays % 7,
                weekFraction = diffDays / 7,
                weekFractionToString = weekFraction.toString(),
                weeks = weekFraction - ('0.' + weekFractionToString.split('.').pop());

                if(weeks > 23 ){
                    return 3
                }
                if( 13 <= weeks || weeks <= 22 ){
                    return 2
                }
                if( 0 <= weeks || weeks <= 12){
                    return 1
                }
                else {
                    return 0
                }

        }
        else {
            return 0
        }
        
    console.log(diffDays + ' Days after LMP');
}

    var form = {
        GA: GA(req.body.LMP),
        trimester: getTrimester(req.body.LMP),
    }
    return pregnacyTrack.findOneAndUpdate({email:req.body.email}, form)
        .then(doc => {
            return res.json({status:200, message: "your status", doc: doc})
        })
        .catch(err => {
            return res.json({status:500, message:"sorry a server side error has occured", err: err})
        })
})

router.get('/myDetails/:email', (req, res) => {
    return pregnacyTrack.find({email:req.params.email})
        .then( doc => {
            return res.json({status:200, message: "User's Details", doc: doc})
        })
        .catch( err => {
            return res.json({status: 500, message: "Sorry we can't serve your request at the momment", err: err})
        })
})

/******************
 * Export router  *
 ******************/
module.exports = router;

