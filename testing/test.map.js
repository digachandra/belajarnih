' use strict'

var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');
let server = require('../server');
var num
let mongoose = require("mongoose");
let Maps = require('../models/maps');

chai.should()
chai.use(chaiHttp);


  describe('/POST MAP', () => {
        it('Add Map', (done) => {
          let newmap = new Maps({businessName: 'test'})
          chai.request(server)
              .post('/map/addMap')
              .send(newmap)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('businessName').eql('test');
                done();
              });
        });
    });
