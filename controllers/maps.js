var Maps = require ('../models/maps')

module.exports = {
  listPin:listPin,
  getDetails:getDetails
}


function listPin(req,res,next){
    Maps.find({},(err,data) => {
      res.json(data)
    })
}


function getDetails(req,res,next){
  let mapId = "582a7ed422733e48e07efd07" //nannti ganti req.params.id
    Maps.findOne({_id:mapId},(err,data) => {
      res.json(data)
    })
}
