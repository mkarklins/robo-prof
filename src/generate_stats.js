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

  pidControlValue(sensorChart) {
    var r = 0;
    function pidControlValue(){
      r += 1;
      // sensorChart.addPidError(Math.floor(Math.random()*9));
      sensorChart.addPidControlValue(-10);

      if (r < 200)
        setTimeout(pidControlValue, 10);
    }
    pidControlValue();
  }

  addLeftSpeedValue(sensorChart) {
    var r = 0;
    function addLeftSpeedValue(){
      r += 1;
      // sensorChart.addPidError(Math.floor(Math.random()*9));
      sensorChart.addLeftSpeedValue(-10);

      if (r < 200)
        setTimeout(addLeftSpeedValue, 10);
    }
    addLeftSpeedValue();
  }

  addRightSpeedValue(sensorChart) {
    var r = 0;
    function addRightSpeedValue(){
      r += 1;
      // sensorChart.addPidError(Math.floor(Math.random()*9));
      sensorChart.addRightSpeedValue(-10);

      if (r < 200)
        setTimeout(addRightSpeedValue, 10);
    }
    addRightSpeedValue();
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
