const express = require('express');
const app = express();
const dotenv = require('dotenv');
var bodyParser = require("body-parser");
dotenv.config();

const con = require('./data/db');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.redirect("/data");
});

app.get("/delete-data", (req, res) => {
    const deleteQuery="delete from `expense_table` where id=?";
    con.query(deleteQuery,[req.query.id],(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/data")
        }
    })
});
//update 
app.get("/update-data",(req,res)=>{
    con.query("select * from `expense_table` where id=?",[req.query.id],(err,eachRow)=>{
        if(err){
            console.log(err);
        }
        else{
            result=JSON.parse(JSON.stringify(eachRow[0]))
            res.render("edit.ejs",{result})
        }
    })
})
app.post('/final-update',(req,res)=>{
    const id = req.body.hidden_id;
    const Amount = req.body.Amount;
    const Description = req.body.Description;
    const Category = req.body.Category;
    try {

        con.query("update expense_table set Amount=?, Description=?, Category=? where id=?", [Amount,Description,Category,id], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/data');
            }
        });
    }catch(err){
console.log(err);
    }
});

app.get("/data", (req, res) => {
    con.query("select * from `expense_table`", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("read.ejs",{rows});
        }
    })
})
//create 
app.post('/create',(req,res)=>{
    const Amount = req.body.Amount;
    const Description = req.body.Description;
    const Category = req.body.Category;
    try {

        con.query("INSERT INTO `expense_table` (Amount,Description,Category)  VALUES(?,?,?)", [Amount,Description,Category], (err, rows) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/data');
            }
        });
    }catch(err){
console.log(err);
    }
});


app.listen(process.env.PORT || 5000, (error) => {
    if (error) throw error;
    console.log(`server running on ${process.env.PORT}`);
});