/*******************************************************************************
 * @author Tomasz Scislo <<ahref='mailto:t.scislo@samsung.com'>t.scislo@samsung.com</a>>
 * @author Lukasz Jagodzinski <<ahref='mailto:l.jagodzinsk@samsung.com'>l.jagodzinsk@samsung.com</a>>
 * Copyright (c) 2013 Samsung Electronics All Rights Reserved.
 ******************************************************************************/
var lati,longi;
var googleLocation = (function ($, logger, view, network, ajax) {
    var appKey, internetConnectionCheck;
    
    var map;
    appKey = "AIzaSyDdKjhStoKF6t0xxA_hFxYBmKrEb77b-nQ";

    /**
     * Asynch method to check the network connection
     * @private
     */
    internetConnectionCheck = function () {
        network.isInternetConnection(function (isConnection) {
            if (!isConnection) {
                view.hideLoader();
                view.showPopup("No Internet connection. Application may not work properly.");
            }
        });
    };
    return {
        /**
         * Provides initialization for the app
         */
        initialize: function () {
            var that = this;
            ajax();
            $.extend($.mobile, {
                defaultPageTransition: "flip",
                loadingMessageTextVisible: true,
                pageLoadErrorMessage: "Unable to load page",
                pageLoadErrorMessageTheme: "d",
                touchOverflowEnabled: true,
                loadingMessage: "Please wait...",
                allowCrossDomainPages: true,
                ajaxEnabled: false
            });
            logger.info("googleLocation.initialize()");
            internetConnectionCheck();
            that.getCurrentLocation();
            $('#seoul').live('pageshow', function () {
                logger.info("South Korea Google Map View");
                internetConnectionCheck();
                map = that.createMapForGivenContainer("map_canvas", {
                    zoom: 18,
                    lat: lati,
                    lon: longi,
                    streetViewControl: false,
                    mapTypeId: google.maps.MapTypeId.HYBRID
                });
                
                new google.maps.Marker({position: {lat: lati,
					lng: longi},
					draggable: true,
					animation: google.maps.Animation.DROP,
					map: map});
                
            });
                     
        },

        

        /**
         * Method that can be used for basic google.maps.Map creation for given container
         * @param container
         * @param options
         * @returns {Object} google.maps.Map
         */
        createMapForGivenContainer: function (container, options) {
            var mapOptions, map;

            mapOptions = {
                center: new google.maps.LatLng(options.lat, options.lon),
                zoom: options.zoom,
                mapTypeId: options.mapTypeId,
                streetViewControl: options.streetViewControl
            };
            map = new google.maps.Map(document.getElementById(container), mapOptions);
            return map;
        },

        

        /**
         * Method that can be used to get current device geolocation according to W3C Geolocation API
         * @returns
         */
        getCurrentLocation: function () {
            logger.info('getCurrentLocation');
            if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    view.hideLoader();
                    // Currently Tizen returns coords as 0 0 and we should treat this as an error
                    if (position.coords.latitude === 0 && position.coords.longitude === 0) {
                        view.showPopup('Unable to acquire your location');
                    } else {
                    	lati = position.coords.latitude;
                    	longi = position.coords.longitude;
                    	
                    	document.getElementById("location_longi").value = longi;
                    	document.getElementById("location_lati").value = lati;
                        
                    	longi = document.getElementById("location_longi").value;
                    	lati =document.getElementById("location_lati").value
                    	
                    	//alert(longi+"  "+lati);
                    	
                    	//view.showPopup('Latitude: ' + position.coords.latitude + "<br />" + 'Longitude: ' + position.coords.longitude);
                    }
                }, function (error) {
                    view.hideLoader();
                    view.showPopup('Unable to acquire your location');
                    logger.err('GPS error occurred. Error code: ', JSON.stringify(error));
                });
            } else {
                view.hideLoader();
                view.showPopup('Unable to acquire your location');
                logger.err('No W3C Geolocation API available');
            }
        }
    };
}($, tlib.logger, tlib.view, tlib.network, tlib.ajax));

googleLocation.initialize();