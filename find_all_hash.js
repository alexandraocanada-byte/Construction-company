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
  
  console.log(`File ${file}: hash found at indices:`, indices);
}
