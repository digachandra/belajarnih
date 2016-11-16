const CronJob = require('cron').CronJob;
const Map = require('../models/maps')
const gen = require('./generator.js')

exports.job = new CronJob('0 0 0 * *', function() {
  /*
   * Runs every day
   * at 00:00:00 AM.
   */
   // DO SOMETHING

   gen.generate()
  }, function () {
    /* This function is executed when the job stops */
    console.log("cron job exited");
  },
  true /* Start the job right now */
);
