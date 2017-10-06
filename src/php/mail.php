<?php
if (!empty($_POST['name']) and !empty($_POST['email']) and !empty($_POST['phone']) and !empty($_POST['message'])){

	$theme = 'Valentina Romanovskaya photography';
	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$message = $_POST['message']; 

	$to = "valen.romanovskaya@gmail.com";
	$letter = 'Данные сообщения <br/><br/>
	Имя: '.htmlspecialchars($name).'<br/>
	Email: '.htmlspecialchars($email).'<br/>
	Телефон: '.htmlspecialchars($phone).'<br/><br/>
	Сообщение: '.htmlspecialchars($message);
	$headers = "content-type: text/html; charset=utf-8\r\n";	
	$headers .= "From:".htmlspecialchars($email);

	mail($to, $theme , $letter, $headers);
	// header("location: ../contacts.html");
	echo "SUCCESS!";
}else{
 echo "ERROR!";
}
?>