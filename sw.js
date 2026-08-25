/* Diva Dress & Makeup — offline service worker.
   Caches the game (and admin panel) plus every component image on first
   visit, so it keeps working with no internet afterwards — e.g. on an
   iPhone with Wi-Fi off. Bump CACHE_VERSION whenever files change so
   returning visitors pick up the update instead of a stale cache. */

const CACHE_VERSION = 'v3';
const CACHE_NAME = 'diva-dress-makeup-' + CACHE_VERSION;

const CORE_ASSETS = [
  './',
  './index.html',
  './admin.html',
  './catalog.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon.png',
];

const COMPONENT_ASSETS = [
  'components/furkan_accessory_bowtie.png',
  'components/furkan_accessory_sunglasses.png',
  'components/furkan_accessory_watch.png',
  'components/furkan_base.png',
  'components/furkan_blue_suit.png',
  'components/furkan_blue_suit_u.png',
  'components/furkan_bottom_1.png',
  'components/furkan_bottom_2.png',
  'components/furkan_bottom_3.png',
  'components/furkan_bottom_4.png',
  'components/furkan_bottom_5.png',
  'components/furkan_bottom_beige_chino.png',
  'components/furkan_bottom_black_jogger.png',
  'components/furkan_bottom_blue_jeans.png',
  'components/furkan_bottom_khaki_shorts.png',
  'components/furkan_bottom_navy_trousers.png',
  'components/furkan_bottom_olive_cargo.png',
  'components/furkan_bottom_grey_sweatpants.png',
  'components/furkan_bottom_blue_denim_shorts.png',
  'components/furkan_hair_1.png',
  'components/furkan_hair_2.png',
  'components/furkan_hair_3.png',
  'components/furkan_hair_4.png',
  'components/furkan_hair_5.png',
  'components/furkan_hair_brown.png',
  'components/furkan_hair_swept_ash.png',
  'components/furkan_hair_swept_black.png',
  'components/furkan_hair_swept_blonde.png',
  'components/furkan_hair_swept_brown.png',
  'components/furkan_hair_swept_copper.png',
  'components/furkan_makeup_blush_dogal.png',
  'components/furkan_shirt_business.png',
  'components/furkan_shoes_1.png',
  'components/furkan_shoes_2.png',
  'components/furkan_shoes_3.png',
  'components/furkan_shoes_4.png',
  'components/furkan_shoes_5.png',
  'components/furkan_shoes_oxford_black.png',
  'components/furkan_shoes_oxford_brown.png',
  'components/furkan_shoes_sneaker_blue.png',
  'components/furkan_shoes_sneaker_red.png',
  'components/furkan_shoes_sneaker_white.png',
  'components/furkan_shoes_sneakers.png',
  'components/furkan_suit_black.png',
  'components/furkan_suit_grey.png',
  'components/furkan_suit_navy.png',
  'components/furkan_suit_teal.png',
  'components/furkan_top_1.png',
  'components/furkan_top_2.png',
  'components/furkan_top_3.png',
  'components/furkan_top_4.png',
  'components/furkan_top_5.png',
  'components/furkan_top_tshirt_white.png',
  'components/furkan_top_hoodie_grey.png',
  'components/furkan_top_polo_navy.png',
  'components/furkan_top_sweater_burgundy.png',
  'components/nisa_accessory_necklace.png',
  'components/nisa_accessory_sunglasses.png',
  'components/nisa_accessory_tiara.png',
  'components/nisa_base.png',
  'components/nisa_bottom_1.png',
  'components/nisa_bottom_2.png',
  'components/nisa_bottom_3.png',
  'components/nisa_bottom_4.png',
  'components/nisa_bottom_5.png',
  'components/nisa_bottom_black_leather_skirt.png',
  'components/nisa_bottom_blue_jeans.png',
  'components/nisa_bottom_gold_party_skirt.png',
  'components/nisa_bottom_pink_pleated.png',
  'components/nisa_bottom_white_trousers.png',
  'components/nisa_dress_gala_emerald.png',
  'components/nisa_dress_gala_gold.png',
  'components/nisa_dress_gala_lilac.png',
  'components/nisa_dress_gala_red.png',
  'components/nisa_dress_princess_pink.png',
  'components/nisa_hair_1.png',
  'components/nisa_hair_2.png',
  'components/nisa_hair_3.png',
  'components/nisa_hair_4.png',
  'components/nisa_hair_5.png',
  'components/nisa_hair_blonde.png',
  'components/nisa_hair_pink.png',
  'components/nisa_hair_twinbuns_pink.png',
  'components/nisa_hair_wavy_black.png',
  'components/nisa_hair_wavy_blonde.png',
  'components/nisa_hair_wavy_brown.png',
  'components/nisa_hair_wavy_copper.png',
  'components/nisa_makeup_blush_gulkurusu.png',
  'components/nisa_makeup_blush_seftali.png',
  'components/nisa_makeup_eyeliner_siyah.png',
  'components/nisa_makeup_eyeshadow_altin.png',
  'components/nisa_makeup_eyeshadow_pembe.png',
  'components/nisa_makeup_eyeshadow_smoky.png',
  'components/nisa_makeup_lip_diva_pembe.png',
  'components/nisa_makeup_lip_kirmizi_ruby.png',
  'components/nisa_makeup_lip_murdum_mor.png',
  'components/nisa_makeup_lip_seftali_nude.png',
  'components/nisa_pink_dress.png',
  'components/nisa_red_dress.png',
  'components/nisa_shoes_1.png',
  'components/nisa_shoes_2.png',
  'components/nisa_shoes_3.png',
  'components/nisa_shoes_4.png',
  'components/nisa_shoes_5.png',
  'components/nisa_shoes_heel_black.png',
  'components/nisa_shoes_heel_gold.png',
  'components/nisa_shoes_heel_pink.png',
  'components/nisa_shoes_heel_red.png',
  'components/nisa_shoes_heel_white.png',
  'components/nisa_shoes_pink.png',
  'components/nisa_top_1.png',
  'components/nisa_top_2.png',
  'components/nisa_top_3.png',
  'components/nisa_top_4.png',
  'components/nisa_top_5.png',
];

const ALL_ASSETS = CORE_ASSETS.concat(COMPONENT_ASSETS);

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // add one-by-one instead of addAll() so a single missing/renamed file
      // can't fail the whole install and leave the app uncached
      return Promise.all(
        ALL_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('[sw] skip caching', url, err);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // don't intercept cross-origin

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => {
          // offline and not cached: for a page navigation, fall back to the
          // cached game shell rather than showing a browser error page
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('', { status: 504, statusText: 'Offline' });
        });
    })
  );
});
