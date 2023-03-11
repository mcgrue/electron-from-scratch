// This file will execute at the beginning of EVERY tested file...
//console.log('test-infrastructure/globalInclude.js is executing...');

const TextEncoder = require('util').TextEncoder;
const TextDecoder = require('util').TextDecoder;

// global.customLog = function (message) {
//   console.log(`[CUSTOM LOG] ${message}`);
// };

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

//console.log('...test-infrastructure/globalInclude.js is done.');
