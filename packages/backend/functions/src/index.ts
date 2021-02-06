import * as fs from "fs";
import * as path from "path";

import * as admin from "firebase-admin";
admin.initializeApp();
interface Functions {
  [key: string]: string;
}

const endpoints = "controllers";
const functions: Functions = {};
const files = fs.readdirSync(path.join(__dirname, endpoints));

for (const file of files) {
  const fileNameArray = file.split(".");
  if (fileNameArray.length > 1) {
    const fileName = fileNameArray[0];
    functions[fileName] = `./${endpoints}/${fileName}`;
  }
}

for (const functionName in functions) {
  if (!process.env.FUNCTION_NAME || process.env.FUNCTION_NAME === functionName) {
    exports[functionName] = require(functions[functionName]);
  }
}
