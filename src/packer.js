const { BMP_HEAD, BMP_END } = require("./constants");

module.exports = (imageBuf, scriptBuf) => {
  const iBufCopy = Buffer.from(imageBuf);
  const cl = BMP_END.slice(0, 2);
  const bcl = Buffer.from(cl);

  let pos = -1;
  while ((pos = iBufCopy.indexOf(bcl)) !== -1) {
    iBufCopy.writeInt16LE(0, pos);
  }

  const bufs = [
    Buffer.from(BMP_HEAD),
    iBufCopy.slice(BMP_HEAD.length),
    Buffer.from(BMP_END),
    scriptBuf
  ];

  const length = bufs.reduce((a, b) => a + b.length, 0);
  return Buffer.concat(bufs, length);
};
