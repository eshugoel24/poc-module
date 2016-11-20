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
        console.log("Inside request wrapper, url is "+url+"----------and options are "+JSON.stringify(options));
        return new Promise((resolve, reject) => {
            rest.post(url, options)
            .on('complete', (response) => {
                console.log("response of a post request "+JSON.stringify(response));
                return resolve(response);
            });
        });
    }
}