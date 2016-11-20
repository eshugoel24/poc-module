'use strict';
import express from 'express';
import lib from './app.js'
import cookieParser from 'cookie-parser';

let app = express();
app.use(cookieParser());

lib.configure({
    CONFIG_SERVICE_URL: "http://172.16.2.177:8080"
});

app.use(express.static('./example/public'));

app.use((req, res, next)=>{
    console.log("deploy model inside server.js");
    res.setHeader(
			'Access-Control-Allow-Origin',
			'*');
    
    lib.deployModel()
    .then((response)=>{
        console.log("Model is deployed. Model name is "+response.result.modelName)
        next();
    })
    .catch((error)=>{
        console.log("error in deployment: "+error);
    });
});

app.get("/", (req, res)=>{
    res.sendfile("index.html");
})

app.get("/create", (req, res)=>{
    console.log("create server inside server.js");
    let instanceId = '';
    if(req.cookies.instance)
        instanceId = req.cookies.instance;
    lib.start(instanceId)
    .then((response)=>{
        res.cookie('instance',response, { maxAge: 900000, httpOnly: true });
        res.set({
            'Content-Type': 'application/json'
        });
        res.send(JSON.stringify({ status: 200 }));
    })
    .catch((err)=>{
        throw new Error('Some error file creating the instance');
    })
})

app.listen(3000, ()=>{
    console.log("Express is up and running on port 3000.");
});