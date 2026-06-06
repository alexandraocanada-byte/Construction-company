import fs from "fs";

const html = fs.readFileSync("test_bypass.html", "utf-8");

// Try to find any quoted unicode characters or strings
// Let's decode unicode escapes like \u4e2d\u6587 to actual Chinese characters first
let decoded = html.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
  return String.fromCharCode(parseInt(grp, 16));
});

// Write decoded HTML to another file for easier viewing/searching
fs.writeFileSync("test_bypass_decoded.html", decoded);

// Find any double-quoted string with a length between 15 and 400 that has letters or Chinese characters
const matches = decoded.match(/"([^"]{15,500})"/g) || [];
console.log(`Found ${matches.length} matches of length 15-500.`);

// Filter for matches that contain standard letters, spaces, or Chinese characters, and print them
const reviewsContent = [];
for (const m of matches) {
  const clean = m.slice(1, -1).trim();
  if (clean.length < 15 || clean.startsWith("http") || clean.startsWith("//") || clean.startsWith("/maps")) {
    continue;
  }
  // If it's HTML or javascript code, skip
  if (clean.includes("<") || clean.includes("function") || clean.includes("var ") || clean.includes("void")) {
    continue;
  }
  reviewsContent.push(clean);
}

const unique = Array.from(new Set(reviewsContent));
console.log("Unique text fragments (first 60):");
for (let j = 0; j < Math.min(unique.length, 60); j++) {
  console.log(`${j+1}: ${unique[j]}`);
}
