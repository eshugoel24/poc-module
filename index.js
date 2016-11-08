"use strict";

var a = require("./lib/config");

module.exports = {
    "getUrl" : ()=>{
        return a.url;
    },
    "setUrl" : (url)=>{
        a.url = url;
    }
}