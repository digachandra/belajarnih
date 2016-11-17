'use strict'
var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')
var should = chai.should();
mongoose.connect('mongodb://localhost:27017/testing')



describe('Testing Login using passport', function() {

    before(function(done){
      Users.remove({userEmail: "testing@only.com"}, function(err1,result1){
        let testingUser = new Users({userEmail: "testing@only.com",role:0})
        testingUser.encryptedPassword = testingUser.generateHash('lama')
        testingUser.save(function(err,user){
          done()
        })
      })
    })
    after(function(done){
      Users.findOne({userEmail: "testing@only.com"}, function(err,user){
        user.remove()
        user.save(function(err,removed_usr){
          done()
        })
      })
    })
    it('When Login , Should redirects to /api/users/login ', function(done) {
      chai.request('http://localhost:3000')
           .post('/api/users/login')
           .send({
               "email": "testing@only.com",
               "password": "lama",
               "confirmPassword":"lama",
               "role":0
           })
           .end(function(err,res) {
             res.should.have.status(200);
             res.redirects[0].should.equal('http://localhost:3000/api/users/home')
             expect(err).to.be.null;
             done()
           });
    });
});
describe('Testing Register using passport', function() {
    after(function(done){
      Users.findOne({userEmail: "testing@only.com"}, function(err,user){
        user.remove()
        user.save(function(err,removed_usr){
          done()
        })
      })
    })
    it('When Register , Should redirects to /login ', function(done) {
      chai.request('http://localhost:3000')
           .post('/api/users/register')
           .send({
               "email": "testing@only.com",
               "password": "lama",
               "confirmPassword":"lama",
               "role":0
           })
           .end(function(err,res) {
             res.should.have.status(200);
             res.redirects[0].should.equal('http://localhost:3000/login')
             expect(err).to.be.null;
             done()


           });
    });

});
