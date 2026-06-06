import fs from "fs";

const longUrls = [
  "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSURSeFpqUkd3EAE!2m1!1s0x0:0xf8889e9053c30d76!3m1!1s2@1:CIHM0ogKEICAgIDRxZjRGw%7C%7C?hl=zh-CN",
  "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSURSM3FUY0JnEAE!2m1!1s0x0:0xf8889e9053c30d76!3m1!1s2@1:CIHM0ogKEICAgIDR3qTcBg%7C%7C?hl=zh-CN",
  "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSUM3MzRqQUlBEAE!2m1!1s0x0:0xf8889e9053c30d76!3m1!1s2@1:CIHM0ogKEICAgIC734jAIA%7C%7C?hl=zh-CN",
  "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSUNlc0tLUXhnRRAB!2m1!1s0x0:0xf8889e9053c30d76!3m1!1s2@1:CIHM0ogKEICAgICesKKQxgE%7C%7C?hl=zh-CN"
];

async function run() {
  for (let i = 0; i < longUrls.length; i++) {
    const url = longUrls[i];
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
      fs.writeFileSync(`review_bypassed_${i+1}.html`, decoded);
      console.log(`Saved review ${i+1}`);
    } catch (e) {
      console.error(e);
    }
  }
}

run();
