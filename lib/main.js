let config = require('./config');
let modelInstaller = require('./model-installer');
let instanceManager = require('./instance-manager');

let url = require('url');

let deployedModel = {};

module.exports = {
    configure : (defaultSettings={})=>{
        Object.assign(config, defaultSettings);
    },
    deployModel : ()=>{
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
    },
    createInstance: ()=>{
        let createInstanceUrl = url.resolve(config.CONFIG_SERVICE_URL, config.CONFIG_CREATE_INSTANCE+"/"+deployedModel.result.modelName);
        return instanceManager.getInstance(createInstanceUrl);
    }
}