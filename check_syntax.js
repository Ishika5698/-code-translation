const ts = require("typescript");
const fs = require("fs");

function checkSyntax(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: File '${filePath}' not found.`);
        return false;
    }

    try {
        const code = fs.readFileSync(filePath, "utf8");
        const result = ts.transpileModule(code, {
            compilerOptions: { module: ts.ModuleKind.CommonJS }
        });

        return !result.diagnostics || result.diagnostics.length === 0;
    } catch (error) {
        console.error("❌ Error reading file:", error);
        return false;
    }
}

module.exports = { checkSyntax };