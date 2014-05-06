		function InitializeParse(){
			Parse.initialize("e9x1rMT71C6CNbd2nIeY5RauWTznaexHmdaUePvc", "1NLogz7TbWfxZssM8K04hXNh1XO1dfQjCkUv5wzO");
		}
			
		function setBar(key,value){
			localStorage.setItem(key, value);
		}	
		
		function printList(query, rootElement, printProperty, onClickFunction) {
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var object = results[i];
						onClickString = '';
						if(onClickFunction) {
													
							onClickString = 'onClick='+onClickFunction+'("'+object.id+'")';
						}
						if(onClickFunction ==='printTapas' ){
						
						rootElement.append('<div class="secondMenu">'+
       '<div  class="colorPrimary listLocal" >'+object.get(printProperty)+'</div>'+
        '<a class="iconImage" href="../pages/mapa_g.html"><img src="../img/secondMenuB.JPG" width="50" height="50"></a>'+
        '<a class="iconImage" onclick="setBar('+"'barID'"+','+"'"+object.id+"'"+')" href="../pages/tapas.html"><img src="../img/secondMenuC.JPG" width="50" height="50"></a>'+
        '</div>');

        }else if(onClickFunction ==='printRestaurants'){
			localStorage.setItem("rutaID", object.id);
       rootElement.append('<div onclick="javascript:window.location.href=\'../pages/locales.html\'" class="colorPrimary listRutas" >'+object.get(printProperty)+'</div>');

        }else{
			alert(object.id);
		rootElement.append('<div><div class="colorPrimary listTapas" ><div style="float:left;">'+
		'<img src="../img/secondMenuB.JPG" width="50" height="50"></div><div>'+object.get(printProperty)+'</div>'+
		'</div><a href="../pages/mapa_u.html"><img src="../img/secondMenuB.JPG" width="50" height="50"></a>'+
		'<a  href="../pages/tapas.html"><img src="../img/secondMenuC.JPG" width="50" height="50"> </a></div>');
			
			}
					    }
				},
				error: function(error) {

				}
			});
		}

		function printRoutes(rootElement) {
			
			$("#"+rootElement).empty();
			printList(findAllRoutesQuery(), $("#"+rootElement), 'name', 'printRestaurants');
		}

		function printRestaurants(rootElement,routeId) {
			$("#"+rootElement).empty();
			printList(findRestaurantsByRouteQuery(routeId),$("#"+rootElement), 'name', 'printTapas');

		}

		function printTapas(rootElement,restaurantId) {
			$("#"+rootElement).empty();
			printList(findTapaByRestaurantQuery(restaurantId), $("#"+rootElement), 'name');
		}
		
		function loadRestaurants(query,rootElement) {
			query.find({
				success: function(results) {
					for (var i = 0; i < results.length; i++) {
						var object = results[i];
						var Latlng = new google.maps.LatLng(object.get('location').latitude,object.get('location').longitude);
					
					var marker = new google.maps.Marker({position: Latlng,map: rootElement,title: object.get('name')});
									
					    }
				},
				error: function(error) {

				}
			});
		}
	
//--------------------------
//--------------------------
//Functions to database
//--------------------------
//--------------------------

function findAllRoutesQuery() {
	var Route = Parse.Object.extend("Route");
	var query = new Parse.Query(Route);
	return query;
}

function findRestaurantsByRouteQuery(routeId) {
	var Route = Parse.Object.extend("Route");
	var route = new Route();
	route.id = routeId;

	var Restaurant = Parse.Object.extend("Restaurant");
	var query = new Parse.Query(Restaurant);
	query.equalTo("route", route);
	return query;
}

function findTapaByRestaurantQuery(restaurantId) {
	var Restaurant = Parse.Object.extend("Restaurant");
	var restaurant = new Restaurant();
	restaurant.id = restaurantId;

	var Tapa = Parse.Object.extend("Tapa");
	var query = new Parse.Query(Tapa);
	query.equalTo("restaurant", restaurant);
	return query;
}

function addTapaRelation(restaurantId, tapaId) {
	var Tapa = Parse.Object.extend("Tapa");
	var Restaurant = Parse.Object.extend("Restaurant");
	var restaurantQuery = new Parse.Query(Restaurant);
        restaurantQuery.get(restaurantId, {
		success: function(restaurant) {
			var tapaQuery = new Parse.Query(Tapa);
			tapaQuery.get(tapaId, {
				success: function(tapa) {
					var relation = tapa.relation('restaurant');
					relation.add(restaurant);
					tapa.save(null, {
						success: function(restaurant) {
						},
						error: function(restaurant, error) {
						}
					});	
				},
				error: function(error) {
				}
			});
		}, 
		error: function (error) {
		}
	});
}

