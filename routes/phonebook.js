var express = require('express');
var bodyParser = require('body-parser');
var mongoose= require("mongoose");
var cont = require("../model/contact");
var authenticate=require("../authenticate");

var contactRouter = express.Router();

contactRouter.use(bodyParser.json());

contactRouter.route('/')
     .get(function (req, res, next) {
        cont.find({})
        .then((lead)=>{
            res.statusCode=200;
            res.setHeader("Content-Type","application/json");
            console.log(lead);
            res.json(lead)
        },(err)=>next(err))

        .catch((err)=>next(err));
    })

    .post(authenticate.verifyUser,function (req, res, next) {
        cont.create(req.body)
        .then((lead)=>{
            res.statusCode=200;
            res.setHeader("Content-Type","application/json");
            console.log(lead);
            res.json(lead)
        },(err)=>next(err))

        .catch((err)=>next(err));
    })

    .delete(authenticate.verifyUser,function (req, res, next) {
        cont.remove({})
        .then((lead)=>{
            res.statusCode=200;
            res.setHeader("Content-Type","application/json");
            console.log(lead);
            res.json(lead)
        },(err)=>next(err))

        .catch((err)=>next(err));
    });

contactRouter.route('/:name')

.get(function (req, res, next) {
    cont.findOne({name:req.params.name})
    .then((lead)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        
        res.json(lead)
    },(err)=>next(err))

    .catch((err)=>next(err));
})

.put(authenticate.verifyUser,function (req, res, next) {
    cont.findOneAndUpdate(req.params.name,{$set:req.body},{new:true})
    .then((lead)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        console.log(lead);
        res.json(lead);
    },(err)=>next(err))

    .catch((err)=>next(err));
})

.delete(authenticate.verifyUser,function (req, res, next) {
    cont.findOneAndDelete(req.params.name)
    .then((lead)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        console.log(lead);
        res.json(lead);
    },(err)=>next(err))

    .catch((err)=>next(err));
});

contactRouter.route('/:email')

.get(function (req, res, next) {
  cont.findOne({email:req.params.email})
  .then((lead)=>{
      res.statusCode=200;
      res.setHeader("Content-Type","application/json");
      
      res.json(lead)
  },(err)=>next(err))

  .catch((err)=>next(err));
})

.put(authenticate.verifyUser,function (req, res, next) {
  cont.findOneAndUpdate(req.params.email,{$set:req.body},{new:true})
  .then((lead)=>{
      res.statusCode=200;
      res.setHeader("Content-Type","application/json");
      console.log(lead);
      res.json(lead);
  },(err)=>next(err))

  .catch((err)=>next(err));
})

.delete(authenticate.verifyUser,function (req, res, next) {
  cont.findOneAndDelete(req.params.email)
  .then((lead)=>{
      res.statusCode=200;
      res.setHeader("Content-Type","application/json");
      console.log(lead);
      res.json(lead);
  },(err)=>next(err))

  .catch((err)=>next(err));
});

module.exports = contactRouter;
