'use strict';
import express from 'express';
import lib from './app.js'
import cookieParser from 'cookie-parser';

let app = express();
app.use(cookieParser());

lib.configure({
    CONFIG_SERVICE_URL: "http://172.16.2.177:9000"
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
    
    lib.start(req, res)
    .then((response)=>{
        console.log("Process instance Id is "+response);

        res.set({
            'Content-Type': 'application/json'
        });
        res.send(JSON.stringify({ status: 200 }));
    })
    .catch((err)=>{
        throw new Error('Some error file creating the instance');
    })
})

app.post("/complete", (req, res)=>{
    let instanceId = '';
    if(req.cookies.instance)
        instanceId = req.cookies.instance;
    
    console.log("complete the askTransactionInfo task "+instanceId);

    lib.completeTask(req, res,{
        task: "askTransactionInfo",
        data: {
            "amountToTransfer": 1,
            "sourceAccountNumber": 2,
            "targetAccountNumber": 3
        }
    })
    .then((response)=>{
        res.send({ status: 200, response: response });
        console.log("Completed the task its response is :::  "+JSON.parse(response));
    })
    .catch((err)=>{
          throw new Error('Some error while completing the task');
    });
});

app.listen(3000, ()=>{
    console.log("Express is up and running on port 3000.");
});