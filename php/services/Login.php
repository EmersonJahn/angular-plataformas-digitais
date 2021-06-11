<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');
// require('../lib/token.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

// foreach (getallheaders() as $name => $value) {
//     if ($name == 'token') {
//         $token = $value;
//     }
// }    

// if (!utilValidToken($token)) {
//     exit;
// }

$email    = trim($_POST["email"]);
$password = trim($_POST["password"]);

$connection = new Connection();
list($status, $message, $personId) = explode("|", $connection->connValidLogin($email, $password));

$person = new stdClass();
if ($status == 1 && $personId > 0) {
    $p = $connection->connGetPersonById($personId);

    $person->id             = intval($p->id);
    $person->person_type_id = intval($p->tipo_pessoa_id);
    $person->name           = trim($p->nome);
    $person->cpf            = trim($p->cpf);
    $person->cnpj           = trim($p->cnpj);
    $person->email          = trim($p->email);
    $person->profile_photo  = trim($p->foto_perfil);
}

utilEchoReponse($status, $message, "person", $person);


?>