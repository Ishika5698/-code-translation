const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const testFolder = path.join(__dirname, "translations");

fs.readdir(testFolder, (err, files) => {
  if (err) {
    console.error("❌ Error reading test folder:", err);
    return;
  }

  const tsFiles = files.filter((file) => file.endsWith(".ts"));

  if (tsFiles.length === 0) {
    console.log("⚠️ No TypeScript files found for testing.");
    return;
  }

  tsFiles.forEach((file) => {
    const filePath = path.join(testFolder, file);
    console.log(`🔍 Validating ${file}...`);

    exec(`node validate_translation.js ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error validating ${file}:\n`, stderr);
        return;
      }
      console.log(stdout);
    });
  });
});