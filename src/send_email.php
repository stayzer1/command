<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $place = htmlspecialchars($_POST['place']);
    $age = htmlspecialchars($_POST['age']);
    $salary = htmlspecialchars($_POST['salary']);
    $expirience = htmlspecialchars($_POST['expirience']);

    $mail = new PHPMailer(true);

    try {
        // Настройки сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Адрес SMTP сервера
        $mail->SMTPAuth = true;
        $mail->Username = 'your_email@gmail.com'; // Ваш адрес электронной почты
        $mail->Password = 'your_email_password'; // Ваш пароль или приложение для пароля
        $mail->SMTPSecure = 'tls'; // Включает шифрование TLS
        $mail->Port = 587; // Порт для TLS

        // Получатели
        $mail->setFrom('your_email@gmail.com', 'Mailer');
        $mail->addAddress('stayzer2@gmail.com'); // Добавьте адрес получателя

        // Содержание письма
        $mail->isHTML(true);
        $mail->Subject = 'Новая заявка на вакансию';
        $mail->Body = "
            <h2>Данные заявки</h2>
            <p><strong>Имя:</strong> $name</p>
            <p><strong>Телефон:</strong> $phone</p>
            <p><strong>Место жительства:</strong> $place</p>
            <p><strong>Возраст:</strong> $age</p>
            <p><strong>Желаемый доход:</strong> $salary</p>
            <p><strong>Опыт работы:</strong> $expirience</p>
        ";

        $mail->send();
        echo 'Сообщение успешно отправлено';
    } catch (Exception $e) {
        echo 'Ошибка при отправке сообщения: ', $mail->ErrorInfo;
    }
} else {
    echo "Неверный запрос";
}
?>
