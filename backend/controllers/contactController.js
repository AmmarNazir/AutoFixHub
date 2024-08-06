// controllers/contactController.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const contactController = {
  sendContactMessage: async (req, res) => {
    const { name, email, message } = req.body;

    // Save the contact message to the database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email to the admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: 'New Contact Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
    }
  },
};

module.exports = contactController;
