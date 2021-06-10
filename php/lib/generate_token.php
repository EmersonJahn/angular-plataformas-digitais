<?php

require('./app-lojas-token.php');

// Criar token
$header = [
    'alg' => 'HS256',
    'typ' => 'JWT'
];

$header = json_encode($header);
$header = base64_encode($header);

$payload = [
    'iss' => 'localhost', // Servidor onde será chamado o WS
    'iat' => 20210610
];

$payload = json_encode($payload);
$payload = base64_encode($payload);

$signature = hash_hmac('sha256', "$header.$payload", CHAVE, true);
$signature = base64_encode($signature);

echo "$header.$payload.$signature";

// Testar token
// $token = TOKEN;

// list($header, $payload, $signature) = explode(".",$token);

// $valid = hash_hmac('sha256', "$header.$payload", CHAVE, true);
// $valid = base64_encode($valid);

// // echo "sign: $signature <br>";
// // echo "val : $valid <br>"; 

// if($signature == $valid){
//    echo "valid";
// } else{
//    echo 'invalid';
// }


?>
