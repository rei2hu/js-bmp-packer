const { readFile, writeFileSync } = require("fs");
const { promisify } = require("util");
const { BMP_HEAD, BMP_END } = require("./constants");
const promReadFile = promisify(readFile);

module.exports = (imageFile, scriptFile, outFile) =>
  Promise.all([promReadFile(imageFile), promReadFile(scriptFile)]).then(
    ([imageBuf, scriptBuf]) => {
      const bufs = [
        Buffer.from(BMP_HEAD),
        imageBuf.slice(BMP_HEAD.length),
        Buffer.from(BMP_END),
        scriptBuf
      ];
      const length = bufs.reduce((a, b) => a + b.length, 0);
      writeFileSync(outFile, Buffer.concat(bufs, length));
    }
  );
