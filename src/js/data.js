var rates = {
    oldRates: {
        0: 0,
        125000: 0,
        250000: 0,
        925000: 0,
        1500000: 0
    },
    newRates: {
        0: 0,
        125000: 0,
        250000: 0,
        925000: 0,
        1500000: 0
    }
};

function getBand(rate, n) {
    if( rate === 'old' ) {
        // rates.oldRates
    } else if( rate === 'new' ) {
        // rates.newRates
    } else {
        return false;
    }
}

function loopData(loopFrom,loopTo,loopJump,rates) {
    for( var x = loopFrom ; x < loopTo ; x + loopJump ) {
        var band = getBand(rates, x);

    }
}

var exp = {
    rates: rates,
    getOldRateData: function(n) {
        if( n < 500000 ) {

        } else {
        }
    }
    getNewRateData: function(n) {
        if( n < 500000 ) {
        } else {

        }
    }
}

module.exports = exp;

