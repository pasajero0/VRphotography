<?php
if (!empty($_POST['name']) and !empty($_POST['email']) and !empty($_POST['phone']) and !empty($_POST['message'])){

	$theme = 'Valentina Romanovskaya photograpy'

	$letter = 'Данные сообщения:r\n';
	$letter .= 'Имя:'.$_POST['name'].'r\n';
	$letter .= 'Email:'.$_POST['email'].'r\n';
	$letter .= 'Телефон:'.$_POST['phone'].'r\n';
	$letter .= 'Сообщение:'.$_POST['message'].'r\n';

	mail('valen.romanovskaya@gmail.com', $theme , $letter);
	echo "Сообщение отправлено!";
}else{
 echo "Ошибка отправки сообщения!";
}