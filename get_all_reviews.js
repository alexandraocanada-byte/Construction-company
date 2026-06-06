import fs from "fs";

const url = "https://www.google.com/maps/place/%E6%B4%9B%E5%85%8B%E5%BB%BA%E7%AD%91%E8%A3%85%E4%BF%AE+Lockr+Inc/@43.6551126,-79.3848059,17z/data=!4m7!3m6!1s0x882b34cbec25c4ef:0xf8889e9053c30d76!8m2!3d43.6551126!4d-79.3848059!9m1!1b1?hl=zh-CN";

async function run() {
  try {
    const resp = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'cookie': 'CONSENT=YES+cb.20210328-17-p0.en+FX+385; SOCS=CAESOAgLEitib3NfYWRzXzIwMjMwODE4XzBfUkMyGgVlbGdfU0crBndlYnNpdGU7'
      }
    });
    const html = await resp.text();
    let decoded = html.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
      return String.fromCharCode(parseInt(grp, 16));
    });
    fs.writeFileSync("all_reviews_page.html", decoded);
    console.log("Successfully fetched all reviews page! Length:", decoded.length);

    // Let's analyze strings that contain review-like texts or stars
    // Let's find any sequences of Chinese reviews.
    const chineseReviews = decoded.match(/["']([^"']{15,500}（由 Google 翻译）[^"']+)["']/g) || [];
    console.log(`Google Translation patterns found: ${chineseReviews.length}`);
    for (let idx = 0; idx < Math.min(chineseReviews.length, 10); idx++) {
      console.log(`${idx+1}: ${chineseReviews[idx]}`);
    }

    // Let's search for typical review authors or short texts.
    // Let's find patterns containing 5 stars reviews or reviewer names.
    // Save a clean text extraction:
    const regex = /"([^"]{20,300})"/g;
    const matches = decoded.match(regex) || [];
    console.log(`Found ${matches.length} strings of size 20-300.`);
    const interesting = [];
    for (let m of matches) {
      const clean = m.slice(1, -1).trim();
      if (clean.includes("装修") || clean.includes("洛克") || clean.includes("师傅") || clean.includes("Lockr") || clean.includes("施工") || clean.includes("细心") || clean.includes("设计")) {
        interesting.push(clean);
      }
    }
    console.log(`Lockr-related strings (up to 30):`);
    const uni = Array.from(new Set(interesting));
    console.log(uni.slice(0, 30));
    
  } catch (e) {
    console.error(e);
  }
}

run();
