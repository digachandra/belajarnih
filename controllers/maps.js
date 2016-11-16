var Maps = require ('../models/maps')

module.exports = {
  listPin:listPin,
  getDetailsPin:getDetailsPin,
  mapList:mapList
}

function listPin(req,res,next){
    let ownerid = req.session.passport.user
    Maps.findById(req.params.id ,function (err, map) {
      let businessName = map.businessName
      let start = req.body.selectedDate
      let end = new Date(req.body.selectedDate)
      end.setHours(23)
      end.setMinutes(59)

      Maps.find({owner:ownerid,businessName:businessName,createdAt:{"$gte": new Date(start), "$lt": end}}).populate('supervisor').sort({inputTime: -1}).exec(function(err,data){
        res.json(data)
      })
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
  let ownerId = req.session.passport.user
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
