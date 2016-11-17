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


  describe('/POST MARKER', () => {
        it('Add Marker', (done) => {
          let newmap = new Object({supervisor: 'test@test.com',pinDropName:'pindroptest', totalSales:1000, salesCond:'GT',lat:1,lng:1})
          chai.request(server)
              .post('/marker/addMarker')
              .send(newmap)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('pinDropName').eql('pindroptest');
                done();
              });
        });

    });
