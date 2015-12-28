///*jslint devel: true*/
///*global $, Audio, window, Tizen, SystemIO, document,
//  navigator, clearTimeout, setTimeout, Image */

var localStream = "";
function BacktoIndex(){
	
	location.href="index.html"
	
}

function goPage(){
	var url = "http://cspro.sogang.ac.kr/~cse20101666/insert.php";
	var parameter = $('#dynForm').serialize();
	$.ajax({
		type : "POST",
		url : url,
		data : parameter,
		success : function(msg) {
			
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			location.href = "index.html";
		}
	});
}
function SuccessCallBack(stream) {
	var URL = window.webkitURL;
	document.getElementById("videoView").src = URL.createObjectURL(stream);
	localStream = stream;
}
function ErrorCallBack(e) {
	console.log(e);
}
function getVideoStream() {
	navigator.webkitGetUserMedia({
		video : true
	}, SuccessCallBack, ErrorCallBack);
}
function getCapture() {
	if (localStream) {
		var canvas = document.getElementById("canvasView");
		var duri = canvas.toDataURL();
		var context = canvas.getContext('2d');
		var temp;
		var fileName = 'IMAGE_' + Date.now().toString() + '.jpg';

		context.drawImage(document.getElementById("videoView"), 0, 0, 300, 225);

		//document.getElementById("imgView").src = canvas.toDataURL('image/webp');
		var data = canvas.toDataURL().replace('data:image/png;base64,', '')
				.replace('data:,', '');

		
		tizen.filesystem.resolve('images', function(dir) {
		
			var file = dir.createFile(fileName);
			file.openStream('w', function(stream) {
				stream.writeBase64(data);
				stream.close();
				tizen.content.scanFile(file.toURI());
				
				document.getElementById("imagelocation").value = file.toURI();
				temp = document.getElementById("imagelocation").value;
				alert(temp);
				
			}, function(e) {
				alert('Error: ' + e.message);

			}, 'UTF-8');
		}, function(e) {
			alert('Error: ' + e.message);
		}, "rw");
	}
}
