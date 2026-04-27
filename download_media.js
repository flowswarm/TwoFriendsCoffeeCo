import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const mediaDir = './public/images';
if (!fs.existsSync(mediaDir)) fs.mkdirSync(mediaDir, { recursive: true });

const downloads = [
  // Two Friends Coffee Co owned posts - curated for website
  { url: 'https://scontent-mia5-1.cdninstagram.com/v/t51.82787-15/658949165_17942324382160204_4344638403628054883_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-mia5-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gHJOlhA9vBc8MHmVrHnZFmegmPEZE5JAvo-EEkCHLHhvU3hXWwAisqWy-pDcr4dLsY&_nc_ohc=ctSPuSj6v6IQ7kNvwFVgDRf&_nc_gid=rP4YujsydeQ-pdUDIoifqQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af18my4pbqngDP9rsll1Gose8miQ1AbmD3qBdgKxIxsRLw&oe=69F32CCA&_nc_sid=10d13b', name: 'holy-cross-event.jpg' },
  { url: 'https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/655461402_17940849849160204_7198043110608976428_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gE03DxSR-Xljla_jK0MF2ftaxMrvyXN85pIXRzHnfq2tQqleC7tZ-4o62mLYEI4dQE&_nc_ohc=Gi_S3nSqK9QQ7kNvwGhAOXW&_nc_gid=Lp85mYNNovDJXLTa_df3Gw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1bi2n566YuZcUpug0pefohzT5752jmodvJYeJxEtXVlQ&oe=69F31C49&_nc_sid=10d13b', name: 'fundraiser-event.jpg' },
  { url: 'https://scontent-dfw5-2.cdninstagram.com/v/t51.82787-15/671710257_17944875288160204_8716520623238117258_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-dfw5-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gHARJoIjkyVOKNYjd86f5BkVpyjrfDl54NnUQYSKQZGxp9WkmFltwVxwslDXVdvleQ&_nc_ohc=ECiceWOaWOUQ7kNvwHWNqVk&_nc_gid=i3pzXiePVE07i16aHkOG9w&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2x8QdKBVif9LY0Tuu2S4LyoYWLDIFEafZK97LxzyVyaQ&oe=69F340B0&_nc_sid=10d13b', name: 'busiest-day.jpg' },
  { url: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/658787499_17941941291160204_8836924380392748762_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gFAIzh7vCdccYvs7m3UHjGOZaf5hIS9HabuCTwGj0CLlygPcmKykrWTvb8c96r4AvA&_nc_ohc=Vp7Ylx_prvMQ7kNvwF2yYG1&_nc_gid=YnKgVTWF89OEQ68DKnqJJA&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2V8IZav0ASdoi03JAwHbYTRyLykV4eXhYdfY4T1MVXBA&oe=69F33BFA&_nc_sid=10d13b', name: 'spring-menu.jpg' },
  { url: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/658964661_17941941282160204_148542954161377418_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gFAIzh7vCdccYvs7m3UHjGOZaf5hIS9HabuCTwGj0CLlygPcmKykrWTvb8c96r4AvA&_nc_ohc=8EQMPZLf8kMQ7kNvwFeeQQE&_nc_gid=YnKgVTWF89OEQ68DKnqJJA&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af3ioQ6bKpNnhjeYUv__rjrBcIqfH2AECcKT9TRSlWOaeQ&oe=69F348E2&_nc_sid=10d13b', name: 'spring-menu-2.jpg' },
  { url: 'https://scontent-ord5-2.cdninstagram.com/v/t51.82787-15/655986403_17942096574160204_3293571580048834632_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gG5KW10nzcLk9uYV4NKCYR2GwDtSk1zm_qD_JnkKx2C2kmJe-0GaFBW0nCGE4hoAtE&_nc_ohc=S7Tb-wWxDvkQ7kNvwG0Qfqy&_nc_gid=rJlnu8GmNgShsBjgbPGpqQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af3GaG146PaRyJdDheSUnFYie6n2y2sq2CX7ZbqUJpWMyw&oe=69F335EA&_nc_sid=10d13b', name: 'april-schedule.jpg' },
  { url: 'https://scontent-atl3-2.cdninstagram.com/v/t51.82787-15/649217930_17938507266160204_5103186071157367660_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gEPwasaul2pjguOQ-QHGkXszX-k_uvaw1_f6FCsbsp0uazkabSaLrZcxgcMte0kFMQ&_nc_ohc=WDZyCAYxyJIQ7kNvwEtEVc0&_nc_gid=DT0tQbnQir1FDEbX52NCaw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2uJSKjVimVfCyv0ZrJubqxs2AzBkq11JilFRqDrhofpA&oe=69F336A0&_nc_sid=10d13b', name: 'pot-of-gold.jpg' },
  { url: 'https://scontent-lax3-1.cdninstagram.com/v/t51.82787-15/655450354_17940661455160204_8586498923378204220_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gECngcfIzUyQNMMUjaOb3oErxSeiAYanEHcXqgxxYjyA0bv05I_EEdirCYkpwMiqqc&_nc_ohc=JXjRyyQqlzMQ7kNvwFHYOv3&_nc_gid=Ai5WH1v1WrgHIzUAnA_EAw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1-1HUjF2LTMMnP3xlURRF27lMtM_NryLhDPaY4uvv5_w&oe=69F333E2&_nc_sid=10d13b', name: 'golden-poppy.jpg' },
  { url: 'https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/628631437_17935709532160204_8192909025191454768_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gFz18Y8E72HoZkL6aEJlgq6JKDL8zlbzgTIH9Tpn6xx3kJVqeMsyyWw1QSCCFxv0fY&_nc_ohc=wODLJ7Em1wQQ7kNvwFw9xMm&_nc_gid=5OANH0KzZSl6zElIH_SZ6g&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af3Q7ix01QLw8eUKNhjF_Ns8oU7mwqYs24WbX-fUnT3Q8w&oe=69F32757&_nc_sid=10d13b', name: 'valentines-day.jpg' },
  { url: 'https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/626510023_17934320208160204_597625311190326274_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGJJFlb50vMPXul-d6_nGpJJjoRa1fxqMpLPlGOXgO8F5n4jz6IlY1yjQv8KFoRxnQ&_nc_ohc=iF_0K3snOT0Q7kNvwE0Yd7u&_nc_gid=6jisOL_9fjty63ziy9JnHg&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af0c6sNU04pjuROfF_tXfHz5rlzPMVQXH4u881ifZK79FA&oe=69F32505&_nc_sid=10d13b', name: 'best-of-delaware.jpg' },
  { url: 'https://scontent-ord5-2.cdninstagram.com/v/t51.82787-15/619906474_17933013759160204_4957167583918715779_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gH_rgCwRkUTB6CwYxhdJMh64kKyqjrIWKQm1h8-2_Os1XeGK6Qb3NYJaePoLz9e1yg&_nc_ohc=4HSYtCn1ieoQ7kNvwHt4NLp&_nc_gid=f0oOl--ag_XeW_MCZjCRlA&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1sn7_ni2DfbNsQwQfclhotKcu_XxYeDi1zB46yGxEnKw&oe=69F31ECF&_nc_sid=10d13b', name: 'valentines-menu.jpg' },
  { url: 'https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/625987309_17934215403160204_6830079113115266088_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gFSBKUvxEOuGDfwm2Far6G8cn7KEl_aI3S-D7I7FCHc6OpWQVJchifQPt9ggD4xZiU&_nc_ohc=TJD6aLKOf-kQ7kNvwEndbCc&_nc_gid=X6iIKGPl95BCSiG9FNVJtw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af28ZiMEATh5yqCAFBznrOF-PeZLjEwRlv7sIOVYzgIf9w&oe=69F33511&_nc_sid=10d13b', name: 'brownie-batter-latte.jpg' },
  { url: 'https://scontent-xxc1-1.cdninstagram.com/v/t51.82787-15/625884706_17934105927160204_2783123058680544344_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-xxc1-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGnPCcHGJlsBaigEJPVpAoRnBCh17i2WGe8pGPyq1RX27JCaKm5vhMBZEoUnh8WAVA&_nc_ohc=5SuKySuxxTQQ7kNvwH12I7O&_nc_gid=bkikq3A-p8rHlo6jl9sauw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af15WA3ReV1QAI1kFvK5dNyeKWUTtEv5BGhbbksxh5BNXg&oe=69F320EE&_nc_sid=10d13b', name: '1000-followers.jpg' },
  { url: 'https://scontent-xxc1-1.cdninstagram.com/v/t51.82787-15/624544028_17934105957160204_4561981616905870239_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-xxc1-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGnPCcHGJlsBaigEJPVpAoRnBCh17i2WGe8pGPyq1RX27JCaKm5vhMBZEoUnh8WAVA&_nc_ohc=G3chRsOFPhYQ7kNvwHGtEZd&_nc_gid=bkikq3A-p8rHlo6jl9sauw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1L_diYKNpfycGhI2ajSkeGWNz_xIw1u3Pdzo5qwPEg5Q&oe=69F3251F&_nc_sid=10d13b', name: '1000-followers-2.jpg' },
  { url: 'https://scontent-xxc1-1.cdninstagram.com/v/t51.82787-15/624615538_17934105939160204_5887884122133932623_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-xxc1-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGnPCcHGJlsBaigEJPVpAoRnBCh17i2WGe8pGPyq1RX27JCaKm5vhMBZEoUnh8WAVA&_nc_ohc=232ZPXb6UrkQ7kNvwFXWt2j&_nc_gid=bkikq3A-p8rHlo6jl9sauw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2t9XsZ3CnHKsZUoHhU1Z2fdz9VoxEHPVb_bqsQFzJHyg&oe=69F33A33&_nc_sid=10d13b', name: '1000-followers-3.jpg' },
  // Community event posts
  { url: 'https://scontent-atl3-2.cdninstagram.com/v/t51.82787-15/671139458_18601532563033405_2747204841496497143_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gENTmhABp5B_OO0PPexaAIa6GzijLkKAzHms9bLa6ikkek1Ut1W54KNIGG776T1L3s&_nc_ohc=_nvpWIf8OToQ7kNvwFPHW37&_nc_gid=0v6WfFWozXIBewzwQATmwA&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af36sbScrkbnhNWSZnRjh0Cn2ULV-hUO1W9nHzj1a-M8QA&oe=69F3113C&_nc_sid=10d13b', name: 'blood-bank-event.jpg' },
  { url: 'https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/654288054_18592481368033405_1633048227966780744_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gEC-v_QQGEAPZcUFibSAPdVNaX28Cqhn9I_UUfW3MzQI6xSQ2fHGIkNX9pHfZ8z-tKIsArmSwXbR8urcOLXP-E3&_nc_ohc=EMHyNu7geCwQ7kNvwFi4QrP&_nc_gid=1L-Dydlksc8wEvTg08y0BA&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2MScANUD9_Q0M_0_68dQvv6dugw0qa4FQgEBNJWX3B7Q&oe=69F31289&_nc_sid=10d13b', name: 'blood-bank-2.jpg' },
  { url: 'https://scontent-iad3-1.cdninstagram.com/v/t51.82787-15/625993698_17934230511160204_1397184225451620603_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-iad3-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gFxdBle88gLt_HwHhQAV_URfSoe6Tdw49kS2MyFLjHgxMRDz15ne4f5EsHUlxdpxEA&_nc_ohc=-Fij4p6V5WIQ7kNvwEld7Sc&_nc_gid=HSsYbIJOZ0PAM_RMJLNxHQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af0VanU7SxMNTLaiinoyWf5mtCVXTZSOCxqjx3GWEDMmbg&oe=69F3476A&_nc_sid=10d13b', name: 'nest-play-cafe.jpg' },
  { url: 'https://scontent-phl2-1.cdninstagram.com/v/t51.82787-15/638304984_17937090972160204_6922596438729673561_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-phl2-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGo0am5a2WpTbMlmh8efcEvKk44j6s7qsWLNtWuxHjeGs3bmXIKIAP0qHkAKptjxQ0&_nc_ohc=GRKDvw43Hm8Q7kNvwFQj6Zy&_nc_gid=nQPkFOcS7yZyTdoWKQYXjA&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af34OKZR-Hs5RfvMa5hBE1Cl0wkTzhEalNUrLQyIu3xWJw&oe=69F33012&_nc_sid=10d13b', name: 'do-more-24.jpg' },
  // Partner features
  { url: 'https://scontent-ord5-1.cdninstagram.com/v/t51.82787-15/626426719_17864155539573488_8496889741401593312_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-ord5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gEFMwB0r8nvFP1D0v79q5NsO5tAVsvyJQAvwPWgxX8g-u8K7dDSNC7_gDUPoEQsQxM&_nc_ohc=Nqz8WDqAyXoQ7kNvwFNQeHb&_nc_gid=fu1Wcghb-dVV_LflMMxeEw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2Ge3Qwhn7kn4ViYfZo8CeIkWBD2nr-PqqH6fXEAwfnRw&oe=69F3206B&_nc_sid=10d13b', name: 'galentines-tremble.jpg' },
  { url: 'https://scontent-det1-1.cdninstagram.com/v/t51.82787-15/634237114_18117176818719787_2085802051317275627_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-det1-1.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2gH6VNZsivHRgcVHB1vm5JrjRN-Omi7yXtpuFwKU2iBLELf-wiZkDh25Ed8mJzPQA_g&_nc_ohc=LgxKBvOaQBoQ7kNvwGKWOix&_nc_gid=76vZp6vjR5iEEQxn3UTWdQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af18JepSxVhAuTYVp9rzU3g3WmyusvAzDLuI9d806LvOxA&oe=69F3298E&_nc_sid=10d13b', name: 'pretty-in-pink.jpg' },
];

async function downloadFile(url, filename) {
  const filePath = path.join(mediaDir, filename);
  if (fs.existsSync(filePath)) {
    console.log(`SKIP: ${filename} already exists`);
    return;
  }
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadFile(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        console.log(`FAIL: ${filename} - HTTP ${response.statusCode}`);
        resolve();
        return;
      }
      const file = fs.createWriteStream(filePath);
      response.pipe(file);
      file.on('finish', () => { file.close(); console.log(`OK: ${filename}`); resolve(); });
    });
    request.on('error', (e) => { console.log(`ERR: ${filename} - ${e.message}`); resolve(); });
    request.setTimeout(15000, () => { request.destroy(); console.log(`TIMEOUT: ${filename}`); resolve(); });
  });
}

(async () => {
  console.log(`Downloading ${downloads.length} images...`);
  for (const d of downloads) {
    await downloadFile(d.url, d.name);
  }
  console.log('Done!');
})();
