'use strict';

const Promise = require('bluebird');
const rest = require('restler');

const requestWrapper = exports = module.exports = {};

requestWrapper.get = (options) => {
    /*axios.get(options.url,{
        params: options.params
    })
    .then((response) => {

    })
    .catch((error) => {

    });*/
}

requestWrapper.post = (url, options) => {
    return new Promise((resolve, reject) => {
        rest.post(url, options)
        .on('complete', (response) => {
            return resolve(response);
        });
    });
}