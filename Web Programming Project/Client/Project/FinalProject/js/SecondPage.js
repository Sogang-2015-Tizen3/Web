function initiate() {
	var i;
	var j = 0;
	var length;
	// ===================================
	var id = new Array();
	var imagelocation = new Array();
	var name = new Array();
	var price = new Array();
	var want = new Array();
	var location_longi = new Array();
	var location_lati= new Array();
	var regdate = new Array();
	// ===========8============
	var list = new Array();
	var node = new Array();

	var url = "http://cspro.sogang.ac.kr/~cse20101666/getall.php";
	var imagelocation;
	$.ajax({
		type : "POST",
		url : url,
		data : null,
		success : function(msg) {
			var string = msg;
			// alert(string);
			var strArr = string.split('#');
			length = parseInt((strArr.length - 1) / 8);
			// alert(length + " " + strArr.length / 8 + " " + strArr.length);
			// for(j=0;j<strArr.length;j++){
			// alert(j+" "+strArr[j]);
			// }
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

				 alert(id[i] + " " + imagelocation[i] + " " + name[i] + " "
				 + price[i] + " " + want[i] + " " + location_longi[i]
				 + " " + location_lati[i] + " " + regdate[i]);
			}

			var element = document.getElementById("GetAllThings");

			for (i = 0; i < length; i++) {
				list[i] = document.createElement("li");
				node[i] = document.createTextNode(id[i] + " "
						+ name[i]+ " " + price[i]);
				list[i].appendChild(node[i]);
				element.appendChild(list[i]);
			}

			document.getElementById("targetImg").src = imagelocation[0];
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			var str = msg;
			alert(str);
		}
	});
	
}
//var neighborhoods = [ {
//	lat : 52.511,
//	lng : 13.447
//}, {
//	lat : 52.549,
//	lng : 13.422
//}, {
//	lat : 52.497,
//	lng : 13.396
//}, {
//	lat : 52.517,
//	lng : 13.394
//} ];
//
//var markers = [];
//var map;
//
//function initMap() {
//	alert(location_lati[0]);
//	map = new google.maps.Map(document.getElementById('map'), {
//		zoom : 12,
//		center : {
//			lat : 10.23,
//			lng : 32.3
//		}
//	});
//}
//
//function drop() {
//	clearMarkers();
//	for (var i = 0; i < neighborhoods.length; i++) {
//		addMarkerWithTimeout(neighborhoods[i], i * 200);
//	}
//}
//
//function addMarkerWithTimeout(position, timeout) {
//	window.setTimeout(function() {
//		markers.push(new google.maps.Marker({
//			position : position,
//			map : map,
//			animation : google.maps.Animation.DROP
//		}));
//	}, timeout);
//}
//
//function clearMarkers() {
//	for (var i = 0; i < markers.length; i++) {
//		markers[i].setMap(null);
//	}
//	markers = [];
//}

