var d3 = require('d3')
,   nv = require('nvd3')
,   nv = window.nv // What?
;; // End vars.

// require('nvd3/nv.d3.css');
require('../css/main.scss');

var rates = {
    // threshold: %.rate,
    previous: {
        0: 0.00,
        125000: 0.01,
        250000: 0.03,
        500000: 0.04,
        1000000: 0.05,
        2000000: 0.07
    },
    current: {
        0: 0.00,
        125000: 0.02,
        250000: 0.05,
        925000: 0.10,
        1500000: 0.12
    }
};

window.d3Data = [{
    0: 0.00,
    125000: 0.01,
    250000: 0.03,
    500000: 0.04,
    1000000: 0.05,
    2000000: 0.07
}, {
    0: 0.00,
    125000: 0.02,
    250000: 0.05,
    925000: 0.10,
    1500000: 0.12
}];


// var root = d3.select('#chart').append('svg')
//     .attr('width', '100%')
//     .attr('height', 400)
//     .style('border', '1px solid black');

// root.selectAll('rect')
//     .data([5, 25, 80]).enter()
//   .append('rect')
//     .attr('x', Object)
//     .attr('y', Object)
//     .attr('width', 15)
//     .attr('height', 10)
//     .attr('fill', '#c63')
//     .attr('stroke', 'black');

console.log("nv: ", nv);
d3.json('/js/cumulativeLineData.json', function(data) {
    console.log("nv: ", nv);
    nv.addGraph( function() {
        var chart = nv.models.cumulativeLineChart()
            .x(function(d) {
                return d[0]
            })
            .y(function(d) {
                return d[1] / 100
            }) //adjusting, 100% is 1.00, not 100 as it is in the data
            .color(d3.scale.category10().range())
            .useInteractiveGuideline(true);

        chart.xAxis
            .tickValues([1078030800000, 1122782400000, 1167541200000, 1251691200000])
            .tickFormat(function(d) {
                return d3.time.format('%x')(new Date(d))
            });

        chart.yAxis
            .tickFormat(d3.format(',.1%'));

        d3.select('#chart svg')
            .datum(data)
            .call(chart);

        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);

        return chart;
    });
});


setTimeout( function() {
    var nv = require('nvd3')
    console.log("NV: ", nv);
}, 10000);
