const { join } = require("path");

const packer = require("../src");
packer(
  ...["./test_image.bmp", "./test_script.js"].map(file => join(__dirname, file))
).then(console.log);
