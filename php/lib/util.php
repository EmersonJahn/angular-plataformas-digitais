<?php

function utilEchoDbConnectionError() {

    if (!class_exists('Response')) {
		class Response{}
	}

	header('HTTP/1.0 500 Internal Server Error');

	$response = new Response();
	$response->status  = 0;
	$response->message = 'Erro na conexão com o banco de dados.';

	echo json_encode($response);
    
}

?>