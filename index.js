"use strict";

var main = require("./lib/main");
module.exports = main;

main.configure({
    CONFIG_SERVICE_URL : "http://172.16.2.177:8080"
});

main.deployModel("modelFile")
.then(response=>{

})
.catch(error=>{
    
});