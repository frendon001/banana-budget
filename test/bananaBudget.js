process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../dist');
chai.should();
chai.use(chaiHttp);

describe('Banana Budget', () => {
  /*
   * Test the /GET route
   */
  describe('/GET banana budget', () => {
    it('it should not GET totalCost without parameters', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('it should not GET totalCost with invalid startDate parameter', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=02-22-2019&numberOfDays=5')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('it should not GET totalCost with invalid numberOfDays parameter', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=02/22/2019&numberOfDays=six')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
    it('it should not GET totalCost with 0 numberOfDays as parameter', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=02/22/2019&numberOfDays=0')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    //Validate results with valid parameters
    it('it should GET totalCost of 0.05 for weekday startDate=03/07/2019&numberOfDays=1', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=03/07/2019&numberOfDays=1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('0.05');
          done();
        });
    });
    it('it should GET totalCost of 0.10 for weekday startDate=03/14/2019&numberOfDays=1', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=03/14/2019&numberOfDays=1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('0.10');
          done();
        });
    });
    it('it should GET totalCost of 0.15 for weekday startDate=03/21/2019&numberOfDays=1', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=03/21/2019&numberOfDays=1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('0.15');
          done();
        });
    });
    it('it should GET totalCost of 0.20 for weekday startDate=03/28/2019&numberOfDays=1', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=03/28/2019&numberOfDays=1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('0.20');
          done();
        });
    });
    it('it should GET totalCost of 0.25 for weekday startDate=03/29/2019&numberOfDays=1', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=03/29/2019&numberOfDays=1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('0.25');
          done();
        });
    });
    it('it should GET totalCost of 1.10 for weekday startDate=02/20/2019&numberOfDays=8', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=02/20/2019&numberOfDays=8')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('1.10');
          done();
        });
    });
    it('it should GET totalCost of 1.50 for startDate=02/20/2019&numberOfDays=15', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=02/20/2019&numberOfDays=15')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('1.50');
          done();
        });
    });
    it('it should GET totalCost of 2.20 for startDate=02/20/2019&numberOfDays=25', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=02/20/2019&numberOfDays=25')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('2.20');
          done();
        });
    });
    it('it should GET totalCost of 4.05 for startDate=02/20/2019&numberOfDays=40', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=02/20/2019&numberOfDays=40')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('4.05');
          done();
        });
    });
    it('it should GET totalCost of 4.60 for startDate=02/20/2019&numberOfDays=50', done => {
      chai
        .request(server)
        .get('/api/bananaBudget/?startDate=02/20/2019&numberOfDays=50')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('totalCost');
          res.body.should.have.property('totalCost').eql('4.60');
          done();
        });
    });
  });
});
