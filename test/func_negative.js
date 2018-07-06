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
  * Test the /POST route, different data same size
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
        res.body.should.have.property('equals').eql(false);
        res.body.should.have.property('equalSize').eql(true);
        res.body.should.have.property('differences');
        done();
      });
    });
  });
});


/*
  * Test the /POST route, different data different size
  */
 describe('/POST left data', () => {
    it('it should POST a valid base64 data to the left side', (done) => {
      let data = {
        data: "ZGEuHn8a39nYWk="
      }
      chai.request(server)
      .post('/v1/diff/8/left')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql(8);
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
    .post('/v1/diff/8/right')
    .send(data)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('id').eql(8);
      res.body.should.have.property('right');
      done();
    });
  });
});
  describe('/GET base64 different data', () => {
    it('it should GET all the base64 data', (done) => {
      chai.request(server)
      .get('/v1/diff/8')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('equals').eql(false);
        res.body.should.have.property('equalSize').eql(false);
        res.body.should.have.property('differences');
        done();
      });
    });
  });


  /*
  * Test the /POST route, then try to get diff with only left data
  */
 describe('/POST left data', () => {
  it('it should POST a valid base64 data to the left side', (done) => {
    let data = {
      data: "ZGEuHn8a39nYWk="
    }
    chai.request(server)
    .post('/v1/diff/9/left')
    .send(data)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('id').eql(9);
      res.body.should.have.property('left');
      done();
    });
  });
});
describe('/GET base64 different data', () => {
  it('it should GET all the base64 data', (done) => {
    chai.request(server)
    .get('/v1/diff/9')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('equals').eql(false);
      res.body.should.have.property('equalSize').eql(false);
      res.body.should.have.property('differences');
      done();
    });
  });
});

/*
  * Test the /POST route, then try to get diff with only right data
  */
 describe('/POST right data', () => {
  it('it should POST a valid base64 data to the right side', (done) => {
    let data = {
      data: "ZGEuHn8a39nYWk="
    }
    chai.request(server)
    .post('/v1/diff/10/right')
    .send(data)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('id').eql(10);
      res.body.should.have.property('right');
      done();
    });
  });
});
describe('/GET base64 different data', () => {
  it('it should GET all the base64 data', (done) => {
    chai.request(server)
    .get('/v1/diff/10')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('equals').eql(false);
      res.body.should.have.property('equalSize').eql(false);
      res.body.should.have.property('differences');
      done();
    });
  });
});