const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const Users = require('./models/users.js')
const Maps = require('./models/maps.js')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const path = require('path')
const apiSupervisor = require('./routes/apisupervisor.js')

var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))
app.set('view-engine','ejs')
app.use(cors())
app.use(morgan())
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', express.static(path.join(__dirname, 'public')))
mongoose.connect('mongodb://localhost:27017/testing-mapinc-5')

app.use('/api/supervisor', apiSupervisor)

//SeedingDataUser
app.get('/seedingdata', function(req,res){
  let newuser  = new Users({userEmail: "andrew@andrew.com", encryptedPassword: "halhlahlha"})
  let newspv  = new Users({userEmail: "inispv@andrew.com", encryptedPassword: "halhlahlha"})
  newuser.save(function(err,result){
    newspv.save(function(err,result4){
      let newmap = new Maps({owner: newuser._id, businessName: "halo", pinDropName: "BranchMana", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
      newmap.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt"})
      newmap.save(function(err2,result2){
        let newmap2 = new Maps({owner: newuser._id, businessName: "halo", pinDropName: "BranchMana 2", position: {lat: "8", lng: "7"}, supervisor: newspv._id, inputTime: new Date()})
        newmap2.listField.push({fieldName: "sales", fieldType: "number", targetValue: 700, isPass: false, targetComparsion: "gt" })
        newmap2.save(function(err3,result3){
          res.json({message: "seed user berhasil"})
        })
      })
    })
  })
})

app.get('/getseedingdata', function(req,res){
  Maps.find({}).populate('owner').populate('supervisor').exec(function(err,result){
    res.json(result)
  })
})

app.post('/postdata', function(req,res){
  Maps.findOne({}, function(err,pin){
    pin.listField[0].value = req.body.value
    pin.save(function(err,newPin){
      res.json(pin)
    })
  })
})

app.listen(port)
console.log('serving on port : ', port)
