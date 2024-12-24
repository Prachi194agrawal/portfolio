const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password', // Your email password or app password
  },
});

app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'agrawalprachi7718@gmail.com', // Your email
    subject: `New Contact Form Submission from ${name}`,
    text: `Message: ${message}\nFrom: ${name} (${email})`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send message.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
