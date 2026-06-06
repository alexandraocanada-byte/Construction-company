import fs from "fs";

for (let i = 1; i <= 4; i++) {
  const html = fs.readFileSync(`review_${i}.html`, "utf-8");
  console.log(`\n================ REVIEW ${i} ===============`);
  
  // Look for any string that seems to have a lot of letters or characters and spaces, representing comments or descriptions.
  // Google reviews usually have text. Let's find any text matching long Chinese structures or paragraphs.
  // We can also extract sentences of typical user names and star ratings.
  // Let's find patterns like: "[\w\s]{4,30}", 5, [ ... ]
  
  // Let's look for Chinese text of any length > 10 characters
  const chineseMatches = html.match(/[\u4e00-\u9fa5\s，。！、\w\-]{10,200}/g);
  if (chineseMatches) {
    const unique = Array.from(new Set(chineseMatches)).filter(m => m.trim().length > 15);
    console.log(`Chinese/Punctuation snippets (up to 15):`);
    console.log(unique.slice(0, 15));
  }

  // Double check if there are JSON arrays containing author names or review texts.
  const arrayMatches = html.match(/\["([^"\]]{10,120})"/g);
  if (arrayMatches) {
    console.log(`Array strings:`);
    console.log(Array.from(new Set(arrayMatches)).slice(0, 15));
  }
}
