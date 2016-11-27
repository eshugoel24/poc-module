'use strict';

import Promise from 'bluebird';
import config from './config';

import RestWrapper from './request-wrapper';

class TaskService{
    constructor(){
        this.restWrapper = new RestWrapper();
    }

    completeTask(url, data){
        if(!data.task || data.task =="")
            throw new Error('Task name cant be empty.');
        url = url+"/task/"+data.task+"/"+config.CONFIG_COMPLETE_TASK;
        let options = {
            data: data.data | {},
            headers: {
                'Content-Type': 'application/json'
            } 
        };
        return this.restWrapper.patch(url, options);
    }
}

export default new TaskService();