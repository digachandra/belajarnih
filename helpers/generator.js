var Maps = require('../models/maps.js')




exports.generate = function () {
  let startDate = new Date()
  let dateMidnight = new Date(startDate)

  startDate.setSeconds(0);
  startDate.setHours(0);
  startDate.setMinutes(0);

  dateMidnight.setHours(23);
  dateMidnight.setMinutes(59);
  dateMidnight.setSeconds(59);

  dateMidnight.setDate(dateMidnight.getDate()-1)
  startDate.setDate(startDate.getDate()-1)

  Maps.find({inputTime:{$gt: startDate, $lt: dateMidnight}}).populate('owner').populate('supervisor').exec(function(err,result){
    if(err) {
      console.log(err)
      return
    }

    result.forEach((oldpindrop)=>{
      let newfield = []
      let oldlistField = oldpindrop.listField
      oldlistField.forEach((oldfield)=>{
         newfield.push({
          fieldName: oldfield.fieldName,
          fieldType: oldfield.fieldType,
          isPass: false,
          targetValue: oldfield.targetValue,
          targetComparison: oldfield.targetComparison
        })
      })

      let newgeneratedpindrop = new Maps({
        owner: oldpindrop.owner,
        businessName: oldpindrop.businessName,
        pinDropName: oldpindrop.pinDropName,
        position: {lat: oldpindrop.position.lat, lng: oldpindrop.position.lng},
        supervisor: oldpindrop.supervisor,
        inputTime: new Date()
      })
      newgeneratedpindrop.listField = [...newfield]

      newgeneratedpindrop.save(function(err,newpindrop){
      })
    })
    console.log("generate",result.length, " pindrops succes");
  })
}
