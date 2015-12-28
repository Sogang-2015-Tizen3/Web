/*******************************************************************************
 * @author Tomasz Scislo <<ahref='mailto:t.scislo@samsung.com'>t.scislo@samsung.com</a>>
 * @author Lukasz Jagodzinski <<ahref='mailto:l.jagodzinsk@samsung.com'>l.jagodzinsk@samsung.com</a>>
 * Copyright (c) 2013 Samsung Electronics All Rights Reserved.
 ******************************************************************************/
var lati,longi,length,
id = [],
	imagelocation = [],
	name = [],
	price = [],
	want = [],
	location_longi = [],
	location_lati= [],
	regdate = [];
var temp_lati ;//= 37.55;
var temp_longi;//= 126.94;
var neighborhoods = [ {
	lat : 37.55,
	lng : 126.94
}, {
	lat : 38.1,
	lng : 126.21
}, {
	lat : 38.44,
	lng : 126.396
}, {
	lat : 37.88,
	lng : 125.394
} ];
var check=0;
var mapping = (function ($, logger, view, network, ajax) {
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
            var i=0;
            //var marker;
           
            var temper_lati;
            var temper_longi;
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
            that.getCurrentLocation();
            i=0;
            while(i<100000){
            	i++;
            }
            i=0;
        	$('#seoul').live('pageshow', function () {
                logger.info("South Korea Google Map View");
                       
                i=0;
                while(i<100000){
                	i++;
                }
                i=0;
                
            	alert(lati+" "+longi);
                //var mylatilongi = new google.maps.LatLng(lati,longi);
            	
                map = that.createMapForGivenContainer("map_canvas", {
                    zoom: 14,
                    lat: lati,
                    lon: longi,
                    streetViewControl: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
                for(i=0;i<length;i++){
   
                var myLatLng = new google.maps.LatLng(location_lati[i],location_longi[i]);
                var marker = new google.maps.Marker({
                    	position:  myLatLng,
                    	map: map,
                    	title: 'Hello World!'
                });
                	// check=0;
                }
           });
                     
        },
       

		firstTodo : function() {
			var i;
			var j = 0;
			
			// ===================================

			// ===========8============

			var url = "http://cspro.sogang.ac.kr/~cse20101666/getall.php";
			
			$.ajax({
				type : "POST",
				url : url,
				data : null,
				success : function(msg) {
					var string = msg;
					// alert(string);
					var strArr = string.split('#');
					length = parseInt((strArr.length - 1) / 8);

					j = 0;
					for (i = 0; i < length; i++) {
						id[i] = strArr[j];
						j++;

						imagelocation[i] = strArr[j];
						j++;

						name[i] = strArr[j];
						j++;

						price[i] = strArr[j];
						j++;

						want[i] = strArr[j];
						j++;

						location_longi[i] = strArr[j];
						j++;

						location_lati[i] = strArr[j];
						j++;

						regdate[i] = strArr[j];
						j++;
					}

					temp_lati = location_lati[0];
					temp_longi = location_longi[0];
					
					//check++;
				},
				error : function(XMLHttpRequest, textStatus,
						errorThrown) {
					var str = msg;
					alert(str);
				}
			});

		},
        /**
		 * Method that can be used for basic google.maps.Map creation for given
		 * container
		 * 
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
            
            if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                navigator.geolocation.getCurrentPosition(function (position) {
                	lati = position.coords.latitude;
                	longi = position.coords.longitude;
                	             	
                	alert(longi+"  "+lati);
 
                }, function (error) {
                    
                });
            } else {
              
            }
        }

    };
}($, tlib.logger, tlib.view, tlib.network, tlib.ajax));
//mapping.getCurrentLocation();
mapping.firstTodo();

var p=0;
while(p<10000000){
	p++;
}
p=0;
mapping.initialize();