var SDLTRates = [
    // threshold: %.rate,
    {
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
    }
];

__ = require('lodash');

module.exports = {
    rates: SDLTRates,

    getApplicableRates: function(yyyy) {
        return this.rates[( yyyy < 2015 ? 0 : 1 )];;
    },

    getRates: function(yyyy, price) {
        var applicableRates = this.getApplicableRates(yyyy);

        var allRates = __.filter( __.keys(applicableRates), function(n) {
            return price > parseInt(n);
        });

        if( yyyy < 2015 ) {
            return { 'applicableRates': applicableRates, 'keys': __.takeRight(allRates) };
        } else {
            return { 'applicableRates': applicableRates, 'keys': allRates };
        }

        if( yyyy < 2015 ) {
            return __.takeRight(allRates);
        } else {
            return allRates;
        }
    },

    getTax: function(yyyy, price) {
        var gatherRates = this.getRates(yyyy, price),
            applicableRates = gatherRates['applicableRates'],
            allRates = gatherRates['keys'],
            totalTax = 0;

        if( yyyy < 2015 ) {
            // allRates = allRates;
            totalTax = applicableRates[allRates[0]] * price;
        } else {
            __.forEachRight( allRates, function(r) {
                // Taxable amount.  Per band
                // parseInt()?
                var taxable = (price - r);
                price = r;

                totalTax += taxable * applicableRates[r];
            });
        }

        return totalTax;
    }
}
