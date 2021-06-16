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

function utilEchoReponse($field = null, $value = null, $status = 1, $message = "Busca realizada com sucesso!") {
    if (!class_exists('Response')) {
		class Response{}
	}

	$response = new Response();
	$response->status  = $status;
	$response->message = $message;
    if ($field) {
        $response->$field = $value;
    }

	echo json_encode($response); 
}

function utilSendEmail($destination, $subject, $message, $title = "") {
    // ini_set('SMTP', "smtp.gmail.com");
    // ini_set('smtp_port', "80");
    // ini_set('sendmail_from', "ucsinova@gmail.com");

	$headers  = 'Content-Type: text/html; charset=utf-8'."\r\n";
	$headers .= 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: UCSiNOVA <ucsinova@gmail.com>';
    
    if (!(isset($title) && $title != "")) {
        $title = $subject;
    }

    $body = "
        <html>
            <body>
                <p>$title</p>
                <br>
                <table>
                    $message
                </table>
            </body>
        </html>
    ";
    
	$emailSent = mail($destination, $subject, $body, $headers);

    return $emailSent;
}

function utilGenerateRandomString($length = 15, $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    $charactersLength = strlen($characters);
    $randomString = '';

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }

    return $randomString;
}

function utilFormatProblem($problem) {
    // $c = $connection->connGetCategoryById(intval($problem->categoria_id));
    // $category = new stdClass();
    // if ($c) {
    //     $category->id          = intval($c->id);
    //     $category->description = trim($c->descricao);
    // }

    $p = $problem;

    $problem = new stdClass();
    $problem->id                   = intval($p->id);
    $problem->person_id            = intval($p->pessoa_id);
    $problem->category_id          = intval($p->categoria_id);
    $problem->title                = trim($p->titulo);
    $problem->description          = trim($p->descricao);
    $problem->status_problem_id    = intval($p->status_problema_id);
    $problem->number_answers       = intval($p->numero_respostas);

    return $problem;
}

?>