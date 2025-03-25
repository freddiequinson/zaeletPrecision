<?php
header('Content-Type: application/json');

// Get form data
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$company = isset($_POST['company']) ? strip_tags(trim($_POST['company'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
$country = isset($_POST['country']) ? strip_tags(trim($_POST['country'])) : '';
$city = isset($_POST['city']) ? strip_tags(trim($_POST['city'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';
$experience = isset($_POST['experience']) ? strip_tags(trim($_POST['experience'])) : '';

// Validate form data
if (empty($name) || empty($email) || empty($company) || empty($country)) {
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
$to = "info@zaeletprecision.com";
$subject = "Dealer Application from $name - $company";

$email_content = "New Dealer Application\n\n";
$email_content .= "Name: $name\n";
$email_content .= "Company: $company\n";
$email_content .= "Email: $email\n";
$email_content .= "Phone: $phone\n";
$email_content .= "Country: $country\n";
$email_content .= "City: $city\n";
$email_content .= "Business Experience: $experience\n\n";
$email_content .= "Message:\n$message\n";

// Email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $subject, $email_content, $headers)) {
    http_response_code(200);
    echo json_encode(['message' => 'Thank you for your interest in becoming a Zaelet dealer. Our team will review your application and contact you soon.']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Sorry, there was an error sending your application. Please try again later.']);
}
?>
