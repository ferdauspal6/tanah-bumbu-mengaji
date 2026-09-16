-- Seed: settings
INSERT INTO settings (key, value) VALUES
  ('mosque_name', 'Musholla Ibnu Abbas'),
  ('location_name', 'Tanah Bumbu · Kalimantan Selatan'),
  ('lat', '-3.4553'),
  ('lng', '115.9750'),
  ('timezone', 'Asia/Makassar'),
  ('marquee_text', '▶ INFAQ & SEDEKAH: BSI (451) 7300984449 a.n. Tanah Bumbu Mengaji   ▶ INFAQ OPERASIONAL MUSHOLLA IBNU ABBAS: BSI (451) 7958351940 a.n. Yayasan Ibnu Abbas Batulicin   ▶ INFAQ RUMAH ASATIDZ (TAHAP 1): BSI (451) 8225299940 a.n. Yayasan Ibnu Abbas Batulicin   ▶ Konfirmasi & Informasi Donasi — Ikhwan: 0811-5009-929 (Bpk. Andi) · Akhwat: 0823-5110-0088 (Ummu Rafa)');

-- Seed: posters
INSERT INTO posters (img_url, caption, sort_order) VALUES
  ('https://drive.google.com/thumbnail?id=17QqbRKEVNgK2N9rsOZ7Vjetk-LFF1FbX&sz=w1000', 'Poster 1', 0),
  ('https://drive.google.com/thumbnail?id=1etguyInjbklidhLepJKi-etdDBFEyj6_&sz=w1000', 'Poster 2', 1),
  ('https://drive.google.com/thumbnail?id=1qBRy5NYPhNYsq2xSJnqAhIM6imRfZ4y3&sz=w1000', 'Poster 3', 2);

-- Seed: donations
INSERT INTO donations (title, target, collected, sort_order) VALUES
  ('Infaq & Sedekah (Tanah Bumbu Mengaji)', 60000000, 32450000, 0),
  ('Infaq Operasional Musholla Ibnu Abbas', 6000000, 4750000, 1),
  ('Infaq Rumah Asatidz (Tahap 1)', 85000000, 16262443, 2);
