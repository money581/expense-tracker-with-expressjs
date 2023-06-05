const express = require('express');
const app = express();
const dotenv = require('dotenv');
var bodyParser = require("body-parser");
const router=require('./routes/expense');
dotenv.config();

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 app.use('/',router);




app.listen(process.env.PORT || 5000, (error) => {
    if (error) throw error;
    console.log(`server running on ${process.env.PORT}`);
});