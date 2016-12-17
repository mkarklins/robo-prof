class GenerateStats {
  pidError(sensorChart) {

    var r = 0;
    function pidValue(){
      r += 1;
      // sensorChart.addPidError(Math.floor(Math.random()*9));
      sensorChart.addPidError(-10);

      if (r < 200)
        setTimeout(pidValue, 10);
    }

    pidValue();
  }

  sensorArray(sensorChart) {
    var maxSize = 200;
    var r = 0;

    self = this;

    function sensorArray(){
      r += 1;
      var result = "";
      for(var i =0; i < 10; i++){
        result += Math.floor(Math.random()*2).toString();
      }

      // mainWindow.webContents.send("updateSensors", {"sensor": result});
      sensorChart.addSensorArray(result);

      if (r < maxSize)
        setTimeout(sensorArray, 10);
    }
    sensorArray();
  }
}

export let generateStats = new GenerateStats();
