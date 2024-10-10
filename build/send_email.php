<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $place = $_POST['place'];
    $age = $_POST['age'];
    $salary = $_POST['salary'];
    $expirience = $_POST['expirience'];


    $to = "duckhowienacxmv7@gmail.com";
    $subject = "Новое сообщение с сайта";
    $body = "Имя: $name\nТелефон: $phone\nМесто проживания: $place\nВозраст: $age\nЗарплата: $expirience\nОпыт: $expirience";

    if (mail($to, $subject, $body)) {
        echo "Сообщение отправлено успешно!";
    } else {
        echo "Произошла ошибка при отправке сообщения.";
    }
}

?>