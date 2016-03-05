var Promise = require('es6-promise').Promise,
    scriptLoader = require('scriptjs'),
    GoogleMapAPILoader = function() {
        
        var load = new Promise(function(resolve, reject){
            
            if (typeof window === 'undefined') {
                reject(new Error('Google Map cannot be loaded outside browser environment'));
                return;
            }
            
            window._$GoogleMapInitialise$_ = function () {
                delete window._$GoogleMapInitialise$_;
                resolve(window.google.maps);
            };
            
            scriptLoader('https://maps.googleapis.com/maps/api/js?callback=_$GoogleMapInitialise$_', function(){
                return typeof window.google === 'undefined' && reject(new Error('Google Map initialisation error (not loaded)'));
            });
            
        });
        
        return load;

    };

module.exports = GoogleMapAPILoader;