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



describe('Testing', function() {
    // it('should list pin on [GET] /api/maps/listpin ', function(done) {
    //     chai.request('http://localhost:3000')
    //         .get('/api/maps/listpin')
    //         .end(function(err, res) {
    //           console.log("Ini Res.body testing",res.body);
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body[0].should.have.property('_id');
    //             res.body[0].should.have.property('businessName');
    //             res.body[0].should.have.property('pinDropName');
    //             res.body[0].should.have.property('position');
    //             res.body[0].position.should.have.property('lat');
    //             res.body[0].position.should.have.property('lng');
    //             res.body[0].should.have.property('supervisor');
    //             res.body[0].should.have.property('inputTime');
    //             res.body[0].should.have.property('listField');
    //             res.body[0].should.have.property('createdAt');
    //             res.body[0].should.have.property('updatedAt');
    //             expect(err).to.be.null;
    //             done();
    //         });
    // });
    before(function(done){
      Users.remove({userEmail: "lols@only.com"}, function(err1,result1){
        console.log("ini result1",result1);
        chai.request('http://localhost:3000')
             .post('/api/users/register')
             .send({
                 "email": "lols@only.com",
                 "password": "lama",
                 "confirmPassword":"lama",
                 "role":0
             })
             .end(function(err,res) {
                console.log("dah dijalankan register",res);
                  done()
             });
        // let testingUser = new Users({userEmail: "testing@only.com",role:0})
        // testingUser.encryptedPassword = testingUser.generateHash('lama')
        // testingUser.save(function(err,user){
        //   console.log('user testing',user)
        //   done()
        // })
      })
    })
    after(function(done){
      Users.findOne({userEmail: "lols@only.com"}, function(err,user){
        user.remove()
        user.save(function(err,removed_usr){
          done()
        })
      })
    })
    it('should list pin on [GET] /api/maps/listpin ', function(done) {
      console.log("test jalan");
      done()
      agent
           .post('/api/users/login')
           .send({
               "email": "testing@only.com",
               "password": "lama",
               "confirmPassword":"lama",
               "role":0
           })
           .end(function(err,res) {
             console.log(res );
             console.log("response",res);
             console.log(res.redirects[0]);
             res.redirects[0].should.equal('http://localhost:3000/api/users/home')
              done()
           });
    });



});;
