let mongoose = require("mongoose");
let ComparableJSON = require('../models/comparablejson');
let JSONDifferences = require('../models/jsondifferences');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('positive tests', () => {
  beforeEach((done) => {
    done();
  });
  
  /*
  * Test the /POST route, equal data
  */
  describe('/POST left data', () => {
    it('it should POST a valid base64 data to the left side', (done) => {
      let data = {
        data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      }
      chai.request(server)
      .post('/v1/diff/5/left')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('left');
        done();
      });
    });
  });
 describe('/POST right data', () => {
  it('it should POST a valid base64 data to the right side', (done) => {
    let data = {
      data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
    }
    chai.request(server)
    .post('/v1/diff/5/right')
    .send(data)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('id');
      res.body.should.have.property('right');
      done();
    });
  });
});
  describe('/GET base64 equal data', () => {
    it('it should GET all the base64 data', (done) => {
      chai.request(server)
      .get('/v1/diff/5')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('equals');
        res.body.should.have.property('equalSize');
        res.body.should.have.property('differences');
        done();
      });
    });
  });
});