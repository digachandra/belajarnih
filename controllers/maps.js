var Maps = require ('../models/maps')

module.exports = {
  selectPin:selectPin
}


function selectPin(req,res,next){
  let ownerId = "58299ad3baff8813d5911300"
    Maps.find({owner:ownerId},(err,data) => {
      res.json(data)

    })
}
