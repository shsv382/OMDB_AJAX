$(document).ready(function() {
	var form = document.getElementsByTagName("FORM");
	var ul = document.getElementsByTagName("UL")[0];
	var response;
	var s = document.getElementsByTagName('INPUT')[0];
	var counter = 1;

	s.onkeyup = function() {
		ul.innerHTML = "";
		search();
	}

	more.onclick = function() {
		counter++;
		search();
	}

	document.body.onscroll = function() {
		console.log("more:" + more.getBoundingClientRect().top);
		console.log("doc:" + document.body.clientHeight);
		if (more.getBoundingClientRect().top <= document.documentElement.clientHeight) {
			counter++;
			search();
		}
	}
	
	function search() {
		var xhr = new XMLHttpRequest();
		

		xhr.open("GET", "http://www.omdbapi.com/?apikey=10354ae7&s=" + encodeURIComponent(s.value) + "&page=" + counter, true);
		
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send();
		xhr.onloadend = function() {	
			
			response = JSON.parse(xhr.responseText);
			if (response["Error"]) ul.innerHTML = response["Error"]; 
			for(var i = 0; i < response["Search"].length; i++) {
				var li = document.createElement("li");
				li.innerHTML = response["Search"][i]["Title"];
				ul.appendChild(li);
			}
		};
	}

});

// http://www.omdbapi.com/?apikey=10354ae7&t=Star&y=2012&plot=full