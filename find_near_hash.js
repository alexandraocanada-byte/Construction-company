import fs from "fs";

const hashes = [
  "ChZDSUhNMG9nS0VJQ0FnSURSeFpqUkd3EAE",
  "ChZDSUhNMG9nS0VJQ0FnSURSM3FUY0JnEAE",
  "ChZDSUhNMG9nS0VJQ0FnSUM3MzRqQUlBEAE",
  "ChdDSUhNMG9nS0VJQ0FnSUNlc0tLUXhnRRAB"
];

for (let i = 1; i <= 4; i++) {
  const file = `review_bypassed_${i}.html`;
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, "utf-8");
  
  const h = hashes[i-1];
  let pos = content.indexOf(h);
  const indices = [];
  while (pos !== -1) {
    indices.push(pos);
    pos = content.indexOf(h, pos + 1);
  }
  
  console.log(`\n================ FILE ${file} (Hash: ${h}) ================`);
  // Let's print context for positions > 1000 (usually the bootstrapped state in scripts)
  const validIndices = indices.filter(idx => idx > 1000);
  for (const idx of validIndices) {
    console.log(`- Index: ${idx} -`);
    const start = Math.max(0, idx - 400);
    const end = Math.min(content.length, idx + 400);
    const context = content.substring(start, end).trim();
    
    // Look for Chinese characters or interesting words
    // Decode any hex unicode or things
    const chinese = context.match(/[\u4e00-\u9fa5，。？！、\w\d]{6,150}/g) || [];
    console.log(`  Chinese / text matches in context:`);
    const uni = Array.from(new Set(chinese)).filter(c => !c.includes("function") && !c.includes("style"));
    console.log(uni.slice(0, 15));
  }
}
