var express = require('express');
var ffmpeg = require('fluent-ffmpeg');
var router = express.Router();
const uuidV1 = require('uuid/v1');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var startTime = req.query.startTime;
  var endTime = req.query.endTime;
  var videoUrl = req.query.url;

  var startArr = startTime.split(":");
  var startSecs = (+startArr[0]) * 60 + (+startArr[1]);
  var endArr = endTime.split(":");
  var endSecs = (+endArr[0]) * 60 + (+endArr[1]);
  
  console.log(startTime);
  console.log(endTime);
  console.log(videoUrl);

  var uuid = uuidV1();
  console.log(uuid+'.mp4');

  ffmpeg.setFfmpegPath('/Users/stevencornish/Desktop/KO-MVP-master/ffmpeg');

  //videoUrl = "http://localhost:3000/videos/"+videoUrl.split("/").pop();

  ffmpeg(videoUrl)
  .setStartTime(startTime)
  .setDuration(endSecs - startSecs)
  .output('public/videos/'+uuid+'.mp4')
  .on('end', function(err) {   
      if(!err){
        res.send(uuid);
      }
      console.log("error",err);
  })
  .on('error', function(err){
      console.log("error",err);
  }).run();

});

module.exports = router;
