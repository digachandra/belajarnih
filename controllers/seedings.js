let Maps = require ('../models/maps')
let Users = require ('../models/users')


//// jakarta block
/*

-6.147244, 106.674370   -6.154071, 106.955895

-6.391593, 106.630425   -6.373851, 106.957268

*/
let baselat = -6
let baselng = 106
let minlat = 1472440196
let maxlat = 391593
let minlng = 6304250196
let maxlng = 957268
let latrange = 244349
let lngrange = 326843

let startdate = 1
let startmonth = 11
let startyear = 2016
let numdates = 30
let owneremail = ["sahbanalo@gmail.com","andrew@andrew.com","septian@septian.com","ivan@ivan.com","ari@ari.com",]
let ownerpassword = ["bana","andrew","septian","ivan","ari"]
let spvemail = ["mapincspv1@gmail.com","mapincspv2@gmail.com","mapincspv3@gmail.com","mapincspv4@gmail.com","mapincspv5@gmail.com",]
let spvpassword = ["mapinczerospv1","mapinczerospv2","mapinczerospv3","mapinczerospv4","mapinczerospv5"]
let ownerBusinessName = [
  ["Chicken Soup","SSD","Sawita"],
  ["Influencer","Stalker Fox"],
  ["Mapinc","CutMe","Cooking Fox"],
  ["StocksX","Toorist","3Stalker"],
  ["Mega Resto","Gesekin","MyPay"]
]
let ownerId = []
let spvId = []

let users = {
  owner :[],
  spv:[]
}
for (let i = 0; i < owneremail.length; i++) {
  users.owner.push({
    userEmail: owneremail[i],
    password: ownerpassword[i],
    role: 0
  })
}
for (let i = 0; i < spvemail.length; i++) {
  users.spv.push({
    userEmail: spvemail[i],
    password: spvpassword[i],
    role: 1
  })
}
function seedsownerusers() {
  ///// begin seeds owner users
  let indexowner = 0
  function insertowner(i){
    if(i<owneremail.length){
      Users.findOne({ 'userEmail' :  users.owner[i].userEmail }, function(err, user) {
        if (err){
          errors.push(err)
          return true
        }
        if (user) {
          ownerId.push(user._id)
          return true
        }else {
          let newUser = new Users()
          newUser.userEmail = users.owner[i].userEmail
          newUser.encryptedPassword = newUser.generateHash(users.owner[i].password)
          newUser.role.push(users.owner[i].role)
          newUser.save(function(err) {
            if (err){
              throw err
            }
          ownerId.push(newUser._id)
          if(indexowner <= owneremail.length){
            indexowner++
            insertowner(indexowner)
          }
          })
        }
      })
    } else{
      seedspvusers()
    }
  }
  insertowner(indexowner)
}


function seedspvusers() {
    let index = 0
    function insertspv(i) {
      if(i<spvemail.length){
        Users.findOne({ 'userEmail' :  users.spv[i].userEmail }, function(err, user) {
          if (err){
            errors.push(err)
            return true
          }
          if (user) {
            spvId.push(user._id)
            return true
          }else {
            let newUser = new Users()
            newUser.userEmail = users.spv[i].userEmail
            newUser.encryptedPassword = newUser.generateHash(users.spv[i].password)
            newUser.role.push(users.spv[i].role)
            newUser.save(function(err) {
              if (err){
                throw err
              }
            spvId.push(newUser._id)
              if(index <= spvemail.length){
                index++
                insertspv(index)
              }
            })
          }
        })
      } else{
        seedsbusinessName()
      }
    }
    insertspv(index)
}

function seedsbusinessName(){
  for (let i = 0; i < owneremail.length; i++) {
    for (let j = 0; j < ownerBusinessName[i].length; j++) {
      let pindropnums = Math.floor(Math.random()*10)+5
      for (let k = 1; k < pindropnums; k++) {
        let newtargetvalue = 2000000 + Math.floor(Math.random()*10+1)*500000
        let newvalue = 3000000 + Math.floor(Math.random()*10+1)*500000
        let spvindex = Math.floor(Math.random()*spvId.length)
        let newspv = spvId[spvindex]
        let newisPass = false
        if(newvalue > newtargetvalue) newisPass = true
        let newlistfield = [{
          "fieldName": "penjualan",
          "fieldType": "NUMBER",
          "targetValue": newtargetvalue,
          "targetComparison": "GT",
          "isPass": newisPass,
          "value" : newvalue
        }]
        let newposition  = {
          lat : `${baselat}.`+Math.floor(Math.random()*latrange+1) + minlat,
          lng : `${baselng}.`+Math.floor(Math.random()*lngrange+1) + minlng
        }
        let newpinDropName = "pindrop"+k
        if(k===1){
          newpinDropName = undefined
          newspv = undefined
          newposition = undefined
          newlistfield = undefined
        }
        let newmap = new Maps({
            owner: ownerId[i],
            businessName: ownerBusinessName[i][j],
            pinDropName: newpinDropName,
            supervisor: newspv,
            position : newposition,
            listField: newlistfield
        })
        newmap.save(function(err) {
          if (err){
            errors.push(err)
          }
        })
      }
    }
  }
}
function doOneMonthSeeding() {
    let startDate = new Date()
    let dateMidnight = new Date(startDate)

    startDate.setSeconds(0);
    startDate.setHours(0);
    startDate.setMinutes(0);

    dateMidnight.setHours(23);
    dateMidnight.setMinutes(59);
    dateMidnight.setSeconds(59);

    var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date();
    var secondDate = new Date(startyear,startmonth-1,startdate);
    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)))
    for (let i = 1; i <= diffDays; i++) {

      Maps.find({createdAt:{$gt: startDate, $lt: dateMidnight}}).populate('owner').populate('supervisor').exec(function(err,result){
        if(err) {
          console.log(err)
          return
        }

        result.forEach((oldpindrop)=>{
          if(oldpindrop.pinDropName){
            let createdAtDate = new Date()
            createdAtDate.setSeconds(Math.floor(Math.random()*60));
            createdAtDate.setHours(Math.floor(Math.random()*24));
            createdAtDate.setMinutes(Math.floor(Math.random()*60));
            createdAtDate.setDate(createdAtDate.getDate()-i)
            let newfield = []
            let oldlistField = oldpindrop.listField

            oldlistField.forEach((oldfield)=>{
              let newisPass = false
              let newvalue = 3000000 + Math.floor(Math.random()*10+1)*500000
              if(newvalue > oldfield.value ) newisPass = true
               newfield.push({
                fieldName: oldfield.fieldName,
                fieldType: oldfield.fieldType,
                isPass: newisPass,
                targetValue: oldfield.targetValue,
                targetComparison: oldfield.targetComparison
              })
            })

            let newgeneratedpindrop = new Maps({
              owner: oldpindrop.owner,
              businessName: oldpindrop.businessName,
              pinDropName: oldpindrop.pinDropName,
              position: {lat: oldpindrop.position.lat, lng: oldpindrop.position.lng},
              supervisor: oldpindrop.supervisor
            })
            newgeneratedpindrop.createdAt = createdAtDate
            newgeneratedpindrop.listField = [...newfield]
            newgeneratedpindrop.save(function(err,newpindrop){
            })
          }
        })
      })
    }
}
exports.oneMonthSeeds = function(req,res) {
  doOneMonthSeeding()
  res.json({success:true, message: "success do one month seeding"})
}
exports.doseeds = function(req,res) {
  seedsownerusers()
  res.json({success:true, message: "success do seeding"})
}
