<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $place = htmlspecialchars($_POST['place']);
    $age = htmlspecialchars($_POST['age']);
    $salary = htmlspecialchars($_POST['salary']);
    $expirience = htmlspecialchars($_POST['expirience']);

    $to = "stayzer2@gmail.com";
    $subject = "Новая заявка на вакансию";
    $message = "
        <html>
        <head>
            <title>Новая заявка на вакансию</title>
        </head>
        <body>
            <h2>Данные заявки</h2>
            <p><strong>Имя:</strong> $name</p>
            <p><strong>Телефон:</strong> $phone</p>
            <p><strong>Место жительства:</strong> $place</p>
            <p><strong>Возраст:</strong> $age</p>
            <p><strong>Желаемый доход:</strong> $salary</p>
            <p><strong>Опыт работы:</strong> $expirience</p>
        </body>
        </html>
    ";

    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: <$phone>" . "\r\n";

    // Отправляем письмо
    if (mail($to, $subject, $message, $headers)) {
        echo "Сообщение успешно отправлено!";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
} else {
    echo "Неверный запрос.";
}
?>
