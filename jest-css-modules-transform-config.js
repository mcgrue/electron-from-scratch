const path = require('path');
const additionalResolvePath = path.resolve(
  __dirname,
  'src',
  'additional_modules',
);

// const fs = require('fs');

// // Specify the path and file name for the new file
// const filePath = './FUCKING_FUCK';

// // Use the writeFile() method to create the file
// fs.writeFile(filePath, '', function (err) {
//   if (err) throw err;
//   console.log('File created!');
// });

console.log('I am jest-css-modules-transform-config.js...');

module.exports = {
  sassConfig: {
    includePaths: [additionalResolvePath],
    precision: 5,
  },
  lessConfig: {
    paths: [additionalResolvePath],
  },
  stylusConfig: {
    paths: [additionalResolvePath],
  },
  postcssConfig: {
    plugins: [
      // require('autoprefixer')({
      //   browsers: ['Chrome 68', 'Firefox 62', 'Safari 12'],
      // }),
    ],
  },
};
