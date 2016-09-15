<?php

//error_reporting(-1);
//ini_set('display_errors', 'On');
//set_error_handler('var_dump');

// check for form submission - if it doesn�t exist then send back to contact form
if (!isset($_POST["save"]) || $_POST["save"] != "contact-form") {
    header("Location: .html#rsvp"); exit;
}

// get the posted data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$attending = $_POST['radio_group'];

// setup the headers
//$to = "rayruok@gmail.com";
$to = "ourwedding@rosslynneandrichard.com";

$headers = array(
    "From: $name <$email>",
    "Reply-To: ourwedding@rosslynneandrichard.com",
    "X-Mailer: PHP/" . PHP_VERSION
    );

$headers = implode("\r\n", $headers);

$subject = "RSVP from $name";

// write the email content
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Attending: $attending\n\n";
$email_content .= "Message: $message";

//echo $to;
//echo $headers;
//echo $email_content;

// send the email
//mail ("ourwedding@rosslynneandrichard.com", "New Contact Message", $email_content);
mail ($to, $subject, $email_content, $headers);

// send the user back to the form
header("Location: index.html#rsvp"); exit;

?>
