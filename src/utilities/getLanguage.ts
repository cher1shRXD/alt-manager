export const getLanguage = (ext: string) => {
  const map: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    c: "c",
    cpp: "cpp",
    java: "java",
    html: "html",
    css: "css",
    json: "json",
    jsx: "javascript",
    tsx: "typescript"
  };
  return map[ext] || "plaintext";
}