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
   ============================================================ */

const CATALOG = {
  nisa: {
    hair: [
      { id:'nh1', label:'Dalgalı Sarı', isImg:true, src:'components/nisa_hair_wavy_blonde.png', thumbFn:()=>`<img src="components/nisa_hair_wavy_blonde.png">` },
      { id:'nh2', label:'Pembe İkiz Topuz', isImg:true, src:'components/nisa_hair_twinbuns_pink.png', thumbFn:()=>`<img src="components/nisa_hair_twinbuns_pink.png">` },
      { id:'nh3', label:'Dalgalı Kahve', isImg:true, src:'components/nisa_hair_wavy_brown.png', thumbFn:()=>`<img src="components/nisa_hair_wavy_brown.png">` },
      { id:'nh4', label:'Dalgalı Siyah', isImg:true, src:'components/nisa_hair_wavy_black.png', thumbFn:()=>`<img src="components/nisa_hair_wavy_black.png">` },
      { id:'nh5', label:'Dalgalı Kızıl', isImg:true, src:'components/nisa_hair_wavy_copper.png', thumbFn:()=>`<img src="components/nisa_hair_wavy_copper.png">` },
    ],
    top: [
      { id:'nt1', label:'Prenses Balo Elbisesi', isImg:true, src:'components/nisa_dress_princess_pink.png', thumbFn:()=>`<img src="components/nisa_dress_princess_pink.png">` },
      { id:'nt2', label:'Kırmızı Gala Elbisesi', isImg:true, src:'components/nisa_dress_gala_red.png', thumbFn:()=>`<img src="components/nisa_dress_gala_red.png">` },
      { id:'nt3', label:'Zümrüt Gala Elbisesi', isImg:true, src:'components/nisa_dress_gala_emerald.png', thumbFn:()=>`<img src="components/nisa_dress_gala_emerald.png">` },
      { id:'nt4', label:'Lila Gala Elbisesi', isImg:true, src:'components/nisa_dress_gala_lilac.png', thumbFn:()=>`<img src="components/nisa_dress_gala_lilac.png">` },
      { id:'nt5', label:'Altın Gala Elbisesi', isImg:true, src:'components/nisa_dress_gala_gold.png', thumbFn:()=>`<img src="components/nisa_dress_gala_gold.png">` },
    ],
    bottom: [
      { id:'nb1', label:'Pembe Pileli Etek', isImg:true, src:'components/nisa_bottom_pink_pleated.png', thumbFn:()=>`<img src="components/nisa_bottom_pink_pleated.png">` },
      { id:'nb2', label:'Mavi Kot', isImg:true, src:'components/nisa_bottom_blue_jeans.png', thumbFn:()=>`<img src="components/nisa_bottom_blue_jeans.png">` },
      { id:'nb3', label:'Beyaz Pantolon', isImg:true, src:'components/nisa_bottom_white_trousers.png', thumbFn:()=>`<img src="components/nisa_bottom_white_trousers.png">` },
      { id:'nb4', label:'Siyah Deri Etek', isImg:true, src:'components/nisa_bottom_black_leather_skirt.png', thumbFn:()=>`<img src="components/nisa_bottom_black_leather_skirt.png">` },
      { id:'nb5', label:'Altın Parti Etek', isImg:true, src:'components/nisa_bottom_gold_party_skirt.png', thumbFn:()=>`<img src="components/nisa_bottom_gold_party_skirt.png">` },
    ],
    shoes: [
      { id:'ns1', label:'Pembe Babet', isImg:true, src:'components/nisa_shoes_heel_pink.png', thumbFn:()=>`<img src="components/nisa_shoes_heel_pink.png">` },
      { id:'ns2', label:'Kırmızı Babet', isImg:true, src:'components/nisa_shoes_heel_red.png', thumbFn:()=>`<img src="components/nisa_shoes_heel_red.png">` },
      { id:'ns3', label:'Beyaz Babet', isImg:true, src:'components/nisa_shoes_heel_white.png', thumbFn:()=>`<img src="components/nisa_shoes_heel_white.png">` },
      { id:'ns4', label:'Siyah Babet', isImg:true, src:'components/nisa_shoes_heel_black.png', thumbFn:()=>`<img src="components/nisa_shoes_heel_black.png">` },
      { id:'ns5', label:'Altın Babet', isImg:true, src:'components/nisa_shoes_heel_gold.png', thumbFn:()=>`<img src="components/nisa_shoes_heel_gold.png">` },
    ],
    makeup_lipstick: [
      { id:'n_lip1', label:'Diva Pembe', isImg:true, src:'components/nisa_makeup_lip_diva_pembe.png', thumbFn:()=>`<img src="components/nisa_makeup_lip_diva_pembe.png">` },
      { id:'n_lip2', label:'Kırmızı Ruby', isImg:true, src:'components/nisa_makeup_lip_kirmizi_ruby.png', thumbFn:()=>`<img src="components/nisa_makeup_lip_kirmizi_ruby.png">` },
      { id:'n_lip3', label:'Şeftali Nude', isImg:true, src:'components/nisa_makeup_lip_seftali_nude.png', thumbFn:()=>`<img src="components/nisa_makeup_lip_seftali_nude.png">` },
      { id:'n_lip4', label:'Mürdüm Mor', isImg:true, src:'components/nisa_makeup_lip_murdum_mor.png', thumbFn:()=>`<img src="components/nisa_makeup_lip_murdum_mor.png">` },
    ],
    makeup_eyeshadow: [
      { id:'n_eye1', label:'Altın Parıltı', isImg:true, src:'components/nisa_makeup_eyeshadow_altin.png', thumbFn:()=>`<img src="components/nisa_makeup_eyeshadow_altin.png">` },
      { id:'n_eye2', label:'Smoky Kömür', isImg:true, src:'components/nisa_makeup_eyeshadow_smoky.png', thumbFn:()=>`<img src="components/nisa_makeup_eyeshadow_smoky.png">` },
      { id:'n_eye3', label:'Romantik Pembe', isImg:true, src:'components/nisa_makeup_eyeshadow_pembe.png', thumbFn:()=>`<img src="components/nisa_makeup_eyeshadow_pembe.png">` },
    ],
    makeup_blush: [
      { id:'n_blush1', label:'Gül Kurusu', isImg:true, src:'components/nisa_makeup_blush_gulkurusu.png', thumbFn:()=>`<img src="components/nisa_makeup_blush_gulkurusu.png">` },
      { id:'n_blush2', label:'Taze Şeftali', isImg:true, src:'components/nisa_makeup_blush_seftali.png', thumbFn:()=>`<img src="components/nisa_makeup_blush_seftali.png">` },
    ],
    makeup_eyeliner: [
      { id:'n_liner1', label:'Siyah Kanat', isImg:true, src:'components/nisa_makeup_eyeliner_siyah.png', thumbFn:()=>`<img src="components/nisa_makeup_eyeliner_siyah.png">` },
    ],
    accessories: [
      { id:'na1', label:'Taç', isImg:true, src:'components/nisa_accessory_tiara.png', thumbFn:()=>`<img src="components/nisa_accessory_tiara.png">` },
      { id:'na2', label:'Kolye', isImg:true, src:'components/nisa_accessory_necklace.png', thumbFn:()=>`<img src="components/nisa_accessory_necklace.png">` },
      { id:'na3', label:'Güneş Gözlüğü', isImg:true, src:'components/nisa_accessory_sunglasses.png', thumbFn:()=>`<img src="components/nisa_accessory_sunglasses.png">` },
    ],
  },
  furkan: {
    hair: [
      { id:'fh1', label:'Taranmış Kahve', isImg:true, src:'components/furkan_hair_swept_brown.png', thumbFn:()=>`<img src="components/furkan_hair_swept_brown.png">` },
      { id:'fh2', label:'Taranmış Siyah', isImg:true, src:'components/furkan_hair_swept_black.png', thumbFn:()=>`<img src="components/furkan_hair_swept_black.png">` },
      { id:'fh3', label:'Taranmış Sarı', isImg:true, src:'components/furkan_hair_swept_blonde.png', thumbFn:()=>`<img src="components/furkan_hair_swept_blonde.png">` },
      { id:'fh4', label:'Taranmış Kızıl', isImg:true, src:'components/furkan_hair_swept_copper.png', thumbFn:()=>`<img src="components/furkan_hair_swept_copper.png">` },
      { id:'fh5', label:'Taranmış Küllü Kumral', isImg:true, src:'components/furkan_hair_swept_ash.png', thumbFn:()=>`<img src="components/furkan_hair_swept_ash.png">` },
    ],
    top: [
      { id:'ft1', label:'Lacivert Takım', isImg:true, src:'components/furkan_suit_navy.png', thumbFn:()=>`<img src="components/furkan_suit_navy.png">` },
      { id:'ft2', label:'Siyah Takım', isImg:true, src:'components/furkan_suit_black.png', thumbFn:()=>`<img src="components/furkan_suit_black.png">` },
      { id:'ft3', label:'Beyaz Gömlek & Kravat', isImg:true, src:'components/furkan_shirt_business.png', thumbFn:()=>`<img src="components/furkan_shirt_business.png">` },
      { id:'ft4', label:'Gri Takım', isImg:true, src:'components/furkan_suit_grey.png', thumbFn:()=>`<img src="components/furkan_suit_grey.png">` },
      { id:'ft5', label:'Turkuaz Blazer', isImg:true, src:'components/furkan_suit_teal.png', thumbFn:()=>`<img src="components/furkan_suit_teal.png">` },
    ],
    bottom: [
      { id:'fb1', label:'Lacivert Pantolon', isImg:true, src:'components/furkan_bottom_navy_trousers.png', thumbFn:()=>`<img src="components/furkan_bottom_navy_trousers.png">` },
      { id:'fb2', label:'Mavi Kot', isImg:true, src:'components/furkan_bottom_blue_jeans.png', thumbFn:()=>`<img src="components/furkan_bottom_blue_jeans.png">` },
      { id:'fb3', label:'Bej Chino', isImg:true, src:'components/furkan_bottom_beige_chino.png', thumbFn:()=>`<img src="components/furkan_bottom_beige_chino.png">` },
      { id:'fb4', label:'Siyah Jogger', isImg:true, src:'components/furkan_bottom_black_jogger.png', thumbFn:()=>`<img src="components/furkan_bottom_black_jogger.png">` },
      { id:'fb5', label:'Haki Şort', isImg:true, src:'components/furkan_bottom_khaki_shorts.png', thumbFn:()=>`<img src="components/furkan_bottom_khaki_shorts.png">` },
    ],
    shoes: [
      { id:'fs1', label:'Beyaz Sneaker', isImg:true, src:'components/furkan_shoes_sneaker_white.png', thumbFn:()=>`<img src="components/furkan_shoes_sneaker_white.png">` },
      { id:'fs2', label:'Kahve Oxford', isImg:true, src:'components/furkan_shoes_oxford_brown.png', thumbFn:()=>`<img src="components/furkan_shoes_oxford_brown.png">` },
      { id:'fs3', label:'Siyah Oxford', isImg:true, src:'components/furkan_shoes_oxford_black.png', thumbFn:()=>`<img src="components/furkan_shoes_oxford_black.png">` },
      { id:'fs4', label:'Mavi Sneaker', isImg:true, src:'components/furkan_shoes_sneaker_blue.png', thumbFn:()=>`<img src="components/furkan_shoes_sneaker_blue.png">` },
      { id:'fs5', label:'Kırmızı Sneaker', isImg:true, src:'components/furkan_shoes_sneaker_red.png', thumbFn:()=>`<img src="components/furkan_shoes_sneaker_red.png">` },
    ],
    makeup_blush: [
      { id:'fm1', label:'Doğal Allık', isImg:true, src:'components/furkan_makeup_blush_dogal.png', thumbFn:()=>`<img src="components/furkan_makeup_blush_dogal.png">` },
    ],
    accessories: [
      { id:'fa1', label:'Güneş Gözlüğü', isImg:true, src:'components/furkan_accessory_sunglasses.png', thumbFn:()=>`<img src="components/furkan_accessory_sunglasses.png">` },
      { id:'fa2', label:'Papyon', isImg:true, src:'components/furkan_accessory_bowtie.png', thumbFn:()=>`<img src="components/furkan_accessory_bowtie.png">` },
      { id:'fa3', label:'Saat', isImg:true, src:'components/furkan_accessory_watch.png', thumbFn:()=>`<img src="components/furkan_accessory_watch.png">` },
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
