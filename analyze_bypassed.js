import fs from "fs";

for (let i = 1; i <= 4; i++) {
  const file = `review_bypassed_${i}.html`;
  const content = fs.readFileSync(file, "utf-8");
  console.log(`\n================ FILE ${file} ================`);
  
  // Find any googleusercontent.com URLs which represent user profile pictures or images
  const avatars = content.match(/https:\/\/lh\d+\.googleusercontent\.com\/[^\s"',]+/g);
  if (avatars) {
    console.log(`Avatars found: ${avatars.length} (first 3):`);
    console.log(Array.from(new Set(avatars)).slice(0, 3));
  } else {
    console.log(`No avatars found.`);
  }

  // Google Maps initial data often has strings like: [null, "Author Name", "https://lh3.googleusercontent.com...", ...]
  // Let's find patterns near googleusercontent links
  // Let's extract any Chinese characters sequence of length > 10
  const chinese = content.match(/[\u4e00-\u9fa5，。？！、\w\d]{10,500}/g);
  if (chinese) {
    const unique = Array.from(new Set(chinese)).filter(c => {
      // Filter out standard code/css blocks
      if (c.includes("function") || c.includes("css") || c.length < 15) return false;
      return true;
    });
    console.log(`Chinese snippet matches (up to 30):`);
    console.log(unique.slice(0, 30));
  }
}
