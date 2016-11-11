'use strict';

let restWrapper = require('./request-wrapper');
let Promise = require('bluebird');

const instanceManager = exports = module.exports = {};
let instance = null;

let createInstance = (url)=>{
    let options = {
        data: {},
        headers: {
            'Content-Type': 'application/json'
        } 
    };
    return restWrapper.post(url, options);
}

instanceManager.getInstance = (url)=>{
    return new Promise((resolve, reject) => {
        createInstance(url)
        .then(response=>{
            if(instance && instance != null && instance.result.modelInstanceId == response.result.modelInstanceId)
                return  resolve(instance);
            instance = response;
            resolve(instance);
        })
        .catch(error=>{
            reject(error);
        });
    });
}