import fs from "fs";

const url = "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSURSeFpqUkd3EAE!2m1!1s0x0:0xf8889e9053c30d76!3m1!1s2@1:CIHM0ogKEICAgIDRxZjRGw%7C%7C?hl=zh-CN";

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
    fs.writeFileSync("test_bypass.html", html);
    
    // Check if consent is still there
    if (html.includes("Before you continue")) {
      console.log("Still hit consent block.");
    } else {
      console.log("Successfully bypassed consent page. Length:", html.length);
      // Find strings of reviews
      const matches = html.match(/\["([^"\]]{10,250})"/g);
      if (matches) {
        console.log("Some reviews arrays found! Printing first 50 unique:");
        const unique = Array.from(new Set(matches)).map(m => m.slice(2, -1));
        console.log(unique.slice(0, 50));
      }
    }
  } catch (e) {
    console.error(e);
  }
}

run();
