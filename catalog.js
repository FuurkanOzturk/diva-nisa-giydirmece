/* ============================================================
   SHARED CATALOG — single source of truth for every wearable
   item (hair/top/bottom/shoes/makeup/accessories) for both
   characters, plus the layer z-index map.

   Loaded by BOTH index.html (the game) and admin.html (the
   position-editing tool) via <script src="catalog.js"></script>.
   Previously each file kept its own hand-written copy of this
   data (index.html's CATALOG and admin.html's BASE_CATALOG),
   which could silently drift out of sync — e.g. a new item added
   to one file but not the other would be impossible to position
   from the admin panel, or admin could show a stale image while
   the game rendered a different one. Sharing one file makes that
   class of bug structurally impossible: there is only one object,
   so admin's item picker and preview are always built from
   exactly the same data the game itself renders.

   STYLE TAGS
   ----------
   Every wearable outside hair/makeup carries a `style` field:
     'spor'   — sportswear
     'gunluk' — everyday / casual
     'sik'    — luxury, evening, tailored
     'meslek' — profession outfits (police kit, lawyer's robe)
   The game turns these into the filter pills under the tab bar,
   so the wardrobe stays browsable as it grows. Anything without a
   `style` simply shows in every filter.
   ============================================================ */

const STYLES = [
  { id: 'hepsi',  label: '✨ Hepsi'  },
  { id: 'spor',   label: '🏃 Spor'   },
  { id: 'gunluk', label: '👕 Günlük' },
  { id: 'sik',    label: '💎 Şık'    },
  { id: 'meslek', label: '👮 Meslek' },
];

/* Small helper so every entry stays one readable line instead of
   repeating the same <img> template literal 150 times. */
/* `zoom` is an optional [scale, originY%] pair used only for the item-grid
   thumbnail. Category-wide zooms live in the CSS; accessories need per-item
   ones because a tiara, a holster and a full-length robe sit in completely
   different parts of the same 1024x1024 canvas. */
function it(label, file, style, zoom) {
  const src = 'components/' + file;
  // The id is derived from the file name so it is unique, readable, and stable
  // across catalog edits — admin.html keys its saved position overrides by id,
  // and a hand-numbered id like 'nb3' silently changes meaning the moment an
  // item is inserted or reordered.
  const id = file.replace(/\.png$/, '');
  return { id, label, isImg: true, src, style, zoom,
           thumbFn: () => `<img src="${src}">` };
}

