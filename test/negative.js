let mongoose = require("mongoose");
let ComparableJSON = require('../models/comparablejson');
let JSONDifferences = require('../models/jsondifferences');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('negative tests', () => {
  beforeEach((done) => {
    done();
  });

  /*
  * Test the /POST route, with NO data, left side
  */
 describe('/POST left NO data', () => {
    it('it should NOT POST a valid base64 data to the left side', (done) => {
      let data = {
        data: ""
      }
      chai.request(server)
      .post('/v1/diff/9/left')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });

  /*
  * Test the /POST route, with NO data, right side
  */
 describe('/POST right NO data', () => {
    it('it should NOT POST a valid base64 data to the right side', (done) => {
      let data = {
        data: ""
      }
      chai.request(server)
      .post('/v1/diff/10/right')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    });
  });
  
  /*
  * Test the /POST route, different data
  */
  describe('/POST left data', () => {
    it('it should POST a valid base64 data to the left side', (done) => {
      let data = {
        data: "ZGEua39nYWk="
      }
      chai.request(server)
      .post('/v1/diff/6/left')
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
      data: "ZGFua29nYWk="
    }
    chai.request(server)
    .post('/v1/diff/6/right')
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
  describe('/GET base64 different data', () => {
    it('it should GET all the base64 data', (done) => {
      chai.request(server)
      .get('/v1/diff/6')
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