var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var mongoose = require('mongoose')
var server = require('../server.js')
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')


describe('/API SETUP PASSWORD', function(){
  before(function(done){
    Users.remove({userEmail: "testing@only.com"}, function(err1,result1){
      let testingspv = new Users({userEmail: "testing@only.com"})
      testingspv.encryptedPassword = testingspv.generateHash('lama')
      testingspv.save(function(err,spv){
        done()
      })
    })
  })
  after(function(done){
    Users.findOne({userEmail: "testing@only.com"}, function(err,spv){
      spv.remove()
      spv.save(function(err,removed_spv){
        done()
      })
    })
  })
  it("should setup the correct user's password", function(done){
    let user = new Users
    Users.findOne({userEmail: "testing@only.com"}, function(err,spv){
      chai.request(server).post('/api/supervisor/setuppassword').send({userid: spv._id, password: 'baru'}).end(function(e, result){
        Users.findOne({userEmail: "testing@only.com"}, function(err,new_spv){
          expect(new_spv.validPassword('baru')).to.be.true
          done()
        })
      })
    })
  })
})
