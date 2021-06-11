<?php

function utilDefinesHeaders() {
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Headers: Content-Type, token');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
        header("HTTP/1.1 200 OK");
        exit;
    }
}

function utilVerifyResquestNotNull($request) {
    if (!$request) {

        if (!class_exists('Response')) {
            class Response{}
        }
    
        header('HTTP/1.0 400 Bad Request');

        $response = new Response();
        $response->status  = 0;
        $response->message = "Json mal formatado.";
        
        echo json_encode($response);

        return false;
    }

    return true;
}


// function utilValidToken($token) {
//     list($header, $payload, $signature) = explode(".", $token);

//     $valid = hash_hmac('sha256', "$header.$payload", CHAVE, true);
//     $valid = base64_encode($valid);

//     if ($signature != $valid) {

//         header('HTTP/1.0 401 Unauthorized');

//         if (!class_exists('Response')) {
//             class Response{}
//         }

//         $response = new Response();
//         $response->status  = 0;
//         $response->message = 'Token inválido.';
        
//         echo json_encode($response);

//         return false;
//     }

//     return true;
// }

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

function utilEchoReponse($status = null, $message = null, $field = null, $value = null) {
    if (!class_exists('Response')) {
		class Response{}
	}

	$response = new Response();
	$response->status  = $status or $status == 0 ? $status  : 1;
	$response->message = $message ? $message : 'Busca realizada com sucesso.';
    if ($field) {
        $response->$field = $value;
    }

	echo json_encode($response); 
}

?>