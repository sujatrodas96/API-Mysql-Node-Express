const express = require('express');
const cors = require('cors');
const port = 3032;
const myuserrouts = require('./Router/routes');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/data', myuserrouts);

app.get('/',(req,res)=>{
    res.send('<h1>Hllo FifthApi from Fileupload with MYSQL</h1>');
});

app.listen(port,()=>{
    console.log(`server is listeing at ${port}`);
});