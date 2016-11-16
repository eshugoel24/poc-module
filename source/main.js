'use strict';

import url from 'Url';

import config from './config';
import modelInstaller from './model-installer';
import instanceManager from './instance-manager';

let deployedModel = {};

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
        if(deployedModel.hasOwnProperty("result")){
            if(deployedModel.status === 200 && deployedModel.result.modelName !== ""){
                return new Promise((resolve, reject)=>{
                    return resolve(deployedModel);
                });
            }
        }

        if(config.CONFIG_SERVICE_URL === '')
            throw new Error('Service Url can not be empty.');
        if(config.CONFIG_DEPLOY_PATH === '')
            throw new Error('Deploy Url can not be empty.');
        
        let deployUrl = url.resolve(config.CONFIG_SERVICE_URL,config.CONFIG_DEPLOY_PATH);

        return new Promise((resolve, reject)=>{
            modelInstaller.deployModel(config.CONFIG_MODEL_FILE, deployUrl)
            .then(response=>{
                Object.assign(deployedModel, response);
                return resolve(response);
            })
            .catch(error=>{
                return reject(error);
            });
        });
    }


}

export default new Main();