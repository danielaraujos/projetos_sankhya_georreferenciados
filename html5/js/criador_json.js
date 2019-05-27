//Inicializando Array
var arrayAtual = [];
var setLatLong = [];

//Função responsavel por retornar as coordenadas para setar o mapa.
async function getLatLongMapa(){
	var query = "SELECT TEXTO FROM TSIPAR WHERE CHAVE = 'PROJETOLATLNG'";
	executeQuery(query,null,function(value){
		var dadosQuery = JSON.parse(value);
		if (dadosQuery.length > 0 ){
			manipulaLatLong(dadosQuery);
		}
	},function(value){
		alert(value);
	});
}
// Remove todos espaços e aspas. Pega as informações do tipo String e converte para Array de Float
async function manipulaLatLong(dados){
	var string = JSON.stringify(dados[0]["TEXTO"]);
	string = string.replace(/\s/g, "");
	var value = '';
	for (j = 0; j < string.length; j++){
		if(string[j] === ","){
			value = value.replace('"','')
			setLatLong.push(parseFloat(value));
			value = '';
		}else{
			value += string[j];
		}
	} 
	value = value.replace('"','')
	setLatLong.push(parseFloat(value));
}


//Função responsável por pegar as informações do banco e passar como parametro dara a função de manipulação
async function getInformacoesBanco(){
	var query2 = "SELECT P.CODPROJ AS CODPROJ, P.IDENTIFICACAO AS IDENTIFICACAO, P.AD_COORDENADAS AS AD_COORDENADAS, (SELECT AD_COLORMAP FROM TGFPRO WHERE CODPROD = P.CODPROD ) AS AD_COLORMAP FROM TCSPRJ P WHERE P.AD_COORDENADAS IS NOT NULL";
	executeQuery(query2,null,function(value){
		var dadosQuery = JSON.parse(value);
		if (dadosQuery.length > 0 ){
			 try{
				 manipularCoordenadas(dadosQuery);
			 }catch (e) {
			   console.log(e);
			}
		}
	},function(value){
		alert(value);
	});
}


function replaceData(value){
	value = value.replace(/\r/g, "\r\n");
	value = value.replace(/\s/g, "");
	value = value.replace(/\t/g, "");
	value = value.replace('&#9;', "");
	value = value.replace('&#10;', "");
	return value;
}

//Função responsavel por remover todos caracteres especiais para conseguir manipular arrays
async function manipularCoordenadas(dados){
	for (var k in dados){	
		console.log('Nome do Projeto: '+ dados[k]["IDENTIFICACAO"]);
		console.log('Projeto: '+ dados[k]["CODPROJ"]);
		
		var jsonCoordenadas = JSON.stringify(dados[k]["AD_COORDENADAS"]);
		var string = replaceData(jsonCoordenadas);
		console.log('Coordenadas: '+string);
		
		var temp1 = [];
		var temp2 = [];
		var array3 = [];
		
		var substring = '';
		var value = '';
		
		for(var i = 0; i < string.length; i++ ){
				if(string[i] === "]"){
					substring += ']';
					substring= substring.replace('"[',''); 
					substring= substring.replace(',[',''); 
					temp1.push(substring);
					
					for (j = 0; j < substring.length; j++){
						if(substring[j] === "," || substring[j] === "]"){
							value = value.replace('[','');
							temp2.push(parseFloat(value));
							value = '';
						}else{
							value += substring[j];
						}
					} 
					array3.push(temp2);
					temp2 = [];
					substring = '';
				}else {
					substring += string[i];
				}
			}
			
			// Criação do GeoJson para que o leaflet consiga manipular informações
			var novoJson =  {  
				 "type":"Feature",
				 "properties":{  
					"name": dados[k]["IDENTIFICACAO"],
					"project": parseFloat(dados[k]["CODPROJ"]),
					"color": dados[k]["AD_COLORMAP"]
				 },
				 "geometry":{  
					"type":"Polygon",
					"coordinates":[  
					   array3
					]
				 }
			};
			// Adiciona todos os jsons no array
			arrayAtual.push(novoJson);
	}
}
