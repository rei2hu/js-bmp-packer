### js-bmp-packer

Package a bmp image buffer and a buffer representing js code into another bmp image buffer that
can be viewed as an image or run as the js code.

##### Examples:
```js
const fs = require('fs');
const pack = require('js-bmp-packer');

const imageBuffer = fs.readFileSync('./image.bmp');
const jsCode = fs.readFileSync('./code.js');

const resultingImageBuffer = pack(imageBuffer, jsCode);
fs.writeFileSync('./imageButAlsoCode.bmp', resultingImageBuffer);

const imageOrCode = fs.readFileSync('./imageButAlsoCode.bmp', 'utf8');
eval(imageOrCode); // same as running the stuff in code.js
```

```js
const { Buffer } = require('buffer');
const fs = require('fs');
const pack = require('js-bmp-packer');

const imageBuffer = fs.readFileSync('./image.bmp');
const jsCode = Buffer.from('let x = 1; let y = 2; x + y');

const resultingBuffer = pack(imageBuffer, jsCode);
eval(String(resultingBuffer)); // same as running the code the jsCode buffer represents
```
