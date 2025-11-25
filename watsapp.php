<?php
require '../config.php';

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['nombre']) || !isset($input['mensaje'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

$nombre = htmlspecialchars($input['nombre']);
$correo = htmlspecialchars($input['correo'] ?? '');
$telefono = preg_replace('/[^0-9]/', '', $input['telefono'] ?? '');
$mensaje = htmlspecialchars($input['mensaje']);

// 💬 Mensaje enviado a YukuLink (administrador)
$texto = "💚 Nuevo mensaje desde *YukuLink*:\n\n"
       . "👤 Nombre: $nombre\n"
       . "📧 Correo: $correo\n"
       . "📞 Teléfono: $telefono\n"
       . "💬 Mensaje: $mensaje";

$data = [
  "messaging_product" => "whatsapp",
  "to" => YUKULINK_ADMIN,
  "type" => "text",
  "text" => ["body" => $texto]
];

$ch = curl_init(API_URL);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Authorization: Bearer ' . WHATSAPP_TOKEN,
  'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response ?: json_encode(['status' => 'ok']);
?>
