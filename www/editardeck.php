<?php
		$data = file_get_contents("php://input");
		$item = json_decode($data);
		$namespace = $item->nomeDeck;

		$arquivo = "decks/".$namespace.".phtml";


$dataarquivo = file_get_contents("decks/".$namespace.".phtml");


$ponteiro = fopen($arquivo, "w");	
		fwrite($ponteiro,"");
		$texto='';
		$texto.=$data;
		$texto.='';

 fwrite($ponteiro, $texto);		

?>