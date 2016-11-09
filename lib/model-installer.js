'use strict';

let Promise = require('bluebird');
let fs = require('fs');
let restWrapper = require('./request-wrapper');

const modelInstaller = exports = module.exports = {};

modelInstaller.deployModel = (modelFile, deployUrl)=>{
    let fileContent = fs.readFileSync(modelFile, 'utf8');
    let options = {
        data: String(fileContent),
        headers: {
            'Content-Type': 'application/hocon'
        } 
    };
    
    return restWrapper.post(deployUrl, options);
}