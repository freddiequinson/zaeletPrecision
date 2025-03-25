<?php
// Set headers to prevent email injection
header('Content-Type: application/json');

// Get form data
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$product = isset($_POST['product']) ? strip_tags(trim($_POST['product'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Validate form data
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please enter a valid email address.']);
    exit;
}

// Set email parameters
$to = "info@zaeletprecision.com"; // Replace with your actual email
$subject = "Quote Request from $name - Zaelet Precision";

$email_content = "New Quote Request\n\n";
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Product: $product\n\n";
$email_content .= "Message:\n$message\n";

// Email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo json_encode(['message' => 'Thank you for your request. We will get back to you soon.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Sorry, there was an error sending your message. Please try again later.']);
}
?>
