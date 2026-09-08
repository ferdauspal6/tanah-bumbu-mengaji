export interface Kajian {
  id: number;
  judul: string;
  pemateri: string;
  tanggal: string;
  waktu: string;
  lokasi: string;
  badge?: string;
  kategori: string;
}

export const kajianData: Kajian[] = [
  {
    id: 1,
    judul: 'Hikmah Puasa Arafah',
    pemateri: 'Ustadz Ahmad',
    tanggal: '15 Juni 2026',
    waktu: '19:30 WITA',
    lokasi: 'Masjid Al-Hikmah',
    badge: 'LIVE',
    kategori: 'Kajian Rutin',
  },
  {
    id: 2,
    judul: 'Fiqh Muamalah Modern',
    pemateri: 'Ustadz Fadil',
    tanggal: '17 Juni 2026',
    waktu: '20:00 WITA',
    lokasi: 'Masjid Al-Hikmah',
    kategori: 'Kajian Rutin',
  },
  {
    id: 3,
    judul: 'Tafsir Juz Amma',
    pemateri: 'Ustadz Hanif',
    tanggal: '20 Juni 2026',
    waktu: '19:30 WITA',
    lokasi: 'Online via Zoom',
    badge: 'LIVE',
    kategori: 'Livestreaming',
  },
  {
    id: 4,
    judul: 'Adab Menuntut Ilmu',
    pemateri: 'Ustadz Ahmad',
    tanggal: '22 Juni 2026',
    waktu: '09:00 WITA',
    lokasi: 'Masjid Al-Hikmah',
    kategori: 'Kajian Rutin',
  },
  {
    id: 5,
    judul: 'Kajian Tematik: Menyambut Ramadhan',
    pemateri: 'Ustadz Fadil',
    tanggal: '25 Juni 2026',
    waktu: '20:00 WITA',
    lokasi: 'Masjid Al-Hikmah',
    kategori: 'Kajian Rutin',
  },
  {
    id: 6,
    judul: 'Livestream: Tafsir Al-Mulk',
    pemateri: 'Ustadz Hanif',
    tanggal: '28 Juni 2026',
    waktu: '20:30 WITA',
    lokasi: 'YouTube Live',
    badge: 'LIVE',
    kategori: 'Livestreaming',
  },
  {
    id: 7,
    judul: 'Workshop: Membaca Al-Quran',
    pemateri: 'Ustadz Ahmad',
    tanggal: '1 Juli 2026',
    waktu: '08:00 WITA',
    lokasi: 'Aula Masjid Al-Hikmah',
    kategori: 'Dokumentasi',
  },
  {
    id: 8,
    judul: 'Dakwah Keliling',
    pemateri: 'Ustadz Fadil',
    tanggal: '3 Juli 2026',
    waktu: '16:00 WITA',
    lokasi: 'Berbagai Lokasi',
    kategori: 'Dokumentasi',
  },
];
