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

var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))

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
mongoose.connect('mongodb://localhost:27017/testing-mapinc-1')

//SeedingData

app.get('/seedingdata', function(req,res){
  let newuser  = new Users({userEmail: "andrew@andrew.com", encryptedPassword: "halhlahlha"})
  newuser.role.push(1)
  let newspv  = new Users({userEmail: "inispv@andrew.com", encryptedPassword: "halhlahlha"})
  newspv.role.push(1)
  let newmap = new Maps({owner: newuser._id, businessName: "halo"})
  newmap.pinDrop.push({pinDropName: "branchku",position:{lat:"7", lng:"8"}, supervisor: newspv._id, inputTime: new Date()})

  newuser.save(function(err,result){
    newspv.save(function(err,result4){
      newmap.save(function(err2,result2){
        res.json({message: "berhasil"})
      })
    })
  })
})

app.get('/getseedingdata', function(req,res){
  Maps.findOne({}).populate('owner').populate('pinDrop.supervisor').exec(function(err,result){
    console.log(result)
    res.json(result)
  })
})

app.listen(port)
console.log('serving on port : ', port)
