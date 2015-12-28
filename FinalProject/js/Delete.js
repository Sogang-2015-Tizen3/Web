///*jslint devel: true*/
///*global $, Audio, window, Tizen, SystemIO, document,
//  navigator, clearTimeout, setTimeout, Image */
var WhereIsItemLati;
var WhereIsItemLongi;
function goDelete(param){
	var url = "http://cspro.sogang.ac.kr/~cse20101666/delete.php";
	//alert(param);
	$.ajax({
		type : "POST",
		url : url,
		data : param,
		success : function(msg) {
			//alert(msg);
			location.href = "delete.html";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(msg);
			//location.href = "delete.html";
		}
	});
}
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

//				 alert(id[i] + " " + imagelocation[i] + " " + name[i] + " "
//				 + price[i] + " " + want[i] + " " + location_longi[i]
//				 + " " + location_lati[i] + " " + regdate[i]);
			}

			var element = document.getElementById("GetAllThings");

			for (i = 0; i < length; i++) {
				list[i] = document.createElement("button");
				list[i].setAttribute("style", "font-size: 30px");
				list[i].setAttribute("style", "background-color: #8BBDFF;");
				
				//list[i].setAttribute("style", "height: 100%; width: 100%;");
				//list[i].style.setAttribute('width','150px');
				list[i].style.width='100%';
				list[i].style.height='50px';
				
				//list[i].style.color = '#8BBDFF';
				list[i].value = id[i];
				list[i].name = name[i];
				list[i].id = i;
				//list[i].setAttribute("style", "height: 10%;");
				list[i].onclick = function(){
					location.href = "#seoul";

					goGetItem("id="+this.value);
					//location.href = "ShowItem.html";
				}
				
				node[i] = document.createTextNode(name[i]);
				list[i].appendChild(node[i]);
				
				element.appendChild(list[i]);
			}
//			list[0].onclick = function(){
//				location.href = "#seoul";
//
//				goGetItem("id="+this.value);
//				//location.href = "ShowItem.html";
//			}
			
			document.getElementById("targetImg").src = imagelocation[0];
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			var str = msg;
			alert(str);
		}
	});
	
}
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
			
			document.getElementById("Showid").innerHTML = id[0];
			document.getElementById("Showimage").src = imagelocation[0];
			document.getElementById("Showname").innerHTML=name[0];
			document.getElementById("Showprice").innerHTML=price[0];
			document.getElementById("Showwant").innerHTML=want[0];
			document.getElementById("DeleteItem").onclick=function()
			{
				goDelete(param);
			}
			WhereIsItemLati = location_lati[0];
			WhereIsItemLongi = location_longi[0];
			
//			i=0;
//			while(i<10000){
//				i++;
//			}
//			i=0;
			//alert(WhereIsItemLati+" "+WhereIsItemLongi);
			
			var myLatLng = new google.maps.LatLng(WhereIsItemLati, WhereIsItemLongi);
			
			//while(s_location_lati==null){};
			var map = new google.maps.Map(document.getElementById('Showlocation'), {
			    zoom: 13,
			    center: myLatLng
			});
			var marker = new google.maps.Marker({
			    position: myLatLng,
			    map: map,
			    title: 'Hello World!'
			});
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert(msg);
			location.href = "delete.html";
		}
	});
}


function BacktoIndex(){
	
	location.href="index.html"
	
}
function Backtolist(){
	
	location.href="delete.html"
	
}
