function init() {
	getLatLongMapa();
	getInformacoesBanco();
	setTimeout(reloadData, 150);	//Esperar 100 milesimos para recarregar informações dos talhões
}

function openSecondLevel(P_CODPROJ){
   var params = {'P_CODPROJ' : P_CODPROJ};
   openLevel('lvl_ai5zxyj', params);
}

function reloadData(){
	
	var map = L.map('map').setView(setLatLong, 14.4);

	L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 16,
		minZoom: 12,
		attribution: '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		id: 'mapbox.light'
	}).addTo(map);


	try{
		var json = L.geoJSON(arrayAtual, {
		color: 'white',
		weight: 2.0,
		stroke: 1,
		style: function(feature) {
			if (feature.properties.color != null){
				return {fillColor: feature.properties.color};
			}else {
				return {fillColor: 'black'};
			}
		}
		}).addTo(map);
		
		// Evento responsavel por exibir o nome do talhão, quando se passa o mouse por cima.
		json.on('mouseover', function(e) {
		var popupContent = "";
		if (e.layer.feature.properties && e.layer.feature.properties.name) {
			popupContent += e.layer.feature.properties.name;
			var popup = L.popup().setLatLng(e.latlng) .setContent(popupContent).openOn(map);
			}
		});

		// Evento responsavel por mudança de level dentro do dash. Quando é clicado, o evento é desparado.
		json.on('click', function(e) {
			var level = null;
			if (e.layer.feature.properties && e.layer.feature.properties.project) {
				level = Number(e.layer.feature.properties.project);
				openSecondLevel(level);
			}
		});
	}catch (e) {
	   alert('Caro usuario, ocorreu um erro na leitura do JSON. Provavelmente, uma de suas coordenadas esteja com algum problema. Visualize o console para diagnosticar o erro.');
	   console.log(e);
	}
	
}