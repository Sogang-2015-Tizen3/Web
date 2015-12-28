var lati,longi,length,
id = [],
	imagelocation = [],
	name = [],
	price = [],
	want = [],
	location_longi = [],
	location_lati= [],
	regdate = [];
function BacktoIndex(){
	
	location.href="index.html"
	
}
function totalmap(){
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

			
		    if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
                navigator.geolocation.getCurrentPosition(function (position) {
                	lati = position.coords.latitude;
                	longi = position.coords.longitude;
                	
                	var myLatLng = new google.maps.LatLng(lati,longi);
        			
        			//while(s_location_lati==null){};
        			var map = new google.maps.Map(document.getElementById('totalmap'), {
        			    zoom: 13,
        			    center: myLatLng
        			});
        			i=0;
        			for(i=0;i<length;i++){
        				   
//        				var contentString = '<div>you are Here</div>';
//        				var infowindow = new google.maps.InfoWindow({
//        				    content: contentString
//        				});

                        var myLatLng = new google.maps.LatLng(location_lati[i],location_longi[i]);
                        var marker = new google.maps.Marker({
                            	position:  myLatLng,
                            	map: map
                        });
//                        marker.addListener('click', function() {
//                            infowindow.open(map, marker);
//                        });
        			}
                	//alert(longi+"  "+lati);
 
                }, function (error) {
                    
                });
            } 
		    else {
              
            }
					
			
			//check++;
		},
		error : function(XMLHttpRequest, textStatus,
				errorThrown) {
			var str = msg;
			alert(str);
		}
	});
	
	
	
	
	
}