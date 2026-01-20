#!/usr/bin/env node

// import fs from "fs"
const fs = require("fs");
// import path from "path";
const path = require("path");
// import crypto from "crypto";
const crypto = require("crypto");
// import readline from "readline";
const readline = require("readline");

const ACCOUNTS_PATH = path.join(__dirname, "web", "accounts.cjs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

(async () => {
  try {
    const name = await ask("Username: ");
    const password = await ask("Password: ");

    let accounts = require(ACCOUNTS_PATH);

    const user = accounts.find(a => a.name === name);
    if (!user) {
      console.error("❌ Username not found.");
      process.exit(1);
    }

    if (user.passwordHash) {
      console.error("❌ User already registered.");
      process.exit(1);
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(
      password,
      salt,
      100000,
      64,
      "sha512"
    ).toString("hex");

    user.salt = salt;
    user.passwordHash = hash;
    user.iterations = 100000;
    user.algorithm = "pbkdf2-sha512";

    const fileContent =
`let accounts = ${JSON.stringify(accounts, null, 2)};

module.exports = accounts;
`;

    fs.writeFileSync(ACCOUNTS_PATH, fileContent);

    console.log("✅ User registered successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    rl.close();
  }
})();
