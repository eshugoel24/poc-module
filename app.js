"use strict";

import app from "./source/main";

app.configure({
    CONFIG_SERVICE_URL: "http://172.16.2.177:8080"
});

app.deployModel()
.then((response)=>{
    console.log(response.result.modelName+"  :1:  "+response.result.deploymentId);
})
.catch((error)=>{
    console.log("error in deployment");
});

