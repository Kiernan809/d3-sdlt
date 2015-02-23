require('../css/main.scss');
var $ = require('jquery'),
    d3 = require('d3'),
    nvd3 = require('nv.d3'),
    data = require('./data');

var width = 640;
var height = 480;
var root = d3.select('#chart').append('svg')
    .attr({
      'width': width,
      'height': height,
    });

// Render the title.
var titleHeight = 50;
root.append('text')
    .attr({
      'class': 'title',
      'x': width / 2,
      'y': titleHeight / 2,
    })
    .text('Skull-splitting power!');

// Simulate 500 rolls of the axe.
var rollDie = function(numSides) {
  return 1 + Math.floor(Math.random() * numSides);
};

var MAX_ROLL = 4 + 4 + 6 + 6;
var rollHisto = d3.range(MAX_ROLL + 1).map(function() { return 0; });
for (var i = 0; i < 500; i++) {
  var rolled = rollDie(4) + rollDie(4) + rollDie(6) + rollDie(6);
  rollHisto[rolled]++;
}

// Render our axis.
var yAxisWidth = 50;
var xAxisHeight = 50;

var xScale = d3.scale.linear()
    .domain([0, rollHisto.length])
    .range([yAxisWidth, width]);
var yScale = d3.scale.linear()
    .domain([0, d3.max(rollHisto) * 1.2])
    .range([height - xAxisHeight, titleHeight]);

var xAxis = d3.svg.axis().scale(xScale);
root.append('g')
    .attr({
      'class': 'x axis',
      'transform': 'translate(0,' + (height - xAxisHeight) + ')',
    })
    .call(xAxis);

var yAxis = d3.svg.axis().scale(yScale).orient('left');
root.append('g')
    .attr({
      'class': 'y axis',
      'transform': 'translate(' + yAxisWidth + ',0)',
    })
    .call(yAxis);

// Render the dice bars.
root.selectAll('rect.bar')
    .data(rollHisto).enter()
  .append('rect')
    .attr({
      'class': 'bar',
      'x': function(d, i) { return xScale(i - 0.5); },
      'width': xScale(1) - xScale(0),
      'y': yScale,
      'height': function(d) { return yScale(0) - yScale(d); },
    });
