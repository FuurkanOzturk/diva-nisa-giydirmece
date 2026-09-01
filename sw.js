/* Diva Dress & Makeup — offline service worker.
   Caches the game (and admin panel) plus every component image on first
   visit, so it keeps working with no internet afterwards — e.g. on an
   iPhone with Wi-Fi off. Bump CACHE_VERSION whenever files change so
   returning visitors pick up the update instead of a stale cache. */

const CACHE_VERSION = '20260901-061519';
const CACHE_NAME = 'diva-dress-makeup-' + CACHE_VERSION;

const CORE_ASSETS = [
  './',
  './index.html',
  './catalog.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon.png',
];

const COMPONENT_ASSETS = [
  'components/furkan_accessory_gunes_gozlugu.png',
  'components/furkan_accessory_kasket_siyah.png',
  'components/furkan_accessory_kravat_kirmizi.png',
  'components/furkan_accessory_papyon_siyah.png',
  'components/furkan_accessory_polis_sapkasi.png',
  'components/furkan_accessory_polis_yelegi.png',
  'components/furkan_accessory_saat.png',
  'components/furkan_accessory_tabanca_kilifi.png',
  'components/furkan_accessory_zincir.png',
  'components/furkan_base.png',
  'components/furkan_bottom_beige_chino.png',
  'components/furkan_bottom_blue_jeans.png',
  'components/furkan_bottom_esofman_gri.png',
  'components/furkan_bottom_jogger_siyah.png',
  'components/furkan_bottom_kargo_haki.png',
  'components/furkan_bottom_kot_sort_mavi.png',
  'components/furkan_bottom_kumas_pantolon_siyah.png',
  'components/furkan_bottom_navy_trousers.png',
  'components/furkan_bottom_polis_pantolon.png',
  'components/furkan_bottom_smokin_pantolon.png',
  'components/furkan_bottom_sort_haki.png',
  'components/furkan_bottom_spor_sort_siyah.png',
  'components/furkan_hair_swept_ash.png',
  'components/furkan_hair_swept_black.png',
  'components/furkan_hair_swept_blonde.png',
  'components/furkan_hair_swept_brown.png',
  'components/furkan_hair_swept_copper.png',
  'components/furkan_makeup_blush_dogal.png',
  'components/furkan_shoes_bilek_bot_siyah.png',
  'components/furkan_shoes_bot_kahve.png',
  'components/furkan_shoes_kosu_siyah.png',
  'components/furkan_shoes_loafer_kahve.png',
  'components/furkan_shoes_mokasen_lacivert.png',
  'components/furkan_shoes_oxford_black.png',
  'components/furkan_shoes_oxford_brown.png',
  'components/furkan_shoes_polis_postal.png',
  'components/furkan_shoes_sneaker_beyaz.png',
  'components/furkan_shoes_sneaker_kirmizi.png',
  'components/furkan_shoes_sneaker_mavi.png',
  'components/furkan_shoes_spor_gri.png',
  'components/furkan_suit_black.png',
  'components/furkan_suit_grey.png',
  'components/furkan_suit_navy.png',
  'components/furkan_suit_teal.png',
  'components/furkan_top_atlet_siyah.png',
  'components/furkan_top_blazer_bordo.png',
  'components/furkan_top_deri_ceket_siyah.png',
  'components/furkan_top_ekose_gomlek.png',
  'components/furkan_top_esofman_ust_lacivert.png',
  'components/furkan_top_forma_kirmizi.png',
  'components/furkan_top_gomlek_kravat_beyaz.png',
  'components/furkan_top_hoodie_gri.png',
  'components/furkan_top_kazak_bordo.png',
  'components/furkan_top_kot_ceket.png',
  'components/furkan_top_polis_uniforma.png',
  'components/furkan_top_polo_lacivert.png',
  'components/furkan_top_smokin_siyah.png',
  'components/furkan_top_trenckot_bej.png',
  'components/furkan_top_tshirt_beyaz.png',
  'components/furkan_top_tshirt_siyah.png',
  'components/nisa_accessory_avukat_cubbesi.png',
  'components/nisa_accessory_canta.png',
  'components/nisa_accessory_esarp.png',
  'components/nisa_accessory_gunes_gozlugu.png',
  'components/nisa_accessory_kolye_inci.png',
  'components/nisa_accessory_kolye_kalp.png',
  'components/nisa_accessory_kupe_altin.png',
  'components/nisa_accessory_sapka_fotr.png',
  'components/nisa_accessory_tac.png',
  'components/nisa_base.png',
  'components/nisa_bottom_deri_etek_siyah.png',
  'components/nisa_bottom_esofman_gri.png',
  'components/nisa_bottom_etek_altin.png',
  'components/nisa_bottom_etek_cicekli.png',
  'components/nisa_bottom_etek_pileli_pembe.png',
  'components/nisa_bottom_kapri_lacivert.png',
  'components/nisa_bottom_kot_mavi.png',
  'components/nisa_bottom_kot_sort.png',
  'components/nisa_bottom_kumas_pantolon_bej.png',
  'components/nisa_bottom_midi_etek_zumrut.png',
  'components/nisa_bottom_pantolon_beyaz.png',
  'components/nisa_bottom_spor_sort_pembe.png',
  'components/nisa_bottom_tayt_siyah.png',
  'components/nisa_dress_bodycon_kirmizi.png',
  'components/nisa_dress_gala_emerald.png',
  'components/nisa_dress_gala_gold.png',
  'components/nisa_dress_gala_lilac.png',
  'components/nisa_dress_gala_red.png',
  'components/nisa_dress_kokteyl_siyah.png',
  'components/nisa_dress_kot_elbise.png',
  'components/nisa_dress_ofis_lacivert.png',
  'components/nisa_dress_princess_pink.png',
  'components/nisa_dress_yazlik_sari.png',
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
  'components/nisa_shoes_babet_bej.png',
  'components/nisa_shoes_babet_siyah.png',
  'components/nisa_shoes_bilek_spor_siyah.png',
  'components/nisa_shoes_bot_diz_siyah.png',
  'components/nisa_shoes_bot_kahve.png',
  'components/nisa_shoes_kosu_mor.png',
  'components/nisa_shoes_kosu_pembe.png',
  'components/nisa_shoes_platform_gumus.png',
  'components/nisa_shoes_sneaker_beyaz.png',
  'components/nisa_shoes_spor_beyazmavi.png',
  'components/nisa_shoes_stiletto_altin.png',
  'components/nisa_shoes_stiletto_beyaz.png',
  'components/nisa_shoes_stiletto_kirmizi.png',
  'components/nisa_shoes_stiletto_lacivert.png',
  'components/nisa_shoes_stiletto_pembe.png',
  'components/nisa_shoes_stiletto_siyah.png',
  'components/nisa_shoes_topuk_bordo.png',
  'components/nisa_top_atlet_mor.png',
  'components/nisa_top_blazer_beyaz.png',
  'components/nisa_top_bluz_cicekli.png',
  'components/nisa_top_gomlek_mavi.png',
  'components/nisa_top_hirka_bej.png',
  'components/nisa_top_kazak_pembe.png',
  'components/nisa_top_kot_ceket.png',
  'components/nisa_top_saten_bluz.png',
  'components/nisa_top_spor_bra_pembe.png',
  'components/nisa_top_spor_ceket_siyah.png',
  'components/nisa_top_spor_sweat_gri.png',
  'components/nisa_top_trenckot_bej.png',
  'components/nisa_top_tshirt_beyaz.png',
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

// Two environments want opposite things from a cache, so the strategy
// follows the host this worker happens to be running on.
//
// On localhost the files under this folder change constantly -- that is the
// entire point of start.bat: edit, reload, look. Nothing may be served from
// the cache without checking the disk first, or a redrawn garment keeps
// showing its old artwork and an edited index.html never loads. So in dev
// everything is network-first.
//
// A published build is the opposite: its files are frozen until the next
// deploy, and the phone that is supposed to keep playing with no signal has
// every reason to read them straight out of the cache. So in production the
// heavy, frozen things (component images, icons) are cache-first, which is
// what makes the game open instantly and work with the network off. Only the
// app shell stays network-first there, so a fresh deploy is picked up on the
// next online visit instead of one visit later -- and deploy_hazirla.bat
// stamps a new CACHE_VERSION into every build anyway, which retires the old
// cache wholesale the moment the new worker activates.
const IS_DEV = self.location.hostname === 'localhost' ||
               self.location.hostname === '127.0.0.1';

function isAppShell(url, req) {
  if (req.mode === 'navigate') return true;
  const p = url.pathname;
  return p.endsWith('/index.html') || p.endsWith('/admin.html') ||
         p.endsWith('/catalog.js') || p.endsWith('/placements.json') ||
         p.endsWith('/');
}

const NETWORK_TIMEOUT_MS = 2500;

function networkWithTimeout(req) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('network timeout')), NETWORK_TIMEOUT_MS);
    fetch(req).then(
      (res) => { clearTimeout(timer); resolve(res); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // don't intercept cross-origin

  // Cache-first, but only for frozen assets on a published build.
  if (!IS_DEV && !isAppShell(url, req)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return networkWithTimeout(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
            }
            return res;
          })
          .catch(() => new Response('', { status: 504, statusText: 'Offline' }));
      })
    );
    return;
  }

  event.respondWith(
    networkWithTimeout(req)
      .then((res) => {
        // refresh the offline copy with whatever the server just gave us
        if (res && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then((cached) => {
          if (cached) return cached;
          // offline and not cached: for a page navigation, fall back to the
          // cached game shell rather than showing a browser error page
          if (req.mode === 'navigate') return caches.match('./index.html');
          return new Response('', { status: 504, statusText: 'Offline' });
        })
      )
  );
});
