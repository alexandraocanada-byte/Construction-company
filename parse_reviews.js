import fs from "fs";

for (let i = 1; i <= 4; i++) {
  const html = fs.readFileSync(`review_${i}.html`, "utf-8");
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/i);
  const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/i);
  
  console.log(`--- REVIEW ${i} ---`);
  console.log(`Title tag:`, titleMatch ? titleMatch[1] : "None");
  console.log(`og:title:`, ogTitle ? ogTitle[1] : "None");
  console.log(`og:description:`, ogDesc ? ogDesc[1] : "None");
}
