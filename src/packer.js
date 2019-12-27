const { BMP_HEAD, BMP_END } = require("./constants");

module.exports = (imageBuf, scriptBuf) => {
  const bufs = [
    Buffer.from(BMP_HEAD),
    imageBuf.slice(BMP_HEAD.length),
    Buffer.from(BMP_END),
    scriptBuf
  ];
  const length = bufs.reduce((a, b) => a + b.length, 0);
  return Buffer.concat(bufs, length);
};
