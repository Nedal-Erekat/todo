'use strict';
require('dotenv').config();

const pg = require('pg');
const client=new pg.Client(process.env.DATABASE_URL);

function loadTasks(req,res) {
    console.log(req.query.list);
    let check=req.query.list;

    let sql=`select * from tasks;`;
    if(check && check!='all'){
        sql=`select * from tasks where name='${req.query.list}';`;
    }
    let sql2=`select distinct name from tasks;`;
    client.query(sql)
    .then(data=>{
        console.log('here');
        client.query(sql2)
        .then(result=>{
            res.render('index',{allTasks : data.rows, nameList:result.rows})
        })
    })
}

module.exports= loadTasks;