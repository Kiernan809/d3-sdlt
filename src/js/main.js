var d3 = require('d3')
,   $ = require('jquery')
,   __ = require('lodash')
,   nv = require('nvd3')
,   nv = window.nv // What?
,   taxCalc = require('./calctax.js')
,   chart
,   data
;; // End vars.

require('../css/main.scss');
require('../../node_modules/nvd3/nv.d3.css');

function redraw() {
    nv.addGraph( function() {
        chart = nv.models.lineChart()
        .x( function(d) { return d[0] })
        .y( function(d) { return d[1] })
        .color( d3.scale.category10().range() )
        .useInteractiveGuideline(true);

        chart.xAxis
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

        nv.utils.windowResize(chart.update);

        return chart;
    });
}

d3.json( '/js/taxData.json', function(e, json) {
    data = json;
    redraw();
} );

function inputToData(input, nValues, iterator) {
    if( iterator === undefined ) { iterator = 500; }
    if( nValues === undefined ) { nValues = 300; }

    input = parseInt(input);

    // nearest ((iterator))...
    var nearest = iterator * Math.round( input / iterator )

    // Create new array of x values.
    var display = new Array( (nValues/2) );
    display = __.map( display, function(n, i) {
        var x = iterator * (i + 1);

        return [ (nearest - x >= 0 ? nearest - x : 0), nearest + x ];
    })

    display.push(input); // add our input value to graph.
    // Remove duplicate values (0), sort numerically.
    display = __.uniq( __.flattenDeep( display ) ).sort(function(a,b) { return a - b });

    // For each value, create x and y values to plot.
    var data = [{
        "key": "2014 Stamp Duty rate",
        "values": __.map( display, function(n, i) { return [n, parseInt(taxCalc.getTax(2014, n).toFixed(2)) ] })
    }, {
        "key": "2015 Stamp Duty rate",
        "values": __.map( display, function(n, i) { return [n, parseInt(taxCalc.getTax(2015, n).toFixed(2)) ] })
    }];

    return {
        inputIndex : __.indexOf( display, input ),
        data: data
    }
}

$(function() {
    $('form').on( 'submit', function(e) {
        e.preventDefault();

        var value = $('input').val();

        inputValueData = inputToData( value );
        data = inputValueData.data;

        redraw();

        // Here we insert a vertical line intersecting the input value.
        d3.selectAll('#chart .lineV').remove();
        var verticalLine = d3.select('#chart svg .nv-linesWrap').append('line')
        .attr({
            'x1': 0,
            'x2': 0,
            'y1': 0,
            'y2': 500,
            'stroke' : 'red',
            'class' : 'lineV'
        });

        var position = data[0].values.length / inputValueData.inputIndex;
        position = d3.select('rect').attr('width') / position;
        verticalLine.attr({ 'transform': 'translate('+ position +')' });


        return false;
    })
});
