const { exec } = require("child_process");

function translateCode(code) {
    const prompt = `Translate this JavaScript code to TypeScript:\n${code}`;
    
    // Update the path to match your GPT4All installation
    const command = `echo "${prompt}" | /Applications/GPT4All.app/Contents/MacOS/gpt4all`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Translation:\n${stdout}`);
    });
}

// Example JavaScript code to translate
const jsCode = "function add(a, b) { return a + b; }";
translateCode(jsCode);