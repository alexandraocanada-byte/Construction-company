import fs from "fs";

for (let i = 1; i <= 4; i++) {
  const html = fs.readFileSync(`review_${i}.html`, "utf-8");
  console.log(`--- ANALYSIS OF REVIEW ${i} ---`);
  
  // Look for initial data strings
  const initialDataMatch = html.match(/window\.APP_INITIALIZATION_STATE\s*=\s*([^;]+)/);
  if (initialDataMatch) {
    console.log(`Found window.APP_INITIALIZATION_STATE, length: ${initialDataMatch[1].length}`);
  }
  
  // Find Chinese characters (to see if they appear anywhere)
  const chineseMatch = html.match(/[\u4e00-\u9fa5]{3,50}/g);
  if (chineseMatch) {
    console.log(`Chinese text matches (first 10):`, chineseMatch.slice(0, 10));
  } else {
    console.log("No Chinese text found in HTML.");
  }
  
  // Let's search for typical review ratings or user names if any.
  // Reviews pages often have text like "★★★★★" or "5/5" or similar.
  const starMatch = html.match(/[★]{1,5}/);
  if (starMatch) console.log("Found star symbol!");

  // Let's do a general search for any quoted text that has several words
  const quotedMatch = html.match(/"([^"\\]{15,200})"/g);
  if (quotedMatch) {
    console.log(`Quoted text snippets (first 10 of length > 20):`);
    const longQuotes = quotedMatch.map(q => q.replace(/"/g, "")).filter(q => q.trim().length > 20);
    console.log(longQuotes.slice(0, 10));
  }
}
