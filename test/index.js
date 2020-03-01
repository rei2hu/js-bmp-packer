const { strictEqual } = require("assert");
const { join } = require("path");
const { readFile } = require("fs");
const { promisify } = require("util");
const promReadFile = promisify(readFile);

const packer = require("../src");

function test(image, script) {
  try {
    const result = eval(String(script));
    const packed = packer(image, script);
    strictEqual(
      eval(String(packed)),
      result,
      `Resulting buffer should evaluate to original script: ${result}`
    );
  } catch (e) {
    throw new Error(
      `Encountered a new error when trying to evaluate scripts: ${e}`
    );
  }
}

Promise.all(
  [
    ["./test_image.bmp", "./test_script.js"],
    ["./comment_breaking.bmp", "./test_script.js"]
  ].map(files =>
    Promise.all(files.map(file => promReadFile(join(__dirname, file)))).then(
      buffs => {
        try {
          test(...buffs);
        } catch (e) {
          return {
            file: files[0],
            script: files[1],
            error: e
          };
        }
      }
    )
  )
).then(failures => {
  const failMessage = failures
    .filter(e => e !== undefined)
    .map(({ file, script, error }) => `${file} | ${script} | ${error}`)
    .join("\n");
  if (failMessage) console.log(failMessage);
  else console.log("All tests succeeded");
});
