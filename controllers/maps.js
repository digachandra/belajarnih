var Maps = require ('../models/maps')

module.exports = {
  listPin:listPin,
  getDetailsPin:getDetailsPin,
  mapList:mapList
}

function listPin(req,res,next){
    let owner = "582ac8caf0e19e56aaf8257c"
    let businessName = "goclean"
    let createdAt = "2016-11-15T08:35:22.115Z" // 2016-11-16T08:35:22.115Z
    // Maps.find({owner:owner,businessName:businessName},(err,data) => {
    //   res.json(data)
    // })
    Maps.find({owner:owner,businessName:businessName,createdAt:{ $eq : createdAt}}).sort({inputTime: -1}).exec(function(err,data){
      res.json(data)
    })
}
//
// Maps.find({owner: ownerId,businessName:businessName,inputTime:{ $gte : inputTime}}).sort({inputTime: -1}).exec(function(err,data){
//   res.json(data)
// })

function getDetailsPin(req,res,next){
  let pinId = "582ac8caf0e19e56aaf82580" //nannti ganti req.params.id
    Maps.findOne({_id:pinId},(err,data) => {
      res.json(data)
    })
}

function mapList(req,res,next) {
  let ownerId = "582ac8caf0e19e56aaf8257c"
  Maps.find({owner:ownerId}).distinct('businessName', function (error,data){
    let result = []
    data.forEach((business)=>{
      result.push({
        owner: ownerId,
        businessName: business
      })
    })
    res.json(result)
  })
}
//
// Maps.find({owner:ownerId}).sort({inputTime: -1}).exec(function(err,data){
//   res.json(data)
// })
