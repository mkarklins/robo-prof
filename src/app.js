// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import env from './env';
import { sensorChart } from "./sensor_chart.js";
import { generateStats } from "./generate_stats.js";

var app = remote.app;

var ipcRenderer = require("electron").ipcRenderer;

document.addEventListener('DOMContentLoaded', function () {
  sensorChart.buildChart();
  // 
  // generateStats.sensorArray(sensorChart);
  // generateStats.pidError(sensorChart);
  // generateStats.pidControlValue(sensorChart);
  // generateStats.addLeftSpeedValue(sensorChart);
  // generateStats.addRightSpeedValue(sensorChart);

  ipcRenderer.on('updateSensors', function(event , stat){
    if (stat["sensor"]) {
      sensorChart.addSensorArray(stat["sensor"]);
    } else if (stat["pid_error"]) {
      sensorChart.addPidError(stat["pid_error"]);
    } else if (stat["pid_control_value"]) {
      sensorChart.addPidControlValue(stat["pid_control_value"]);
    } else if (stat["left_speed"]) {
      sensorChart.addLeftSpeedValue(stat["left_speed"]);
    } else if (stat["right_speed"]) {
      sensorChart.addRightSpeedValue(stat["right_speed"]);
    };
  });
});
