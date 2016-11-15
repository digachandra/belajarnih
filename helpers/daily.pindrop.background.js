var kue = require('kue-scheduler');
var Queue = kue.createQueue();

//create a job instance
var job = Queue
            .createJob('every', {data:10})
            .attempts(3)
            .backoff({
              delay: 60000,
              type: 'fixed'
            })
            .priority('normal');

            Queue.on('schedule error', function (error) {
              //handle all scheduling errors here
              console.log(error);
            });


    //listen on success scheduling
    Queue.on('schedule success', function (job) {
      //a highly recommended place to attach
      //job instance level events listeners

      job.on('complete', function (result) {
        console.log('Job completed with data ', result);

      }).on('failed attempt', function (errorMessage, doneAttempts) {
        console.log('Job failed');

      }).on('failed', function (errorMessage) {
        console.log('Job failed');

      }).on('progress', function (progress, data) {
        console.log('\r  job #' + job.id + ' ' + progress +
          '% complete with data ', data);

      });

    });
//schedule it to run every 2 seconds
Queue.every('3 seconds', job);


//somewhere process your scheduled jobs
Queue.process('every', function(job, done) {
    console.log('generate new pindrop');
    done();
});
