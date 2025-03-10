const { checkSyntax } = require("./check_syntax");
const { compareAST } = require("./compare_ast");

const tsFilePath = process.argv[2]; 

if (!tsFilePath) {
    console.error("❌ Error: No TypeScript file provided.");
    console.log("Usage: node validate_translation.js <translated.ts>");
    process.exit(1);
}

function validateCode(filePath) {
    console.log("\n🔍 Validating Code Translation...");

    const syntaxValid = checkSyntax(filePath);
    if (syntaxValid) {
        console.log("✅ TypeScript Syntax is valid.");
    } else {
        console.error("❌ TypeScript Syntax has errors.");
        return;
    }

    const astMatch = compareAST("input.js", filePath);
    if (astMatch) {
        console.log("✅ AST Match: Translation looks correct.");
    } else {
        console.error("❌ AST Mismatch: Possible translation issue.");
    }
}

validateCode(tsFilePath);