var d3 = require('d3')
,   nv = require('nvd3')
,   nv = window.nv // What?
,   taxCalc = require('./calctax.js')
,   __ = require('lodash')
;; // End vars.

require('../css/main.scss');
require('../../node_modules/nvd3/nv.d3.css');


d3.json('/js/taxData.json', function(data) {
    nv.addGraph( function() {
        var chart = nv.models.lineChart()
            .x( function(d) {
                return d[0]
            })
            .y( function(d) {
                return d[1]
            }) //adjusting, 100% is 1.00, not 100 as it is in the data
            .color( d3.scale.category10().range() )
            .useInteractiveGuideline(true);

        chart.xAxis
            .tickValues([300000, 600000, 900000, 1500000, 2000000])
            .tickFormat( function(d) {
                var format = d3.format(',');
                return '£' + format(d);
            });

        chart.yAxis
            .tickFormat( function(d) {
                var format = d3.format(',');
                return '£' + format(d);
            });

        d3.select('#chart svg')
            .datum(data)
            .call(chart);

        //TODO: Figure out a good way to do this automatically
        nv.utils.windowResize(chart.update);

        return chart;
    });
});


// console.log( "345k 2014 SDLT: ", taxCalc.getTax(2014, 345000) );
// console.log( "345k 2015 SDLT: ", taxCalc.getTax(2015, 345000) );


// // getInput
// var stdIterator = 500;
// var getInput = parseInt('1300000');

// // nearest 5k...
// var nearest = stdIterator * Math.round( getInput / stdIterator )

// var display = new Array(2600);
// display = __.map( display, function(n, i) {
//     var x = stdIterator * (i + 1);

//     // If number > 75k, input in the middle of graph.
//     return [ (nearest - x >= 0 ? nearest - x : 0), nearest + x ];
// })

// display.push(getInput);
// display = __.uniq( __.flattenDeep( display ) ).sort(function(a,b) { return a - b });

// __.map( display, function(n, i) {
//     return [n, parseInt(taxCalc.getTax(2014, n).toFixed(2)) ]
// });
