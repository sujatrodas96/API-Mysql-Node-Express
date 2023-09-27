const express = require('express');
const multer = require('multer');
const conn = require('../db/db_con');

const dataupload = multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname+'_'+Date.now()+'.jpg');
    },
    destination: './public/assets'
});

const datastore = multer({storage:dataupload});
const myuserrouts = express.Router();
const base_url = require('../base_url');

myuserrouts.post('/register',datastore.single('photo'),(req,res)=>{
    var Sql = `insert into users(name,phone,email,pass,profile_pic)
    values ('${req.body.name}','${req.body.phone}','${req.body.email}','${req.body.pass}','${base_url}/assets/${req.file.filename}')`;

    conn.query(Sql,(error,result,field)=>{
        if(error) res.status(200).json({'error':error.sqlMessage});
        else 
        {
            if(result.affectedRows == 1)
            {
                res.status(200).json({'message':'success'});
            }
            else{
                res.status(200).json({'message':'didnt store data into database'});
            }
        }
    });
});

myuserrouts.get('/list',(req,res)=>{
    var Sql = 'select * from users';
    conn.query(Sql,(error,result,field)=>{
        if(error) res.status(200).json({'error':error.sqlMessage});
        else 
        {
            res.status(200).json(result);
        }
    });
});

module.exports = myuserrouts;
console.log('Router is ready to use');