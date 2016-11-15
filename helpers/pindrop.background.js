// const schedule = require('node-schedule')
// const dailyPinDrop = schedule.scheduleJoob({hour: 10, minute: 44, dayOfWeek: 0}, function(){
//   console.log('Time for tea!');
// })

var Queue = require('bee-queue');
var addQueue = new Queue('addition',{removeOnSuccess: true});



var job = addQueue.createJob({x: 2, y: 3}).save();
job.on('progress', function (progress) {
  console.log('Job ' + job.id + ' reported progress: ' + progress + '%');
});
addQueue.on('succeeded', function (job, result) {
  console.log('Job ' + job.id + ' succeeded with result: ' + result);
});
addQueue.process(function (job, done) {
  console.log("pindrop "+new Date().getDate()+"generated")
  job.reportProgress(30);
  // do more work
  job.reportProgress(80);
  // do the rest
  done(null,job.data.x+job.data.y);
});
