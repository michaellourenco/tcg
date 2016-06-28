//'use strict';


angular
.module('app.mapaForca').factory("mapaForcaAPI", function($http){
    var _getMapaForca = function(){
        return $http.get("mapaForcas/"+namespace+".phtml", { headers: { 'Cache-Control' : 'no-cache' } });
    };
    var _saveMapaForca = function(mapaForca){
        return $http.post("editarmapaForca.php", mapaForca);
    }
    return {
        getMapaForca : _getMapaForca,
        saveMapaForca : _saveMapaForca
    };
});