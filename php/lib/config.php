<?php

ini_set("log_errors", 1);
ini_set("error_log", "./php-error.log");

$file = realpath(dirname(__FILE__) . './db.ini');

$config = parse_ini_file($file);

if ($config === FALSE) {
    utilEchoDbConnectionError();
	exit;
}

define('DB_HOST',   $config['DB_HOST']);
define('DB_USER',   $config['DB_USER']);
define('DB_PASS',   $config['DB_PASS']);
define('DB_NAME',   $config['DB_NAME']);
define('DB_ENCODE', $config['DB_ENCODE']);

?>