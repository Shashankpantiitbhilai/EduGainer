// googleDriveUtils.js
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const stream = require('stream'); // Import the 'stream' module

function createAuthClient(credentials) {
  const { client_id, client_secret, redirect_uris = [''], refresh_token } = credentials;
  const authClient = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
  authClient.setCredentials({ refresh_token });
  return authClient;
}

// Convert buffer to a readable stream using 'Readable.from' from 'stream'
function bufferToStream(buffer) {
  return stream.Readable.from(buffer);
}

async function uploadToGoogleDrive(file, folderId, credentials) {
  const authClient = createAuthClient(credentials);

  try {
    const drive = google.drive({
      version: 'v3',
      auth: authClient,
    });

    const fileMetadata = {
      name: file.originalname,
      parents: [folderId],
    };

    const media = {
      mimeType: file.mimetype,
      body: bufferToStream(file.buffer), // Convert buffer to a readable stream
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webContentLink',
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = uploadToGoogleDrive;
