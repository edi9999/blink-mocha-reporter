blink1=null;
var Blink1 = require('node-blink1');

function BlinkReporter(runner) {
    try {
       if (blink1==null){
         blink1 = new Blink1();
       }
       blink1.fadeToRGB(5,0,0,0);
    } catch (e) {
        console.log(e)
        console.log("NO BLINKS FOUND, please plug one in !")
        return;
    }

    var time=1000;
    blink1.off=function(t) {
        if (t===undefined) t=time;
        return blink1.fadeToRGB(t,0,0,0,callback);
    }

    blink1.red=function(t) {
        if (t===undefined) t=time;
        return blink1.fadeToRGB(t,128,0,0,callback);
    }

    blink1.green=function(t) {
        if (t===undefined) t=time;
        return blink1.fadeToRGB(t,0,128,0,callback);
    }

    blink1.yellow=function(t) {
        if (t===undefined) t=time;
        return blink1.fadeToRGB(t,128,128,0,callback);
    }

  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
      if (passes % 2==1)
          blink1.yellow(20);
      else
          blink1.off(20)
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
