const express = require('express');
const serverless = require('serverless-http');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submitForm', upload.array('images', 5), (req, res) => {
  // Process form data and handle image uploads
  const formData = req.body;
  const images = req.files; // Multer handles file uploads

  // Store form data, images, and other fields as needed

  res.status(200).json({ message: 'Form submitted successfully' });
});

module.exports.handler = serverless(app);
