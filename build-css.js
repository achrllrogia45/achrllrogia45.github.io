#!/usr/bin/env node

const fs = require("fs");
const { exec } = require("child_process");

// Check if tailwindcss binary exists and is executable
const tailwindPath = "./node_modules/.bin/tailwindcss";

fs.access(tailwindPath, fs.constants.F_OK | fs.constants.X_OK, (err) => {
  if (err) {
    console.log("⚠️  TailwindCSS binary permission issue detected");
    console.log(
      "⚠️  Using existing CSS file. For new changes, run: npm run build:css:fallback",
    );
    process.exit(0);
  } else {
    // Run the normal tailwindcss command
    const command =
      "npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css";
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ CSS build failed:", error);
        process.exit(1);
      }
      if (stderr) {
        console.error("⚠️ CSS build warnings:", stderr);
      }
      console.log("✅ CSS built successfully");
      console.log(stdout);
    });
  }
});
