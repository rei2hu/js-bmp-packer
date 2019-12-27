const { join } = require("path");
const { readFile, writeFileSync } = require("fs");
const { promisify } = require("util");
const promReadFile = promisify(readFile);

const packer = require("../src");
Promise.all(
  ["./test_image.bmp", "./test_script.js"].map(file => promReadFile(join(__dirname, file)))
)
  .then(bufs => packer(...bufs))
  .then(console.log);
