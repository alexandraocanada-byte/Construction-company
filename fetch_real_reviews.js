import fs from "fs";

const cid = "17908832560875703670";
const fid = "9811985390022378735";
const url = `https://www.google.com/maps/preview/review/listentries?authuser=0&hl=en&gl=ca&pb=!1m2!1y${fid}!2y${cid}!2m2!1i0!2i20!3m1!2i1!4m5!3b1!4b1!5b1!6b1!7b1`;

async function run() {
  try {
    const resp = await fetch(url, {
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'accept-language': 'en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
        'cookie': 'CONSENT=YES+cb.20210328-17-p0.en+FX+385; SOCS=CAESOAgLEitib3NfYWRzXzIwMjMwODE4XzBfUkMyGgVlbGdfU0crBndlYnNpdGU7'
      }
    });
    const text = await resp.text();
    // Google prefix protection
    const jsonStr = text.replace(/^\)\]\}'/, "").trim();
    fs.writeFileSync("raw_reviews_response.json", jsonStr);
    console.log("Fetched raw reviews! Length:", jsonStr.length);
    
    // Parse the data or inspect for review structures.
    // The google maps reviews response contains nested arrays.
    // Let's decode unicode escapes and search for strings.
    let decoded = jsonStr.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
      return String.fromCharCode(parseInt(grp, 16));
    });
    fs.writeFileSync("raw_reviews_decoded.json", decoded);

    // Find any review texts and author names from the array.
    // In google's response, a review entry looks like [ [ "author name", ... ], [ "review text", ... ] ]
    // Let's find any text snippets and print them.
    const regex = /"([^"]{15,600})"/g;
    const matches = decoded.match(regex) || [];
    console.log(`Found ${matches.length} strings of length 15-600 in JSON.`);
    
    const candidates = [];
    for (let m of matches) {
      const clean = m.slice(1, -1).trim();
      if (clean.includes("<") || clean.includes("http") || clean.startsWith("/")) continue;
      candidates.push(clean);
    }
    
    console.log("Candidate strings (first 60):");
    const unique = Array.from(new Set(candidates));
    for (let j = 0; j < Math.min(unique.length, 60); j++) {
      console.log(`${j+1}: ${unique[j]}`);
    }
  } catch (e) {
    console.error(e);
  }
}

run();
