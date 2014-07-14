module.exports = BlinkReporter;
var Blink1 = require('node-blink1');
var blink1 = new Blink1();
var time=1000;

blink1.red=function(callback) {
    return blink1.fadeToRGB(time,255,0,0,callback);
}

blink1.green=function(callback) {
    return blink1.fadeToRGB(time,0,255,0,callback);
}

blink1.yellow=function(callback) {
    return blink1.fadeToRGB(time,255,255,0,callback);
}

function BlinkReporter(runner) {
  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
      blink1.yellow();
      passes++;
  });

  runner.on('fail', function(test, err){
      blink1.red();
      console.log('fail',test,err)
      failures++;
  });

  runner.on('end', function(){
      if (failures==0)
          {
              blink1.green();
          }
  });
}
