var bodyParser = require("body-parser");
const con = require('../data/db');

const homepage=(req, res) => {
    res.send("index.html");
}


const deleteData=(req, res) => {
    const deleteQuery="delete from `expense_table` where id=?";
    con.query(deleteQuery,[req.query.id],(err,rows)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/data")
        }
    })
}

const updateData=(req,res)=>{
    con.query("select * from `expense_table` where id=?",[req.query.id],(err,eachRow)=>{
        if(err){
            console.log(err);
        }
        else{
            result=JSON.parse(JSON.stringify(eachRow[0]))
            res.render("edit.ejs",{result})
        }
    })
}

const finalUpdate=(req,res)=>{
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
}

const getData= (req, res) => {
    con.query("select * from `expense_table`", (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("read.ejs",{rows});
        }
    })
}

const createData=(req,res)=>{
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
}

module.exports= {homepage, deleteData, updateData, finalUpdate, getData, createData};