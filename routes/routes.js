'use strict';

/**
 * Dependencies
*/
const
    express = require ('express'),
    router = express.Router(),
    pregnacyTrack = require('../models/pregnacyTracker');

router.post('/pregnacyTrackiing', (req, res) => {

//=========================================================================
//  Function for calculating EDD
//=========================================================================

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

//=========================================================================
//  Function for calculating GA
//=========================================================================

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
      
//=========================================================================
//  Function for calculating trimester
//=========================================================================

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

//=========================================================================
//  Function for calculating GA
//=========================================================================

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
  
//=========================================================================
//  Function for calculating trimester
//=========================================================================

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
        GA: GA(doc.LMP),
        trimester: getTrimester(doc.LMP),

    }
    return pregnacyTrack.findOneAndUpdate({userName:req.body.userName}, form)
        .then(doc => {
            return res.json({status:200, message: "your status", doc: doc})
        })
        .catch(err => {
            return res.json({status:500, message:"sorry a server side error has occured", err: err})
        })
})


module.exports = router