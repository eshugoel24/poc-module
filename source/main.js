'use strict';

import url from 'Url';

import config from './config';
import modelInstaller from './model-installer';
import instanceManager from './instance-manager';
import taskService from "./task-service";

class Main{
    constructor(){
        
    }

    configure(defaultSettings){
        Object.assign(config, defaultSettings);
    }

    deployModel(){
        /*If model is already deployed, then we have to retun it back
        **Check that model is deployed or not by checking its modelName property
        */
        if(modelInstaller.checkModelDeployed()){
            console.log("Model is already deployed");
            return new Promise((resolve, reject)=>{
                return resolve(modelInstaller.getDeployedModelResponse());
            });
        }
        
        if(config.CONFIG_SERVICE_URL === '')
            throw new Error('Service Url can not be empty.');
        if(config.CONFIG_DEPLOY_PATH === '')
            throw new Error('Deploy Url can not be empty.');
        
        let deployUrl = url.resolve(config.CONFIG_SERVICE_URL,config.CONFIG_DEPLOY_PATH);
        return new Promise((resolve, reject)=>{
            modelInstaller.deployModel(config.CONFIG_MODEL_FILE, deployUrl)
            .then(response=>{
                return resolve(response);
            })
            .catch(error=>{
                return reject(error);
            });
        });
    }

    /*
    *@param instanceId, it is the value from cookie
    */
    start(instanceId){
        if(!instanceId || instanceId == null)
            instanceId = '';
        if(config.CONFIG_SERVICE_URL === '')
            throw new Error('Service Url can not be empty.');
        if(config.CONFIG_CREATE_INSTANCE === '')
            throw new Error('Create instance Url can not be empty.');
        if(modelInstaller.getModelName() == '')
            throw new Error('First deploy the model. There is no model deployed');
        
        let createInstancePath = config.CONFIG_CREATE_INSTANCE+"/"+modelInstaller.getModelName();

        if(instanceId !== ''){
            //createInstancePath = config.CONFIG_CREATE_INSTANCE+"/"+instanceId;
            return new Promise((resolve, reject)=>{
                return resolve(parseInt(instanceId));
            });
        }
            
        
        let createInstanceUrl = url.resolve(config.CONFIG_SERVICE_URL, createInstancePath);
        return new Promise((resolve, reject)=>{
            instanceManager.createInstance(instanceId, createInstanceUrl)
            .then(response=>{
                console.log("instance created and response id "+response.result.modelInstanceId);
                return resolve(response.result.modelInstanceId);
            })
            .catch(error=>{
                return reject(error);
            });
        });
    }

    completeTask(instanceId, requestData){
        if(!requestData.task || requestData.task == "")
            throw new Error('Task name cant be empty.');
        let instancePath = "/instance/"+instanceId;
        let completeTaskUrl = url.resolve(config.CONFIG_SERVICE_URL, instancePath);
        console.log("Complete task URL is "+completeTaskUrl);
        return new Promise((resolve, reject)=>{
            taskService.completeTask(completeTaskUrl, requestData)
            .then((response)=>{
                console.log("Successfully complete the task ");
                return resolve(response);
            })
            .catch((err)=>{
                return reject(err);
            })
        });
    }
}

export default new Main();