<?php
		$data = file_get_contents("php://input");
		$item = json_decode($data);
		$namespace = $item->namespace;

		$arquivo = "users/".$namespace.".phtml";


$dataarquivo = file_get_contents("users/".$namespace.".phtml");


$ponteiro = fopen($arquivo, "w");	
		fwrite($ponteiro,"");
		$texto='';
		$texto.=$data;
		$texto.='';

 fwrite($ponteiro, $texto);		

?>