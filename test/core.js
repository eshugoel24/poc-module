const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const jsonData = require('./data');
const main = require("../index");
const url = require('url');

const testData = require('./data.json');

describe('Deploy the model file', () => {
  it('Set service URL', () => {
      main.configure({CONFIG_SERVICE_URL:jsonData.baseUrl});
  });

  it('Deploy default model file', () => {
    main.deployModel()
    .then(response=>{
      expect(response.status).equal(200);
    })
    .catch(error=>{
      throw error;
    });    
  });

  it('Deploy test.conf model file', () => {
    main.configure({CONFIG_MODEL_FILE:jsonData.modelFile});
    main.deployModel()
    .then(response=>{
      expect(response.status).equal(200);
    })
    .catch(error=>{
      throw error;
    });    
  });
});
