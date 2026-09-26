export interface Pengurus {
  nama: string;
  jabatan: string;
}

export interface Program {
  nama: string;
  deskripsi: string;
  bagian: string[];
}

export interface Yayasan {
  nama: string;
  logo: string;
  program: Program;
}

export const pengurusData: Pengurus[] = [
  { nama: 'Ilham', jabatan: 'Ketua' },
  { nama: 'Anton Trisnanda', jabatan: 'Wakil Ketua' },
  { nama: 'Andi Rahmat', jabatan: 'Penanggung Jawab' },
  { nama: 'Firdaus', jabatan: 'Operator Media' },
];

export const kontributorData: string[] = [
  'Aris',
  'Arif',
  'Piter',
  'Randy',
  'Ikhsan',
  'Badri',
];

export const yayasanData: Yayasan[] = [
  {
    nama: 'Yayasan Ibnu Abbas Tanah Bumbu',
    logo: '/yayasan-ibnu-abbas.png',
    program: {
      nama: 'Media Tanah Bumbu Mengaji',
      deskripsi: 'Platform Dakwah Digital',
      bagian: ['Ruang Ibrah Borneo', 'Publikasi & Sosmed'],
    },
  },
  {
    nama: 'Yayasan Tambang Ilmu Hasanah',
    logo: '/yayasan-tambang-ilmu.png',
    program: {
      nama: 'Kaifa Rumah Belajar',
      deskripsi: 'Program Edukasi & Belajar',
      bagian: ['Komunitas Belajar', 'Tahfidz & Pembinaan'],
    },
  },
];
