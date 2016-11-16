'use strict';

import Promise from 'bluebird';

import RestWrapper from './request-wrapper';

class InstanceManager{
    constructor(){
        this.restWrapper = new RestWrapper();
    }

    createInstance(url){
        let options = {
            data: {},
            headers: {
                'Content-Type': 'application/json'
            } 
        };
        return this.restWrapper.post(url, options);
    }
}

export default new InstanceManager();