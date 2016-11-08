const assert = require('chai').should();
const httpMocks = require('node-mocks-http');
const main = require("../index");

const testData = require('./data.json');

describe('validate the function of main library', () => {
  it('Get the value of URL', () => {
    main.getUrl().should.equal('google.com');
  });

  it('Set the value to URL', () => {
    main.setUrl("yahoo.com");
  });

  it('Get the value of URL after set', () => {
    main.getUrl().should.equal('yahoo.com');
  });
});
