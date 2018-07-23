'use strict';

const d3 = require("d3");
const data = [30, 86, 168, 281, 303, 365];

d3.select("#app")
  .selectAll("div")
  .data(data)
  .enter()
  .append("div")
  .style("width", function(d) { return d + "px"; })
  .text(function(d) { return d; });