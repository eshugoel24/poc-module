let config = require('./config');
let modelInstaller = require('./model-installer');
let url = require('url');

module.exports = {
    configure : (defaultSettings={})=>{
        Object.assign(config, defaultSettings);
    },
    deployModel : ()=>{
        let deployUrl = url.resolve(config.CONFIG_SERVICE_URL,config.CONFIG_DEPLOY_PATH);
        return modelInstaller.deployModel(config.CONFIG_MODEL_FILE, deployUrl);
    }
}