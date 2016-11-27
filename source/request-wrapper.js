'use strict';

import Promise from 'bluebird';
import rest from 'restler';

export default class RequestWrapper{
    constructor(){

    }

    get(url){
        return new Promise((resolve, reject) => {
            rest.get(url)
            .on('complete', (response) => {
                return resolve(response);
            });
        });
    }

    post(url, options){
        return new Promise((resolve, reject) => {
            rest.post(url, options)
            .on('complete', (response) => {
                return resolve(response);
            });
        });
    }

    patch(url, options){
        return new Promise((resolve, reject) => {
            rest.patch(url, options)
            .on('complete', (response) => {
                return resolve(response);
            })
            .on("error", (err, response)=>{
                return reject(err);
            })
            .on("timeout",(ms)=>{
                return reject({"msg": "Time out"});
            });
        });
    }
}