'use strict'
var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')
mongoose.connect('mongodb://localhost:27017/testing')
var should = chai.should();
var agent = chai.request.agent('http://localhost:3000')



describe('Testing Map list ', function() {
    before(function(done){
      Users.remove({userEmail: "testing41@only.com"}, function(err1,result1){
        let testingUser = new Users({userEmail: "testing41@only.com",role:0})
        testingUser.encryptedPassword = testingUser.generateHash('lama')
        testingUser.save(function(err,user){
          done()
        })
      })
    })
    after(function(done){
      agent
          .post('/api/users/logout')
          .end(function(err,res){
            done()
          })
    })
    it('should list pin on [GET] ', function(done) {
      console.log("jalanin login");
      agent
           .post('/api/users/login')
           .send({
               "email": "testing41@only.com",
               "password": "lama",
               "confirmPassword":"lama",
               "role":0
           })
           .end(function(err,res) {
             console.log("before jalan");
             agent
                  .get('/api/users/listpin')
                  .end(function(err,res) {
                   console.log(res, "Ini hasil response");
                    done()
                  });
           });




    });

});;
