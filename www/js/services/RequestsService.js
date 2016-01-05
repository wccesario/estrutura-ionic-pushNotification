(function(){

	angular.module('starter')
	.service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

	function RequestsService($http, $q, $ionicLoading){

		//for server
		var base_url = '{sua_url}';

		function register(device_token){

			var deferred = $q.defer();
			$ionicLoading.show();

			$http.post(base_url, {'device_token': device_token})
				.success(function(response){
					
					$ionicLoading.hide();
					deferred.resolve(response);
					
				})
				.error(function(data){
					deferred.reject();	
				});

				var url_register = '{sua_url}';

				$http.post(url_register, {'dtk': device_token})
				.success(function(resposta){
				  
				  // document.write('<p>' + resposta + '</p>');
				  
				})
				.error(function(dados){
				  // document.write('<p>' + 'something failed:' + dados + '</p>'); 
				});
			

			return deferred.promise;			

		};


		return {
			register: register
		};
	}
})();