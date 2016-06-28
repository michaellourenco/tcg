angular
.module('app.user').factory("usersAPI", function($http){
	var _getUsers = function(){
		return $http.get("users/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } });
	};
	var _saveUser = function(user){
		return $http.post("editaruser.php", user);
	}
	var _luta = function(p1,p2){

	}
	return {
		getUsers : _getUsers,
		saveUser : _saveUser
	};
});