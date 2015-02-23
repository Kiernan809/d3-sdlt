module.exports = function() {
    window.isHighDensity = (
    window.devicePixelRatio && window.devicePixelRatio > 1.3 || (
        window.matchMedia && (
            window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches
            || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches
            )
        )
    );

    window.isRetina = (
        (window.devicePixelRatio && window.devicePixelRatio > 2) || (
            window.matchMedia && (
                window.matchMedia('only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx), only screen and (min-resolution: 75.6dpcm)').matches
                || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min--moz-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2)').matches
                )
            )
        );

    if( !!window.matchMedia('only screen and (min-width:700px)').matches ) {
        console.log("1");
        require("../css/main.scss");
    } else {
        console.log("2");
    }

    return true;
}();
