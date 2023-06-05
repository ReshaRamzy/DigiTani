const express = require('express');
const Multer = require('multer');
const { Storage } = require('@google-cloud/storage');

// Create an Express app

const router = express.Router();

// Create a Multer instance to handle file uploads
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Check if the file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed.'));
    }
  },
});

// Create a Google Cloud Storage client
const storage = new Storage({ projectId: 'digitani-388214', keyFilename: 'key.json' }); // Replace with your project ID and key file path

// Define the API endpoint for image uploads
router.post('/upload', multer.single('image'), async (req, res) => {
  // Code for image upload (same as before)
  try {
    const bucketName = 'digitani'; // Replace with your bucket name
    const image = req.file;

    if (!image) {
      return res.status(400).send('No image uploaded.');
    }

    // Create a new filename for the uploaded image
    const fileName = `${Date.now()}-${image.originalname}`;

    // Upload the image to Google Cloud Storage
    const bucket = storage.bucket(bucketName);
    const gcsFile = bucket.file(fileName);

    const stream = gcsFile.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.error('Error uploading to Google Cloud Storage:', err);
      res.status(500).send('Internal Server Error');
    });

    stream.on('finish', () => {
      console.log('Image uploaded successfully.');

      // Generate a signed URL for the uploaded image
      const options = {
        action: 'read',
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      };

      gcsFile.getSignedUrl(options, (err, url) => {
        if (err) {
          console.error('Error generating signed URL:', err);
          res.status(500).send('Internal Server Error');
        }

        // Send the signed URL back to the client
        res.send(url);
      });
    });

    stream.end(image.buffer);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Define the API endpoint for deleting an image
router.delete('/delete/:filename', async (req, res) => {
  try {
    const bucketName = 'digitani'; // Replace with your bucket name
    const filename = req.params.filename;

    // Delete the image from Google Cloud Storage
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filename);

    const exists = await file.exists();

    if (exists[0]) {
      await file.delete();

      console.log(`Image '${filename}' deleted successfully.`);
      res.send(`Image '${filename}' deleted successfully.`);
    } else {
      console.error(`Image '${filename}' not found.`);
      res.status(404).send(`Image '${filename}' not found.`);
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Define the API endpoint for retrieving an image
router.get('/image/:filename', async (req, res) => {
  try {
    const bucketName = 'digitani'; // Replace with your bucket name
    const filename = req.params.filename;

    // Get the image from Google Cloud Storage
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filename);

    const stream = file.createReadStream();

    stream.on('error', (err) => {
      console.error('Error reading image:', err);
      res.status(500).send('Internal Server Error');
    });

    stream.pipe(res);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });

module.exports = router;