/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 
 promisification.js:::::::
 getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
  
  promiseConstructor.js ==========
   getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
 

 */

var fs = require('fs');
var Promise = require('bluebird');
var promised = require('./promisification.js');
var morePromised = require('./promiseConstructor.js');
var writeFileAsync = Promise.promisify(fs.writeFile);

// var getStatusCodeAsync = function(url) {
//   return new Promise((resolve, reject) => {
//     request(url, (err, response) => {
//       if (err) { 
//         reject(err);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// };

// var readFileAndMakeItFunny = function(filePath, callback) {
//   fs.readFile(filePath, 'utf8', function(err, file) {
//     if (err) { return callback(err); }
//     callback(err, JSON.stringify(file));
//   });
// };

// var readFileAndMakeItFunnyAsync = Promise.promisify(readFileAndMakeItFunny);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // I promise this might work.
  //console.log('this is a thing');
  
  return morePromised.pluckFirstLineFromFileAsync(readFilePath)
    .then((result) => {
      return promised.getGitHubProfileAsync(result);
    })
    .then((result) => {
      return writeFileAsync(writeFilePath, JSON.stringify(result));
    });
  
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
