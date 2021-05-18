const replace = require('replace-in-file');
const fs = require('fs');
const glob = require('glob');

async function replacePaths() {
  const options = {
    files: ['build/**/*.html', 'build/scripts/main.js'],
    from: [/scripts/g, /css\//g, /patternlib-img/g, /"\/img\//g],
    to: ['build/scripts', 'build/css/', 'build/patternlib-img', '"/build/img/'],
  };

  try {
    await replace(options);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

function generateURLs() {
  const directories = [
    {
      name: 'components',
      path: 'build/components',
    },
  ];

  let urls = [];
  return new Promise((resolve, reject) => {
    for (const directory of directories) {
      fs.readdir(directory.path, async (err, folders) => {
        if (err) {
          console.log('Unable to scan directory: ' + err);
          reject(err);
        }
        for (const folder of folders) {
          glob(`${directory.path}/${folder}/**/*.html`, { ignore: `${directory.path}/${folder}/index.html` }, function(er, files) {
            if (er) {
              console.log('Problem getting files paths: ' + er);
            }
            for (const file of files) {
              urls.push(file);
              resolve(urls);
            }
          });
        }
      });
    }
  });
}

exports.generateURLs = generateURLs;
