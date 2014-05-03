function DBQuery(serviceurl, onResult){
	
	/**
* Funcion encargada de realizar la consulta y almacenarla en el array
*@param serviceurl URL del servicio a utilizar
*@param param Parámetros de la consulta
*@param onResult Función que es llamada una vez resuelta la consulta
*/

	
	
	//Utiliza el metodo post
	$.post(serviceurl, function(data, status){	
			onResult(data);
	});
}