const CATALOG = {
  nisa: {
    hair: [
      it('Dalgalı Sarı',        'nisa_hair_wavy_blonde.png'),
      it('Pembe İkiz Topuz',    'nisa_hair_twinbuns_pink.png'),
      it('Dalgalı Kahve',       'nisa_hair_wavy_brown.png'),
      it('Dalgalı Siyah',       'nisa_hair_wavy_black.png'),
      it('Dalgalı Kızıl',       'nisa_hair_wavy_copper.png'),
    ],
    top: [
      // ---- şık / gece ----
      it('Prenses Balo Elbisesi', 'nisa_dress_princess_pink.png', 'sik'),
      it('Kırmızı Gala Elbisesi', 'nisa_dress_gala_red.png',      'sik'),
      it('Zümrüt Gala Elbisesi',  'nisa_dress_gala_emerald.png',  'sik'),
      it('Lila Gala Elbisesi',    'nisa_dress_gala_lilac.png',    'sik'),
      it('Altın Gala Elbisesi',   'nisa_dress_gala_gold.png',     'sik'),
      it('Siyah Kokteyl Elbisesi','nisa_dress_kokteyl_siyah.png', 'sik'),
      it('Kırmızı Bodycon',       'nisa_dress_bodycon_kirmizi.png','sik'),
      it('Beyaz Blazer',          'nisa_top_blazer_beyaz.png',    'sik'),
      it('Bej Trençkot',          'nisa_top_trenckot_bej.png',    'sik'),
      it('Saten Bluz',            'nisa_top_saten_bluz.png',      'sik'),
      // ---- günlük ----
      it('Beyaz Tişört',          'nisa_top_tshirt_beyaz.png',    'gunluk'),
      it('Kot Ceket',             'nisa_top_kot_ceket.png',       'gunluk'),
      it('Çiçekli Bluz',          'nisa_top_bluz_cicekli.png',    'gunluk'),
      it('Pembe Kazak',           'nisa_top_kazak_pembe.png',     'gunluk'),
      it('Mavi Gömlek',           'nisa_top_gomlek_mavi.png',     'gunluk'),
      it('Bej Hırka',             'nisa_top_hirka_bej.png',       'gunluk'),
      it('Sarı Yazlık Elbise',    'nisa_dress_yazlik_sari.png',   'gunluk'),
      it('Kot Elbise',            'nisa_dress_kot_elbise.png',    'gunluk'),
      it('Lacivert Ofis Elbisesi','nisa_dress_ofis_lacivert.png', 'gunluk'),
      // ---- spor ----
      it('Pembe Spor Büstiyer',   'nisa_top_spor_bra_pembe.png',  'spor'),
      it('Gri Sweatshirt',        'nisa_top_spor_sweat_gri.png',  'spor'),
      it('Mor Atlet',             'nisa_top_atlet_mor.png',       'spor'),
      it('Siyah Eşofman Üstü',    'nisa_top_spor_ceket_siyah.png','spor'),
    ],
    bottom: [
      it('Siyah Tayt',            'nisa_bottom_tayt_siyah.png',        'spor'),
      it('Pembe Spor Şort',       'nisa_bottom_spor_sort_pembe.png',   'spor'),
      it('Gri Eşofman Altı',      'nisa_bottom_esofman_gri.png',       'spor'),
      it('Mavi Kot',              'nisa_bottom_kot_mavi.png',          'gunluk'),
      it('Kot Şort',              'nisa_bottom_kot_sort.png',          'gunluk'),
      it('Pembe Pileli Etek',     'nisa_bottom_etek_pileli_pembe.png', 'gunluk'),
      it('Beyaz Pantolon',        'nisa_bottom_pantolon_beyaz.png',    'gunluk'),
      it('Çiçekli Etek',          'nisa_bottom_etek_cicekli.png',      'gunluk'),
      it('Lacivert Kapri',        'nisa_bottom_kapri_lacivert.png',    'gunluk'),
      it('Siyah Deri Etek',       'nisa_bottom_deri_etek_siyah.png',   'sik'),
      it('Altın Parti Etek',      'nisa_bottom_etek_altin.png',        'sik'),
      it('Zümrüt Midi Etek',      'nisa_bottom_midi_etek_zumrut.png',  'sik'),
      it('Bej Kumaş Pantolon',    'nisa_bottom_kumas_pantolon_bej.png','sik'),
    ],
    shoes: [
      it('Kırmızı Stiletto',      'nisa_shoes_stiletto_kirmizi.png',  'sik'),
      it('Siyah Stiletto',        'nisa_shoes_stiletto_siyah.png',    'sik'),
      it('Altın Topuklu',         'nisa_shoes_stiletto_altin.png',    'sik'),
      it('Beyaz Topuklu',         'nisa_shoes_stiletto_beyaz.png',    'sik'),
      it('Pembe Topuklu',         'nisa_shoes_stiletto_pembe.png',    'sik'),
      it('Lacivert Topuklu',      'nisa_shoes_stiletto_lacivert.png', 'sik'),
      it('Gümüş Platform',        'nisa_shoes_platform_gumus.png',    'sik'),
      it('Bordo Bilek Bantlı',    'nisa_shoes_topuk_bordo.png',       'sik'),
      it('Siyah Diz Üstü Çizme',  'nisa_shoes_bot_diz_siyah.png',     'sik'),
      it('Bej Babet',             'nisa_shoes_babet_bej.png',         'gunluk'),
      it('Siyah Babet',           'nisa_shoes_babet_siyah.png',       'gunluk'),
      it('Kahve Bot',             'nisa_shoes_bot_kahve.png',         'gunluk'),
      it('Beyaz Sneaker',         'nisa_shoes_sneaker_beyaz.png',     'gunluk'),
      it('Pembe Koşu Ayakkabısı', 'nisa_shoes_kosu_pembe.png',        'spor'),
      it('Mor Koşu Ayakkabısı',   'nisa_shoes_kosu_mor.png',          'spor'),
      it('Beyaz-Mavi Spor',       'nisa_shoes_spor_beyazmavi.png',    'spor'),
      it('Siyah Bilek Spor',      'nisa_shoes_bilek_spor_siyah.png',  'spor'),
    ],
    makeup_lipstick: [
      it('Diva Pembe',   'nisa_makeup_lip_diva_pembe.png'),
      it('Kırmızı Ruby', 'nisa_makeup_lip_kirmizi_ruby.png'),
      it('Şeftali Nude', 'nisa_makeup_lip_seftali_nude.png'),
      it('Mürdüm Mor',   'nisa_makeup_lip_murdum_mor.png'),
    ],
    makeup_eyeshadow: [
      it('Altın Parıltı',   'nisa_makeup_eyeshadow_altin.png'),
      it('Smoky Kömür',     'nisa_makeup_eyeshadow_smoky.png'),
      it('Romantik Pembe',  'nisa_makeup_eyeshadow_pembe.png'),
    ],
    makeup_blush: [
      it('Gül Kurusu',   'nisa_makeup_blush_gulkurusu.png'),
      it('Taze Şeftali', 'nisa_makeup_blush_seftali.png'),
    ],
    makeup_eyeliner: [
      it('Siyah Kanat', 'nisa_makeup_eyeliner_siyah.png'),
    ],
    accessories: [
      it('Avukat Cübbesi',  'nisa_accessory_avukat_cubbesi.png', 'meslek', [1.6, 40]),
      it('Taç',             'nisa_accessory_tac.png',            'sik',    [3.6, 13]),
      it('İnci Kolye',      'nisa_accessory_kolye_inci.png',     'sik',    [3.2, 33]),
      it('El Çantası',      'nisa_accessory_canta.png',          'sik',    [2.4, 58]),
      it('Kalp Kolye',      'nisa_accessory_kolye_kalp.png',     'gunluk', [3.2, 32]),
      it('Altın Küpe',      'nisa_accessory_kupe_altin.png',     'gunluk', [3.8, 19]),
      it('Güneş Gözlüğü',   'nisa_accessory_gunes_gozlugu.png',  'gunluk', [3.8, 17]),
      it('Fötr Şapka',      'nisa_accessory_sapka_fotr.png',     'gunluk', [3.4, 12]),
      it('Eşarp',           'nisa_accessory_esarp.png',          'gunluk', [3.0, 31]),
    ],
  },

  furkan: {
    hair: [
      it('Taranmış Kahve',         'furkan_hair_swept_brown.png'),
      it('Taranmış Siyah',         'furkan_hair_swept_black.png'),
      it('Taranmış Sarı',          'furkan_hair_swept_blonde.png'),
      it('Taranmış Kızıl',         'furkan_hair_swept_copper.png'),
      it('Taranmış Küllü Kumral',  'furkan_hair_swept_ash.png'),
    ],
    top: [
      // ---- şık ----
      it('Lacivert Takım',      'furkan_suit_navy.png',                'sik'),
      it('Siyah Takım',         'furkan_suit_black.png',               'sik'),
      it('Gri Takım',           'furkan_suit_grey.png',                'sik'),
      it('Turkuaz Blazer',      'furkan_suit_teal.png',                'sik'),
      it('Siyah Smokin',        'furkan_top_smokin_siyah.png',         'sik'),
      it('Bordo Blazer',        'furkan_top_blazer_bordo.png',         'sik'),
      it('Bej Trençkot',        'furkan_top_trenckot_bej.png',         'sik'),
      it('Gömlek & Kravat',     'furkan_top_gomlek_kravat_beyaz.png',  'sik'),
      // ---- günlük ----
      it('Beyaz Tişört',        'furkan_top_tshirt_beyaz.png',         'gunluk'),
      it('Siyah Tişört',        'furkan_top_tshirt_siyah.png',         'gunluk'),
      it('Lacivert Polo',       'furkan_top_polo_lacivert.png',        'gunluk'),
      it('Bordo Kazak',         'furkan_top_kazak_bordo.png',          'gunluk'),
      it('Kot Ceket',           'furkan_top_kot_ceket.png',            'gunluk'),
      it('Ekose Gömlek',        'furkan_top_ekose_gomlek.png',         'gunluk'),
      it('Siyah Deri Ceket',    'furkan_top_deri_ceket_siyah.png',     'gunluk'),
      // ---- spor ----
      it('Siyah Atlet',         'furkan_top_atlet_siyah.png',          'spor'),
      it('Kırmızı Forma',       'furkan_top_forma_kirmizi.png',        'spor'),
      it('Eşofman Üstü',        'furkan_top_esofman_ust_lacivert.png', 'spor'),
      it('Gri Kapüşonlu',       'furkan_top_hoodie_gri.png',           'spor'),
      // ---- meslek ----
      it('Polis Üniforması',    'furkan_top_polis_uniforma.png',       'meslek'),
    ],
    bottom: [
      it('Lacivert Pantolon',   'furkan_bottom_navy_trousers.png',        'sik'),
      it('Siyah Kumaş Pantolon','furkan_bottom_kumas_pantolon_siyah.png', 'sik'),
      it('Smokin Pantolonu',    'furkan_bottom_smokin_pantolon.png',      'sik'),
      it('Mavi Kot',            'furkan_bottom_blue_jeans.png',           'gunluk'),
      it('Bej Chino',           'furkan_bottom_beige_chino.png',          'gunluk'),
      it('Kot Şort',            'furkan_bottom_kot_sort_mavi.png',        'gunluk'),
      it('Haki Şort',           'furkan_bottom_sort_haki.png',            'gunluk'),
      it('Haki Kargo',          'furkan_bottom_kargo_haki.png',           'gunluk'),
      it('Gri Eşofman Altı',    'furkan_bottom_esofman_gri.png',          'spor'),
      it('Siyah Jogger',        'furkan_bottom_jogger_siyah.png',         'spor'),
      it('Siyah Spor Şort',     'furkan_bottom_spor_sort_siyah.png',      'spor'),
      it('Polis Pantolonu',     'furkan_bottom_polis_pantolon.png',       'meslek'),
    ],
    shoes: [
      it('Kahve Oxford',        'furkan_shoes_oxford_brown.png',      'sik'),
      it('Siyah Oxford',        'furkan_shoes_oxford_black.png',      'sik'),
      it('Kahve Loafer',        'furkan_shoes_loafer_kahve.png',      'sik'),
      it('Lacivert Mokasen',    'furkan_shoes_mokasen_lacivert.png',  'sik'),
      it('Beyaz Sneaker',       'furkan_shoes_sneaker_beyaz.png',     'gunluk'),
      it('Mavi Sneaker',        'furkan_shoes_sneaker_mavi.png',      'gunluk'),
      it('Kırmızı Sneaker',     'furkan_shoes_sneaker_kirmizi.png',   'gunluk'),
      it('Kahve Bot',           'furkan_shoes_bot_kahve.png',         'gunluk'),
      it('Siyah Bilek Bot',     'furkan_shoes_bilek_bot_siyah.png',   'gunluk'),
      it('Siyah Koşu',          'furkan_shoes_kosu_siyah.png',        'spor'),
      it('Gri Spor',            'furkan_shoes_spor_gri.png',          'spor'),
      it('Polis Postalı',       'furkan_shoes_polis_postal.png',      'meslek'),
    ],
    makeup_blush: [
      it('Doğal Allık', 'furkan_makeup_blush_dogal.png'),
    ],
    accessories: [
      it('Polis Yeleği',    'furkan_accessory_polis_yelegi.png',   'meslek', [2.0, 36]),
      it('Tabanca Kılıfı',  'furkan_accessory_tabanca_kilifi.png', 'meslek', [2.6, 55]),
      it('Polis Şapkası',   'furkan_accessory_polis_sapkasi.png',  'meslek', [3.8, 8]),
      it('Papyon',          'furkan_accessory_papyon_siyah.png',   'sik',    [4.2, 20]),
      it('Kırmızı Kravat',  'furkan_accessory_kravat_kirmizi.png', 'sik',    [2.6, 28]),
      it('Altın Zincir',    'furkan_accessory_zincir.png',         'sik',    [3.8, 21]),
      it('Güneş Gözlüğü',   'furkan_accessory_gunes_gozlugu.png',  'gunluk', [4.2, 11]),
      it('Siyah Kasket',    'furkan_accessory_kasket_siyah.png',   'gunluk', [3.8, 7]),
      it('Kol Saati',       'furkan_accessory_saat.png',           'gunluk', [3.4, 54]),
    ],
  }
};

/* Layer stacking order (higher draws on top). Shared so admin's preview
   stacks items in exactly the same order the game does. */
const Z = {
  base:             1,
  makeup_blush:     2,
  makeup_eyeshadow: 2,
  makeup_eyeliner:  2,
  makeup_lipstick:  2,
  bottom:           3,
  shoes:            3,
  top:              4,
  hair:             5,
  accessories:      6,
};
