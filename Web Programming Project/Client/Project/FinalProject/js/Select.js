function goGetItem(param){
	
	var url = "http://cspro.sogang.ac.kr/~cse20101666/select.php";
	//alert(param);
	var id = new Array();
	var imagelocation = new Array();
	var name = new Array();
	var price = new Array();
	var want = new Array();
	var location_longi = new Array();
	var location_lati= new Array();
	var regdate = new Array();
	
	var map;
	$.ajax({
		type : "POST",
		url : url,
		data : param,
		success : function(msg) {
			//alert(msg);
			var string = msg;
			// alert(string);
			var strArr = string.split('#');
			
			// alert(length + " " + strArr.length / 8 + " " + strArr.length);
			// for(j=0;j<strArr.length;j++){
			// alert(j+" "+strArr[j]);
			// }
			var j = 0;
			var i = 0;
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

			//alert(id[i] + " " + imagelocation[i] + " " + name[i] + " "
			//+ price[i] + " " + want[i] + " " + location_longi[i]
			//+ " " + location_lati[i] + " " + regdate[i]);
			
			document.getElementById("Showid").write=id[0];
			document.getElementById("Showimage").src = imagelocation[0];
			document.getElementById("Showname").write=id[0];
			document.getElementById("Showprice").write=id[0];
			document.getElementById("Showwant").write=id[0];
			
			var myLatLng = {lat:location_lati[0], lng: location_longi[0]};
			alert(location_lati[0]+" "+location_longi[0]);
			var map = new google.maps.Map(document.getElementById('Showlocation'), {
			    zoom: 4,
			    center: myLatLng
			});
			var marker = new google.maps.Marker({
			    position: myLatLng,
			    map: map,
			    title: 'Hello World!'
			  });
//			map = that.createMapForGivenContainer("Showlocation", {
//                zoom: 14,
//                lat: temp_lati,
//                lon: temp_longi,//126.92
//                streetViewControl: false,
//                mapTypeId: google.maps.MapTypeId.ROADMAP
//            });
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(msg);
			location.href = "delete.html";
		}
	});
}