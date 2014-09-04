blink1=null;

function BlinkReporter(runner) {
    try {
       if (blink1==null){
         var Blink1 = require('node-blink1');
         var blink1 = new Blink1();
       }
       blink1.fadeToRGB(5,0,0,0);
    } catch (e) {
        console.log(e)
        console.log("NO BLINKS FOUND, please plug one in !")
        return;
    }

    var time=1000;
    blink1.off=function(callback) {
        return blink1.fadeToRGB(time,0,0,0,callback);
    }

    blink1.red=function(callback) {
        return blink1.fadeToRGB(time,128,0,0,callback);
    }

    blink1.green=function(callback) {
        return blink1.fadeToRGB(time,0,128,0,callback);
    }

    blink1.yellow=function(callback) {
        return blink1.fadeToRGB(time,128,128,0,callback);
    }

  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
      if (pass % 2==1)
          blink1.yellow();
      else
          blink1.off()
      passes++;
  });

  runner.on('fail', function(test, err){
      blink1.red();
      console.log('fail',test,err)
      failures++;
  });

  runner.on('end', function(){
      if (failures==0) {
              blink1.green();
      }
  });
}
module.exports = BlinkReporter;
