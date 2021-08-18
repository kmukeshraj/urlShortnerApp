const express = require('express');
const app = express();
const mongoose= require('mongoose');
const createHttpError = require('http-errors');
const path = require('path');
const urlShortnerRoutes = require('./Routes/appRoute');

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    }); 


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}));


mongoose.connect('mongodb://localhost:27017', {
    db: 'url-shortner',
    useNewUrlParser:true
   
}).then(()=> console.log('mongoose connected'))
.catch((error)=> console.log('Error Connecting...'))


app.use('/urlShotner', urlShortnerRoutes);


// 404 handler and pass to error handler
app.use((req, res, next)=> {
 const err = new Error("Not Found");
 err.status = 404;
 next(err);

})

// Error Handler
app.use((err,req,res,next) => {
res.status(err.status || 500);
res.send({
    error:{
        status:err.status || 500,
        message: err.message
    }
})
});

app.listen(4500,()=>{
    console.log('expr 4500');
})












// const http=require('http');
// const server=http.createServer((req,res) => {
// res.write('i m listening');
// res.end();
// })

// server.listen(3001,()=>{
//     console.log('started on 3000')
// })