var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var mongoose = require('mongoose');
const Maps = require('../models/maps.js')
const Users = require('../models/users.js')

describe('api get owner list', function(){
  it('the getownerlist api should return the data from database based on the criteria', function(){
    let testingowner = new Users({userEmail: "testing@only.com"})
    testingspv.encryptedPassword = testingowner.generateHash('halo')

    let testingspv = new Users({userEmail: "testingspv@only.com"})
    testingspv.encryptedPassword = testingspv.generateHash('halo')

    let testingpin = new Maps({owner: testingowner._id, businessName: "testingpurposeonly", pinDropName: "Branch Pengiriman 2", position: {lat: "8", lng: "7"}, supervisor: testingspv._id, inputTime: "2016-11-13T03:19:49.131Z"})
    testingpin.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "GT"})

    testingowner.save(function(err_saveowner, owner){
      testingspv.save(function(err_savespv, spv){
        testingpin.save(function(err_savepin, pin){
          chai.request('')
        })
      })
    })
  })
})
