const fs = require('fs');
const path = require('path');


// Function to process a file
const processFile = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Process file data
    console.log(data);
  });
};

// Function to read files in a directory
const readDirectory = (directoryPath) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Process each file asynchronously
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      processFile(filePath);
    });
  });
};

// Example usage
const directoryPath = path.join(__dirname, 'files');
readDirectory(directoryPath);