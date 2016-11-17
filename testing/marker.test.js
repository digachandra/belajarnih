' use strict'

var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');
let server = require('../server');
var num
let mongoose = require("mongoose");
let Maps = require('../models/maps');
let Users = require('../models/users');

chai.should()
chai.use(chaiHttp);


  describe('/MARKER', () => {
        it('Add Marker', (done) => {
        Users.findOne({'userEmail':'test@test.com'}, function(err,user){
          let newmap = new Object({supervisor: 'test@test.com',pinDropName:'pindroptest', totalSales:1000, salesCond:'GT',lat:'1',lng:'1', businessName:'test', userID:user._id})
          chai.request(server)
              .post('/marker/addMarker')
              .send(newmap)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('pinDropName').eql('pindroptest');
                done();
              });
          })
        });
        it('Edit Marker', (done) => {
          Maps.findOne({'position.lng':1,'position.lat':1}, function(err,pindrop){
            Users.findOne({'userEmail':'test@test.com'}, function(err,user){
              let newmap = new Object({userID: user._id,supervisor:'test@test.com',lat:"1",lng:"1", businessName:'test2', fieldName:'fieldTest2', pinDropName:'pindropnameupdate'})
              chai.request(server)
                  .put('/marker/addMarker')
                  .send(newmap)
                  .end((err, res) => {
                      res.should.have.status(200);
                      res.body.should.be.a('object');
                      res.body.should.have.property('pinDropName').eql('pindropnameupdate');
                    done();
                  });
            })
          })
        });
        it('Delete Marker', (done) => {
          Users.findOne({'userEmail':'test@test.com'}, function(err,user){
            let data = new Object({userID: user._id,lat:'1',lng:'1'})
                chai.request(server)
                    .delete('/marker/addMarker')
                    .send(data)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                      done();
                    });
          })
        });

    });
