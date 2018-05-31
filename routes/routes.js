'use strict';

const _ = require('lodash');
const express = require('express');
const router = express.Router();
const Hospital = require('../models/hospital');

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
    
/******************
 * Export router  *
 ******************/
module.exports = router;

