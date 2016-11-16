'use strict';

import Promise from 'bluebird';
import fs from 'fs';

import RestWrapper from './request-wrapper';

let deployedModel = {};

let _isDeployedModelExists = (model)=>{
    if(model.hasOwnProperty("result")){
            if(model.status === 200 && model.result.modelName !== ""){
                return true
            }
            return false;
        }//end of if
        return false;
}

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
        return this.restWrapper.post(deployUrl, options).then((response)=>{
            Object.assign(deployedModel, response);
            return deployedModel; 
        });
    }

    checkModelDeployed(){
        return _isDeployedModelExists();
    }

    getDeployedModelResponse(){
        if(_isDeployedModelExists())
            return deployedModel;
        return {};
    }

    getModelName(){
        if(_isDeployedModelExists())
            return deployedModel.result.modelName;
        return "";
    }

    getModelDeploymentId(){
        if(_isDeployedModelExists())
            return deployedModel.result.deploymentId;
        return 0;
    }
}

export default new ModelInstaller();