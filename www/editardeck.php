<?php
		$data = file_get_contents("php://input");
		$item = json_decode($data);
		$namespace = $item->nome;

		$arquivo = "decks/meudeck.phtml";




$ponteiro = fopen($arquivo, "w");	
		fwrite($ponteiro,"");
		$texto='';
		$texto.=$data;
		$texto.='';

 fwrite($ponteiro, $texto);		

?>