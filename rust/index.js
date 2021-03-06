const fs   = require("fs");
const path = require("path");

const compiled = new WebAssembly.Module(
  fs.readFileSync(path.resolve(__dirname, "..", "build", "rust.wasm"))
);

const imports = {
  env: {
    memory: new WebAssembly.Memory({ initial: 17 }),
    abort: (filename, line, column) => {
      throw Error("abort called at " + line + ":" + colum);
    }
  }
};

Object.defineProperty(module, "exports", {
  get: () => new WebAssembly.Instance(compiled, imports).exports
});
