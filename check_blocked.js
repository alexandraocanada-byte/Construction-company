import fs from "fs";

const pages = [
  "test_bypass.html",
  "all_reviews_page.html",
  "review_bypassed_1.html",
  "review_bypassed_2.html",
  "review_bypassed_3.html",
  "review_bypassed_4.html"
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  const content = fs.readFileSync(p, "utf-8");
  console.log(`\n--- Page ${p} ---`);
  console.log("Length:", content.length);
  console.log("Has Captcha/Recaptcha:", content.toLowerCase().includes("recaptcha") || content.toLowerCase().includes("captcha"));
  console.log("Has unusual traffic block:", content.toLowerCase().includes("unusual traffic") || content.toLowerCase().includes("detected potential"));
  console.log("Has our systems detected:", content.toLowerCase().includes("our systems have detected"));
  console.log("Has Title:", content.match(/<title>([^<]+)<\/title>/i)?.[1]);
}
