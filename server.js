const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service you prefer
  auth: {
    user: 'agrawalprachi7718@gmail.com', // your email
    pass: 'prachi9893189640',  // your email password or app-specific password
  },
});

app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'agrawalprachi7718@gmail.com', // your email where you want to receive the messages
    subject: `Message from ${name}`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log the error for debugging
      return res.status(500).send('Something went wrong'); // Send this to the client
    }
    console.log('Email sent:', info.response); // Log the successful email sending
    res.status(200).send('Message sent successfully');
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
