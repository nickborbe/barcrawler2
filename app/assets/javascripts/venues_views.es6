var barID;
$(document).ready(function(){
		loadFeed();
		showFavorites();
		// pullTweets();




	$(".js-maybe").on("click", function(){
		maybe();
	});

	$(".js-nope").on("click", function(){
		nope();
	});

	$(".js-favorites-button").on("click", function(){
		toggleFavorites();
	});

	$(".js-help-button").on("click", function(){
		$(".js-help-modal").modal("show");
	});

	$(".js-map-button").on("click", function(){
		ShowMap();
	});


});

// function pullTweets(){
// 	$.ajax({
// 		type"GET"
// 		url: ""
// 		success: function(respomse){

// 		},
// 		error: function(){
// 			console.log(error);
// 		}
// 	});
// }





function loadFeed(){
	$.ajax({
		type: "GET",
		url: "api/venues/unseen",
		success: function(response){
			 if(response.length > 0) {
			 var barNumber = Math.floor(Math.random() * response.length); 
			 	 barID = response[barNumber].id;
			 	$(".js-bar-name").text(response[barNumber].name);
			$(".js-live-feed").prop("src", response[barNumber].url);
				showFavorites();
			
			 }
			 else{
			 	showAlert();
			 	loadFavorite();
			 	showFavorites();

			 }
		},
		error: function(){
			console.log("Oh My God! Everything is Broken! Jesus! Ctrl Z! Ctrl Z!");
		}
	});
}


		var showAlert = (function() {
    				var firstTime = true;
    				return function () {
        			if (firstTime) {
            		firstTime = false;
            		alert("Sorry, there are no more bars to browse. Loading your favorites.");
					}
    			};
			})();

function loadFavorite(){
	$.ajax({
		type: "GET",
		url: "api/venues/upvoted",
		success: function(response){
			 if(response.length > 0) {
			 var barNumber = Math.floor(Math.random() * response.length); 
			 	barID = response[barNumber].id;
			 	$(".js-bar-name").text(response[barNumber].name);
			$(".js-live-feed").prop("src", response[barNumber].url);
			 }
			 else{
			 	$(".js-bar-name").text("You have run out of bars - please check back later");
			$(".js-live-feed").prop("src", "https://s-media-cache-ak0.pinimg.com/originals/e0/f5/a5/e0f5a5f8c2e378df4fddd75e26e9a5a3.gif");
			 	
			 }
		},
		error: function(){
			console.log(error);
		}
	});
}



function ShowMap() {
	$.ajax({
		type: "GET",
		url: "api/venues/" + barID,
		success: function(response){
			var the_lat = response.lat;
			var the_lng = response.lng;
			var myCenter = new google.maps.LatLng(the_lat, the_lng)
			
			var map = new google.maps.Map(document.getElementById('map'), {
			      zoom: 15,
			      center: myCenter,
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    });

			    var marker = new google.maps.Marker({
			      position: map.getCenter(),
			      map: map
			    });

			    var infowindow = new google.maps.InfoWindow({
			      content: ` 
			      	${response.name} <br>
			      	${response.address}  
			      	<br>
			      	<a target="_blank" href="http://maps.google.com/maps?saddr=?&daddr=${response.address}" >Click Here for Directions</a> 
			      		`
			    });

			    infowindow.open(map, marker);


						$(".the-entire-page").show();


						$("#map").show(function(){
							google.maps.event.trigger(map, 'resize');
							map.setCenter(myCenter);
							infowindow.open(map, marker);
						});

						$(".the-entire-page").on("click", function(){
							$("#map").hide();
							$(".the-entire-page").hide();
						});

	
				},

		error: function(){
			console.log(error);
		}

	});
}


			
	
function toggleFavorites(){

	var list = document.getElementById("favorites-list");

	if(list.style.display == 'block')
          list.style.display = 'none';
       else
          list.style.display = 'block';
}





function takeAnotherLook(id){
	$.ajax({
		type:"GET",
		url:"/api/venues/upvoted",
		success: function(response){
			var arrayPosition;
			response.forEach(function(bar){
				if( bar.id == id){
					barID = id;
					arrayPosition = response.indexOf(bar);
			$(".js-bar-name").text(response[arrayPosition].name);
			$(".js-live-feed").prop("src", response[arrayPosition].url);
				};
			});
		},
		error: function(){
			console.log(error);
		}
	});
	
}



function maybe(){
	$.ajax({
		type: "PATCH",
		url: "api/upvote/venues/"+ barID,
		success: function(response){
		loadFeed();	
		// showFavorites();
		},
		error: function(error){
			console.log(error);
		}
	});
}


function nope(){
	$.ajax({
		type: "PATCH",
		url: "api/downvote/venues/"+ barID,
		success: function(response){
		loadFeed();
		// showFavorites();
		},
		error: function(error){
			console.log(error);
		}
	});	
}
		


function showFavorites(){

	$.ajax({
		type: "GET",
		url: "/api/venues/upvoted",
		success: function(response){
			
			$(".js-favorites").empty();
			response.forEach(function(favorite){
				var list = `
				<li>
					<button id="upvoted-bar-name" class="js-take-another-look" data-bar-id="${favorite.id}"> 
						${favorite.name} 
					</button>
				</li>
				`;
			$(".js-favorites").append(list);
			});

			$(".js-take-another-look").on("click", function(event){
				var theID = $(event.currentTarget).data("bar-id");
			takeAnotherLook(theID);
		});	


		},
		error: function(){
			console.log("Cannot show favorites")
		}
	});

	
}




// function ShowMap() {
// 	$.ajax({
// 		type: "GET",
// 		url: "api/venues/" + barID,
// 		success: function(response){
// 			var the_lat = response.lat;
// 			var the_lng = response.lng;
			
// 				var myCenter=new google.maps.LatLng(the_lat, the_lng);


// 				  var mapProp = {
// 				    center:myCenter,
// 				    zoom:15,
// 				    mapTypeId:google.maps.MapTypeId.ROADMAP
// 				  };

// 				  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

// 					  var marker=new google.maps.Marker({
// 					  position:myCenter, 
// 					});

// 				  		marker.setMap(map);


// 						google.maps.event.addDomListener(window, 'load', ShowMap);

// 						$(".the-entire-page").show();


// 						$("#googleMap").show(function(){
// 							google.maps.event.trigger(map, 'resize');
// 							map.setCenter(myCenter);
// 						});

// 						$(".the-entire-page").on("click", function(){
// 							$("#googleMap").hide();
// 							$(".the-entire-page").hide();
// 						});

	
// 				},

// 		error: function(){
// 			console.log(error);
// 		}

// 	});
// }

