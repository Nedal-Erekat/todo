'use strict';
require('dotenv').config();

const express = require('express');
const pg = require('pg');
const methodOverride = require('method-override');
const superagent = require('superagent');


const app=express();
app.use(express.static('./public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');

const PORT=process.env.PORT;
const client=new pg.Client(process.env.DATABASE_URL);

app.get('/', loadTasks);
app.get('/form',taskForm);
app.post('/addTotasks',addTotasks);
app.delete('/delet/:id',deleteTask);
app.post('/edit/:id',editform);

function editform(req,res) {
    let sql=`select * from tasks where id=${req.params.id};`;
    client.query(sql)
    .then(data=>{

        res.render('edit',{task:data.rows});
    })
    
}
function updateTask(req,res) {
    let {task,duedate,name}=req.body;
    let sql=`update tasks set task=$1,duedate=$2,name=$3 where id=${req.params.id};`;
    let values=[task,duedate,name];
    client.query(sql,values)
    .then(()=>{
        res.redirect('/');
    })
}
function deleteTask(req,res) {
    let sql=`delete from tasks where id=${req.params.id};`;
    client.query(sql)
    .then(()=>{
        res.redirect('/');
    })
}

function addTotasks(req,res) {
    let {task,duedate,name}=req.body;
    let sql = `insert into tasks (task,duedate,name) values ($1,$2,$3);`;
    let values=[task,duedate,name];
    client.query(sql,values)
    .then(()=>{
        res.redirect('/');
    })
};

function taskForm(req,res) {
    res.render('form')
}

function loadTasks(req,res) {
    let sql=`select * from tasks;`;
    client.query(sql)
    .then(data=>{
        console.log('hereeeeeeeeee');
        // res.json(data.rows)
        res.render('index',{allTasks : data.rows})
    })
}


client.connect()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`listen on PORT ${PORT}`);
    })
})


