import time
from llama_cpp import Llama
import os

# ✅ Load the optimized model
MODEL_PATH = os.path.expanduser("~/Desktop/code-translation/models/mistral-7b-instruct-v0.1.Q4_K_M.gguf")

llm = Llama(
    model_path=MODEL_PATH,
    chat_format="mistral-instruct",
    temperature=0,  # Forces deterministic output
    top_p=0.9,  # Prioritize higher-probability tokens
    verbose=False,  # Disable unnecessary logging
    n_ctx=256,  # Lower context size for speed
    seed=42,
)

def translate_js_to_ts(js_code):
    """Converts JavaScript to TypeScript using an optimized Llama model."""
    chat_prompt = [
        {"role": "system", "content": "Convert JavaScript to TypeScript. Return only valid TypeScript code."},
        {"role": "user", "content": f"Convert this JavaScript code to TypeScript:\n\n```js\n{js_code}\n```"}
    ]

    start_time = time.time()

    output = llm.create_chat_completion(
        messages=chat_prompt, 
        max_tokens=100,  # Avoid unnecessary long outputs
        stop=["```", "\n\n"]  # Stop generation early
    )
    ts_code = output["choices"][0]["message"]["content"].strip()

    latency = time.time() - start_time
    print(f"✅ Translation latency: {latency:.2f} seconds.")
    print("✅ Translated TypeScript Code:\n", ts_code)

    return ts_code, latency

# ✅ Example JavaScript code
js_example = """
function add(a, b) {
    return a + b;
}
"""

# ✅ Run the optimized translation
ts_output, latency = translate_js_to_ts(js_example)

# ✅ Print the final output
print("✅ Final Translated TypeScript Code:\n", ts_output)