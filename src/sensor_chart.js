import d3 from 'd3';

class SensorChart {
  constructor() {
    this.width = 50000;
    this.height = 170;
    this.sensorArrayCount = 0;
    this.pidValueCount = 0;
  }

  buildChart() {
    this.chart = d3.select("#sensor-array").append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    this.sensors = this.chart.selectAll(".sensor-cell");
    this.pidValues = this.chart.selectAll(".pid-error");
  }

  sensorTopOffset(i) {
    return 15 * i + 20;
  }

  addPidError(pidValue) {
    this.pidValueCount += 1;

    if (pidValue < 0) {
      pidValue = "-" + Math.abs(pidValue)
    } else {
      pidValue = pidValue + ""
    }

    var pidValueBar = this.pidValues.data([pidValue]).enter().append("g")

    pidValueBar.append("rect")
      .attr("x", function(d, i) { return self.pidValueCount * 16; })
      .attr("y", function(d, i) { return 0; })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("class", "pid-error")

    pidValueBar.append("text")
      .attr("x", function(d, i) { return self.pidValueCount * 16; })
      .attr("y", function(d, i) { return 10; })
      .attr("dy", "0.35em")
      .attr("width", 10)
      .attr("class", "pid-error-text")
      .attr("kerning", -1)
      .attr("letter-spacing", -1)
      .text(function(d) { return  d; });
  }

  addSensorArray(sensorValues) {
    this.sensorArrayCount += 1;

    self = this;

    if (typeof(sensorValues) === "string"){
      sensorValues = sensorValues.split("");
    };

    this.sensors
      .data(sensorValues).enter().append("rect")
      .attr('class', 'sensor-array')
      .attr("x", function(d, i) { return self.sensorArrayCount * 16; })
      .attr("y", function(d, i) { return self.sensorTopOffset(i); })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("class", "sensor-cell")
      .attr("width", 13)
      .attr("height", 13)
      .style("fill", function(d){ return d == 1 ? "#66e0ff" : "#d1e0e0"; });
  }
}

export let sensorChart = new SensorChart();
