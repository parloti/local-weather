/**
 * Add barrels and stuff
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        packages: {
            //       // add packages here
        },
        map: {
            jquery: 'npm:jquery/dist/jquery.min.js',
            tether: 'npm:tether/dist/js/tether.min.js',
            bootstrap: 'npm:bootstrap/dist/js/bootstrap.min.js',

            skycons: 'http://darkskyapp.github.io/skycons/skycons.js'
        },
        meta: {
            'bootstrap': {
                deps: ['jquery', 'tether']
            }
        }
    });
})(this);

SystemJS.import('skycons', 'bootstrap').catch(function (err) { console.error(err); });