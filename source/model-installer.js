'use strict';

import Promise from 'bluebird';
import fs from 'fs';

import RestWrapper from './request-wrapper';

class ModelInstaller{
    constructor(){
        this.restWrapper = new RestWrapper();
    }

    deployModel(filePath, deployUrl){
        let fileContent = fs.readFileSync(filePath, 'utf8');
        let options = {
            data: String(fileContent),
            headers: {
                'Content-Type': 'application/hocon'
            } 
        };
        return this.restWrapper.post(deployUrl, options);
    }
}

export default new ModelInstaller();