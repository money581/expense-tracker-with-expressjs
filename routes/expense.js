const express = require('express');
const router=express.Router();
var bodyParser = require("body-parser");
const {homepage, deleteData, updateData, finalUpdate, getData, createData}=require('../controllers/expensetrack')

const con = require('../data/db');

router.get("/", homepage);

router.get("/delete-data",deleteData);
//update 
router.get("/update-data",updateData)
router.post('/final-update',finalUpdate);

router.get("/data",getData)
//create 
router.post('/create',createData);


module.exports=router;