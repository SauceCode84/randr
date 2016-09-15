<?php

// check for form submission - if it doesn�t exist then send back to contact form
if (!isset($_POST["save"]) || $_POST["save"] != "contact-form") {
    header("Location: .html#rsvp"); exit;
}

// get the posted data
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$attending = $_POST['radio_group'];

// write the email content
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Message:\n\n$message";
$email_content .= "Attending:\n\n$attending";

// send the email
mail ("contact@ouremail.com", "New Contact Message", $email_content);

// send the user back to the form
header("Location: index.html#rsvp"); exit;

?>
