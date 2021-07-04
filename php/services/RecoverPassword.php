<?php

date_default_timezone_set('America/Sao_Paulo');

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

require('../lib/util.php');
require('../lib/connection.php');

utilDefinesHeaders();

$rest_json = file_get_contents("php://input");
$_POST     = json_decode($rest_json, true);

$email = trim($_POST["email"]);

$connection = new Connection();
$isValid   = $connection->connValidPersonEmail($email);

$status  = 0;

if ($isValid) {
    $password  = utilGenerateRandomString();
    $emailSent = utilSendEmail($email, "E-mail para recuperação de senha.", "Olá, sua senha provisória é: <b>$password</b>. <br> Aconselhamos trocá-la no primeiro acesso.");

    if ($emailSent) {
        $updated = $connection->connUpdatePersonPassword($password, $email);

        if ($updated) {
            $status  = 1;
            $message = 'E-mail de recuperação de senha enviado com sucesso.'; 
        } else {
            $message = 'Ocorreu um erro ao atualizar a senha, por favor, ignore o e-mail recebido.'; 
        }

    } else {
        $message = 'Ocorreu um erro desconhecido ao enviar o e-mail de recuperação de senha.';
    }

} else {
    $message = 'E-mail não cadastrado.'; 
}

utilEchoReponse(null, null, $status, $message);

?>