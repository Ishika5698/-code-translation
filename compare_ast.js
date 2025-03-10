const ts = require("typescript");
const fs = require("fs");

function getAST(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Error: File '${filePath}' not found.`);
        return null;
    }

    try {
        const code = fs.readFileSync(filePath, "utf8");
        return ts.createSourceFile(filePath, code, ts.ScriptTarget.Latest, true);
    } catch (error) {
        console.error("❌ Error reading file:", error);
        return null;
    }
}

function compareAST(jsFilePath, tsFilePath) {
    const jsAST = getAST(jsFilePath);
    const tsAST = getAST(tsFilePath);

    if (!jsAST || !tsAST) return false;

    return JSON.stringify(jsAST.statements) === JSON.stringify(tsAST.statements);
}

module.exports = { compareAST };