import d3 from 'd3';

class SensorChart {
  constructor() {
    this.width = 50000;
    this.height = 200;
    this.sensorArrayCount = 0;
    this.pidValueCount = 0;
    this.pidControlValuesCount = 0;
    this.leftSpeedCount = 0;
    this.rightSpeedCount = 0;
  }

  buildChart() {
    this.chart = d3.select("#sensor-array").append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")");

    this.sensors = this.chart.selectAll(".sensor-cell");
    this.pidValues = this.chart.selectAll(".pid-error");
    this.pidControlValues = this.chart.selectAll(".pid-control-value");
    this.leftSpeedValues = this.chart.selectAll(".left-speed-value");
    this.rightSpeedValues = this.chart.selectAll(".right-speed-value");
    this.leftOffset = 50;

    this.renderLegends();
  }

  renderLegends() {
    this.renderLegendUnit(this.leftSpeedConfig())
    this.renderLegendUnit(this.rightSpeedConfig())
    this.renderLegendUnit(this.pidControlValueConfig())
    this.renderLegendUnit(this.pidErrorConfig())
    this.renderLegendUnit(this.sensorConfig())
  }

  renderLegendUnit(config) {
    this.chart
      .selectAll(".sensor-cell").data([config.name]).enter().append("g")
      .append("text")
      .attr("x", function(d, i) { return 0; })
      .attr("y", function(d, i) { return config.topOffset; })
      .attr("dy", "0.35em")
      .attr("width", 30)
      .attr("class", "legend-unit")
      .attr("kerning", -1)
      .attr("letter-spacing", -1)
      .text(function(d) { return  d; });
  }

  leftSpeedConfig() {
    return {
      topOffset: 10,
      statValues: this.leftSpeedValues,
      statValueCount: this.leftSpeedCount,
      name: "Left speed:"
    }
  }

  rightSpeedConfig() {
    return {
      topOffset: 25,
      statValues: this.rightSpeedValues,
      statValueCount: this.rightSpeedCount,
      name: "Right speed:"
    }
  }

  pidControlValueConfig() {
    return {
      topOffset: 40,
      statValues: this.pidControlValues,
      statValueCount: this.pidControlValuesCount,
      name: "PID Control:"
    }
  }

  pidErrorConfig() {
    return {
      topOffset: 55,
      statValues: this.pidValues,
      statValueCount: this.pidValueCount,
      name: "PID Error:"
    }
  }

  sensorConfig() { return { topOffset: 65, name: "Sensors" } }

  addPidError(pidValue) {
    this.pidValueCount += 1;
    this.renderValueRow(pidValue, this.pidErrorConfig())
  }

  addPidControlValue(pidControlValue) {
    this.pidControlValuesCount += 1;
    this.renderValueRow(pidControlValue, this.pidControlValueConfig())
  }

  addLeftSpeedValue(leftSpeed) {
    this.leftSpeedCount += 1;
    this.renderValueRow(leftSpeed, this.leftSpeedConfig())
  }

  addRightSpeedValue(rightSpeed) {
    this.rightSpeedCount += 1;
    this.renderValueRow(rightSpeed, this.rightSpeedConfig())
  }

  renderValueRow(statValue, options){
    var self = this;

    if (statValue < 0) {
      statValue = "-" + Math.abs(statValue)
    } else {
      statValue = statValue + ""
    }

    var statValueBar = options.statValues.data([statValue]).enter().append("g")

    statValueBar.append("text")
      .attr("x", function(d, i) { return options.statValueCount * 16 + self.leftOffset; })
      .attr("y", function(d, i) { return options.topOffset; })
      .attr("dy", "0.35em")
      .attr("width", 10)
      .attr("class", "pid-error-text")
      .attr("kerning", -1)
      .attr("letter-spacing", -1)
      .text(function(d) { return  d; });
  }

  sensorTopOffset(i) {
    return  15 * i + this.sensorConfig().topOffset;
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
      .attr("x", function(d, i) { return self.sensorArrayCount * 16 + self.leftOffset; })
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
