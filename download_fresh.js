import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const imgDir = './public/images';

const downloads = [
  // Founders on podcast (Life on the Ave) — great founder shot
  { name: 'founders-podcast.jpg', url: 'https://scontent-mia5-2.cdninstagram.com/v/t51.82787-15/658727547_17994922715927508_1026668956380221263_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-mia5-2.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2gErqpIjk1_ye08P6djImpOMRQrN5IMWa8GZpOxRJ8TPexhD_-A9Lwjg6tAP3YAEjNc&_nc_ohc=Em1kIYjgfo0Q7kNvwGRriWG&_nc_gid=PDuhOQUBjdvFGBKhLJL7IQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2wBwUR1nFBSmfCTaKzUnkc_CLh5_9uz8H6JWEZk9jOug&oe=69F34252&_nc_sid=10d13b' },
  // Customer matcha review — blueberry maple matcha
  { name: 'customer-matcha.jpg', url: 'https://scontent-sjc6-1.cdninstagram.com/v/t51.82787-15/671250932_18080819273409920_5886705171433711620_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-sjc6-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gEWMsJvX5KFjros9rKlwHHJbwhSC5DLRTiS8l6ImpU4f8Hxhb5sJxKrXb0RzuNFo1M&_nc_ohc=EnCxEBfjJX4Q7kNvwHA5YEx&_nc_gid=uizTUt7tKrfY_Q5be-p87g&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2Y21YNn6UOVYLsnXIWJMIod_SSEmhnxaj9XWVOm_eybg&oe=69F350F6&_nc_sid=10d13b' },
  // Busiest day ever — founders at trailer
  { name: 'busiest-day-close.jpg', url: 'https://scontent-sea1-1.cdninstagram.com/v/t51.82787-15/671710257_17944875288160204_8716520623238117258_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-sea1-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGG364VufpOexAIbbm5qFzrY3SczccItfOPoRF0BSanLviTQD7_-RitUwhonzCcXic&_nc_ohc=ECiceWOaWOUQ7kNvwFvlqO7&_nc_gid=QuyvTZLYyLGfdURMHyaRRQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2wtFnVIsWqdfMEdU_ovQMvms9WWQleJI2Q8Ag3j5PiLQ&oe=69F340B0&_nc_sid=10d13b' },
  // Garman Group bagel popUp flyer
  { name: 'garman-popup.jpg', url: 'https://scontent-msp1-1.cdninstagram.com/v/t51.82787-15/670971909_17997985967927508_7448225914722019863_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2gFDPbYGjih7aTg3eICEV2bmDx1r1CPaTVVD7dIScwZwezY2nmM9d2yyoM5271v-UAU&_nc_ohc=tkmgqE2xu9gQ7kNvwEaXIBx&_nc_gid=nllXKGXlqRvHFdQ-gnvWxg&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1Ja2Z9vFZy4n9RhjNx5KBF6kRKuY6b1CWE_BgiufYCqQ&oe=69F352A4&_nc_sid=10d13b' },
  // Spring Menu official graphic
  { name: 'spring-menu-official.jpg', url: 'https://scontent-mia5-1.cdninstagram.com/v/t51.82787-15/658787499_17941941291160204_8836924380392748762_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-mia5-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gFz-IS0p_jqhU3kFKqUgCpo0ePeB6r67Fbg1SIQAzE0mCvrPdoX04uaImpYJNWsUC0&_nc_ohc=Vp7Ylx_prvMQ7kNvwFC6Dr_&_nc_gid=3FFFbah0MOXruT2_NIQsnQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af3arO3qe42lUS-1xrGOFKMEegiYsqmJG4kCFDA1FCECNA&oe=69F33BFA&_nc_sid=10d13b' },
  // Blood Bank - community impact
  { name: 'blood-bank-community.jpg', url: 'https://scontent-lax7-1.cdninstagram.com/v/t51.82787-15/671139458_18601532563033405_2747204841496497143_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-lax7-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gFNb-9hkW0PNizoPkXV0aNSrDDrrXY4hpxNL7d_DHNG8OZ_fQc4yWljHrGiD-sZoVU&_nc_ohc=_nvpWIf8OToQ7kNvwEpaaiU&_nc_gid=lh-j7NvNGWGSKd5oZ7qPLA&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1y1pBitmrQZEvZmSdrXzh6STX7sN5_W7EJSsKjsKoEHg&oe=69F3497C&_nc_sid=10d13b' },
  // Best of Delaware nomination
  { name: 'best-of-delaware-nom.jpg', url: 'https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/626510023_17934320208160204_597625311190326274_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGPgkmgz26nnlvuKHmSjgD8rhT3j8hNjQDyMZuE3psq9niKzrWbR5xnKvaHP057b28&_nc_ohc=iF_0K3snOT0Q7kNvwHgHk5s&_nc_gid=dc-9byz7eIiqYcu8k-KMVw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af3Y7s1g-mO3QbwORWQ7TDZFoa-WpV-zOTbZkGj3zV-g7Q&oe=69F32505&_nc_sid=10d13b' },
  // House-made syrups in-house shot
  { name: 'house-made-syrups.jpg', url: 'https://scontent-ord5-2.cdninstagram.com/v/t51.82787-15/616323671_17932216035160204_1403229680056390678_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gFlLKMO9a10RxKf7FfmpoXqEFjHntGeEK-cO124l2Hgy96dgCUJm8VN1AiAoq3p8ag&_nc_ohc=zJd7GJXDWNEQ7kNvwGIuF2I&_nc_gid=efxe68IlHJeqeneGRUkrNg&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af0-4aObXZufPzguQcKl8kpLUq2w6_sL3b1PwVZ0JAIxhw&oe=69F349CC&_nc_sid=10d13b' },
  // PJ Fitzpatrick corporate morning
  { name: 'corporate-morning.jpg', url: 'https://instagram.fluk1-1.fna.fbcdn.net/v/t51.71878-15/669838212_1494361942031855_8983898473580842930_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=instagram.fluk1-1.fna.fbcdn.net&_nc_cat=111&_nc_oc=Q6cZ2gHfeMhC8vKIvCKp9U9McH4lrPfEt9nYujILfmXiTEdmEDXo9NggidqoCAfEXJvKzLE&_nc_ohc=rTQQtj8fM-IQ7kNvwHOLdr-&_nc_gid=nwfQCuN-3x3DXNICHbK8Aw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1J-msnv19R_ZonEvn73Lr1KOwnSfDmbg0jJ0RA4w4coQ&oe=69F34B50&_nc_sid=10d13b' },
  // Fundraiser for little girl — raising money
  { name: 'cut-for-cause.jpg', url: 'https://scontent-msp1-1.cdninstagram.com/v/t51.82787-15/655461402_17940849849160204_7198043110608976428_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-msp1-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGgsQFogWAlVdKErufiL5n5WX-6Qq725bLP4b1KUwveUOdxgMc1Huw6HJu0vXnlZw0&_nc_ohc=Gi_S3nSqK9QQ7kNvwG97zU7&_nc_gid=7aO4v842PARsn_N23CsVvA&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af0YsTAl0zF7oYboYWNA24Gny3THuB01perPnX1NR8egXA&oe=69F35489&_nc_sid=10d13b' },
  // Nest Play Cafe flyer
  { name: 'nest-play-event.jpg', url: 'https://scontent-den2-1.cdninstagram.com/v/t51.82787-15/625993698_17934230511160204_1397184225451620603_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gF5nJBkQLLACYsTNX_rGZQFX6t-9xirYfFIw5Fi0Ngnn0fD86TYihEE-HweajzCqb0&_nc_ohc=-Fij4p6V5WIQ7kNvwFSsMKl&_nc_gid=Az6UTR5xk8WWotsSHlkYPw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af3Vva7mqwLA2HiaZI_V4Xt4MaXYzulgfTSscCZJzQs6lg&oe=69F3476A&_nc_sid=10d13b' },
  // Creme brulee latte at salon
  { name: 'creme-brulee-salon.jpg', url: 'https://scontent-hou1-1.cdninstagram.com/v/t51.71878-15/634102364_1748253176341705_3154663634646322295_n.jpg?stp=dst-jpg_e15_tt6&_nc_ht=scontent-hou1-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gF7fG3K0QZ8THztBGviNqRXMIJikZcBdvkGOMc1gpPPuDbEtQj5-1YnmWGUOQR6DxI&_nc_ohc=JyOLI_0nCWIQ7kNvwE7h0DX&_nc_gid=plYcv7y0c-_vn3m1ec3plw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2tGu-jd3MWZKN_9LPPmImyXDpwYYVp0htsgfHuYjvixA&oe=69F32EFD&_nc_sid=10d13b' },
  // Valentine's Day menu graphic
  { name: 'valentines-menu-special.jpg', url: 'https://scontent-atl3-2.cdninstagram.com/v/t51.82787-15/619906474_17933013759160204_4957167583918715779_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gG4YhJMJ5Fd8X9BxdlziTQXwSGLlp_vvXjyv-lxoTzx5tQdLup0KrNsivfezCEevkc&_nc_ohc=4HSYtCn1ieoQ7kNvwF_XXHv&_nc_gid=Zan2WnG1f-fI5elnbpSd-w&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af196_cnzEJV-RquC4Emigwuw01lKWR8uVM7X6ondwRRSg&oe=69F31ECF&_nc_sid=10d13b' },
  // Holy Cross school event
  { name: 'holy-cross-school.jpg', url: 'https://scontent-atl3-2.cdninstagram.com/v/t51.82787-15/658949165_17942324382160204_4344638403628054883_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGvRH7iqAkm7E1eQIMiZrVanHEo7UIxMkxI3t8BqSXv235RUW4uBxr2EsqE7yBjdSA&_nc_ohc=ctSPuSj6v6IQ7kNvwGfBPzn&_nc_gid=K_LMpUn8_iQXFeuA9v4Gwg&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2MnjZtNm4rVJJ3RM9fvqTRnURdHPydpCa123i-S3MTzw&oe=69F32CCA&_nc_sid=10d13b' },
  // Galentine's pilates at Tremble House
  { name: 'galentines-pilates.jpg', url: 'https://scontent-bos5-1.cdninstagram.com/v/t51.82787-15/626426719_17864155539573488_8496889741401593312_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-bos5-1.cdninstagram.com&_nc_cat=108&_nc_oc=Q6cZ2gFT6tDDl9W7qHl0hWUHtSG9U-BtqlNuoRdKSlKtIhmqZ9RjbGtYgFEcneJ1QCBPgzc&_nc_ohc=Nqz8WDqAyXoQ7kNvwGM7oqy&_nc_gid=J_5bvHkQpbW6JQ81TI7Eug&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1tspetTtpXxKiZxQX7YWa-izujoiNPIGVkzz5BrCQ_iw&oe=69F3206B&_nc_sid=10d13b' },
  // Brownie batter latte at Tremble House
  { name: 'brownie-latte-tremble.jpg', url: 'https://scontent-atl3-2.cdninstagram.com/v/t51.82787-15/625987309_17934215403160204_6830079113115266088_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-atl3-2.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gEzvpS1qOWWIzyiNl_hI4X5S_VjpE2Ouk0r7RwD7a3qX5S20XPpJT1F-yWEYzWrz10&_nc_ohc=TJD6aLKOf-kQ7kNvwG586Zi&_nc_gid=a_354F4QMBziDYlJbQHqfw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af1nfK8gydDvxFTUuz9fLNa-elnddCFMOs-0FpXT_DgBhQ&oe=69F33511&_nc_sid=10d13b' },
  // Blood Bank donation event — another angle
  { name: 'blood-bank-return.jpg', url: 'https://scontent-lga3-2.cdninstagram.com/v/t51.82787-15/654288054_18592481368033405_1633048227966780744_n.jpg?stp=dst-jpg_e35_s1080x1080_sh0.08_tt6&_nc_ht=scontent-lga3-2.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2gFkHT_CJMBr-9TKxcq8fpe83BwIPPGEXV2KekW8XxcFEdEmg0nP4poz_UwRgUjZevc&_nc_ohc=EMHyNu7geCwQ7kNvwEoRdnJ&_nc_gid=eqm1J_bitxeFneid6HpBUg&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2j1fytZQwdQvH8rAyupy2qt8gE8HCQI34fhpU2NE8qiw&oe=69F34AC9&_nc_sid=10d13b' },
  // Pretty in Pink women's market vendor post
  { name: 'pretty-in-pink-vendor.jpg', url: 'https://scontent-atl3-3.cdninstagram.com/v/t51.82787-15/634237114_18117176818719787_2085802051317275627_n.jpg?stp=dst-jpg_e15_fr_p1080x1080_tt6&_nc_ht=scontent-atl3-3.cdninstagram.com&_nc_cat=107&_nc_oc=Q6cZ2gGgXLnMFPr-vJqKrnzSwjCx3wSGm_lX8C0crtqAvs9azQk7dVVP8tgAr-PNB9hcCbQ&_nc_ohc=LgxKBvOaQBoQ7kNvwHtLRqW&_nc_gid=XYMV3KBnRoc4JXMPsc96mw&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2IlByNp44KceLNfcQ93ynyVCuwQdJap1N251ceW3DFgA&oe=69F3298E&_nc_sid=10d13b' },
  // Do More 24 Delaware event
  { name: 'do-more-24-event.jpg', url: 'https://scontent-lga3-3.cdninstagram.com/v/t51.82787-15/638304984_17937090972160204_6922596438729673561_n.jpg?stp=dst-jpg_e35_p1080x1080_sh0.08_tt6&_nc_ht=scontent-lga3-3.cdninstagram.com&_nc_cat=104&_nc_oc=Q6cZ2gGFz-eRJv7B-KgelcE6lGuHGYVbRYGHeghveY2pwXE2WlMCm_-4nC0KKqflRVKBr20&_nc_ohc=GRKDvw43Hm8Q7kNvwEiYtiM&_nc_gid=FBpY-4E7fRFSuQKKg3DQQQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_Af2GoOqlQ6e6gjHRDJUYCP3cneSo0cyrpRyDWjxGB_FQcA&oe=69F33012&_nc_sid=10d13b' },
];

function download(url, filepath) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode} for ${path.basename(filepath)}`)); res.resume(); return; }
      const ws = fs.createWriteStream(filepath);
      res.pipe(ws);
      ws.on('finish', () => { ws.close(); resolve(filepath); });
      ws.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  let ok = 0, fail = 0;
  for (const { name, url } of downloads) {
    const fp = path.join(imgDir, name);
    if (fs.existsSync(fp)) { console.log(`SKIP ${name}`); ok++; continue; }
    try {
      await download(url, fp);
      const size = fs.statSync(fp).size;
      console.log(`OK   ${name} (${(size/1024).toFixed(0)} KB)`);
      ok++;
    } catch (e) {
      console.log(`FAIL ${name}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} ok, ${fail} failed`);
})();
