/**
 * WEB MOCK of src/api/artists.ts — same export surface, fixture-backed.
 * Metro redirects this only for platform=web (screenshot harness).
 *
 * The fixture artist list mirrors the live pipeline output (real JioSaavn
 * artist-photo CDN URLs harvested from the production endpoints), so the
 * harness renders genuine portraits exactly like the device build.
 */

export interface ArtistInfo {
  name: string;
  id?: string;
  image?: string;
}

const art = (p: string) => `https://c.saavncdn.com/artists/${p}_500x500.jpg`;

export const ARTIST_SEEDS: ArtistInfo[] = [
  { name: 'Arijit Singh', id: '459320', image: art('Arijit_Singh_004_20241118063717') },
  { name: 'Diljit Dosanjh', id: '468245', image: art('Diljit_Dosanjh_005_20231025073054') },
  { name: 'AP Dhillon', id: '681966', image: art('AP_Dhillon_004_20251023102150') },
  { name: 'Shreya Ghoshal', id: '455130', image: art('Shreya_Ghoshal_007_20241101074144') },
  { name: 'Pritam', id: '456323', image: art('Pritam_Chakraborty-20170711073326') },
  { name: 'Badshah', id: '456863', image: art('Badshah_006_20241118064015') },
  { name: 'A.R. Rahman', id: '456269', image: art('AR_Rahman_002_20210120084455') },
  { name: 'Karan Aujla', id: '697691', image: art('Karan_Aujla_004_20260810121947') },
  { name: 'Sonu Nigam', id: '455125', image: art('Sonu_Nigam_003_20260813182013') },
  { name: 'Neha Kakkar', id: '464932', image: art('Neha_Kakkar_007_20241212115832') },
  { name: 'Shubh', id: '14087974', image: art('Shubh_000_20220921112507') },
  { name: 'DIVINE', id: '653605', image: art('DIVINE_006_20250911071442') },
  { name: 'Tanishk Bagchi', id: '1595701', image: art('Tanishk_Bagchi_003_20260106115039') },
  { name: 'Jubin Nautiyal', id: '881158', image: art('Jubin_Nautiyal_003_20231130204020') },
  { name: 'KK', id: '455782', image: art('KK') },
  { name: 'Sidhu Moose Wala', id: '3319750', image: art('Sidhu_Moose_Wala_004_20250617183705') },
  { name: 'Guru Randhawa', id: '712878', image: art('Guru_Randhawa_004_20250701125845') },
  { name: 'Yo Yo Honey Singh', id: '485956', image: art('Yo_Yo_Honey_Singh_004_20260811095253') },
  { name: 'Raftaar', id: '458918', image: art('Raftaar_009_20230223100912') },
  { name: 'Mohit Chauhan', id: '455124', image: art('Mohit_Chauhan') },
  { name: 'Armaan Malik', id: '464656', image: art('Armaan_Malik_006_20260813132832') },
  { name: 'Darshan Raval', id: '888127', image: art('Darshan_Raval_006_20250807060352') },
  { name: 'Amit Trivedi', id: '457422', image: art('Amit_Trivedi_007_20241118063149') },
  { name: 'Anuv Jain', id: '4878402', image: art('Anuv_Jain_001_20231206073013') },
  { name: 'Prateek Kuhad', id: '1546334', image: art('Prateek_Kuhad_006_20260515064251') },
  { name: 'Ritviz', id: '1970745', image: art('Ritviz') },
  { name: 'Jasleen Royal', id: '742789', image: art('Jasleen_Royal_002_20230615091108') },
  { name: 'B Praak', id: '788130', image: art('B_Praak_001_20191118112005') },
  { name: 'Sachet-Parampara', id: '3623112', image: art('Sachet-Parampara_20190221095720') },
  { name: 'Vishal & Shekhar', id: '459880', image: art('Vishal-Shekhar_20191130071357') },
  { name: 'Shankar Mahadevan', id: '455275', image: art('Shankar_Mahadevan') },
  { name: 'Udit Narayan', id: '455127', image: art('Udit_Narayan_004_20241029065120') },
  { name: 'Kishore Kumar', id: '455144', image: art('Kishore_Kumar') },
  { name: 'Lata Mangeshkar', id: '455109', image: art('Lata_Mangeshkar_004_20230623105323') },
  { name: 'Asha Bhosle', id: '455166', image: art('Asha_Bhosle_002_20200212082318') },
  { name: 'Alka Yagnik', id: '455120', image: art('Alka_Yagnik_002_20220314192930') },
  { name: 'Kumar Sanu', id: '455142', image: art('Kumar_Sanu') },
  { name: 'Hariharan', id: '455162', image: art('Hariharan') },
  { name: 'Sunidhi Chauhan', id: '455129', image: art('Sunidhi_Chauhan_005_20250515061617') },
  { name: 'Mithoon', id: '702592', image: art('Mithoon_002_20200908073735') },
  { name: 'Pawan Singh', id: '456857', image: art('Pawan_Singh_003_20241119074737') },
  { name: 'Neeti Mohan', id: '531639', image: art('Neeti_Mohan_009_20260821092757') },
  { name: 'Shankar-Ehsaan-Loy', id: '455280', image: art('Shankar_Ehsaan_Loy_002_20231107064353') },
  { name: 'Anu Malik', id: '456338', image: art('Anu_Malik') },
  { name: 'Amaal Mallik', id: '743637', image: art('Amaal_Mallik_004_20260224065851') },
  { name: 'Ravi Basrur', id: '697634', image: art('Ravi_Basrur_002_20221011072518') },
  { name: 'Shreyas Puranik', id: '820935', image: art('Shreyas_Puranik_000_20211202121951') },
];

/** Extra pool for the live-category cycle (mirrors live-pipeline output). */
const EXTRA_POOL: ArtistInfo[] = [
  { name: 'Mithoon', id: '702592', image: art('Mithoon_002_20200908073735') },
  { name: 'Shashwat Sachdev', id: '2880232', image: art('Shashwat_Sachdev_000_20221011114409') },
  { name: 'The Rish', id: '4838573', image: art('The_Rish_000_20230503074444') },
  { name: 'Cheema Y', id: '8758099', image: art('Cheema_Y_001_20241006181534') },
  { name: 'Navaan Sandhu', id: '5205482', image: art('Navaan_Sandhu_000_20240422092254') },
  { name: 'Jasmine Sandlas', id: '489363', image: art('Jasmine_Sandlas_002_20240314115630') },
  { name: 'PARESH PAHUJA', id: '7618889', image: art('PARESH_PAHUJA_000_20251107072600') },
  { name: 'Josh Brar', id: '12554577', image: art('Josh_Brar_000_20250527084525') },
  { name: 'Aastha Gill', id: '704354', image: art('Aastha_Gill_006_20191029064104') },
  { name: 'Deva', id: '455219', image: art('Deva_20190801133857') },
  { name: 'Amit Kumar', id: '455121', image: art('Amit_Kumar') },
  { name: 'Karma', id: '19446068', image: art('Karma_000_20240429065355') },
  { name: 'Aditya Iyengar', id: '1575749', image: art('Aditya_Iyengar_002_20230130082828') },
  { name: 'Anand Bhaskar', id: '1626009', image: art('Anand_Bhaskar_002_20220228110032') },
  { name: 'Aniket Raturi', id: '6600002', image: art('Aniket_Raturi_000_20230503075404') },
  { name: 'Irshad Kamil', id: '456259', image: art('Irshad_Kamil_002_20260106115201') },
];

export const ARTIST_CATEGORIES: Array<{ key: string; label: string; query: string }> = [
  { key: 'bollywood', label: 'Bollywood', query: 'top hindi hits' },
  { key: 'punjabi', label: 'Punjabi', query: 'punjabi hits' },
  { key: 'hiphop', label: 'Hip-Hop', query: 'hindi rap gana' },
  { key: 'romance', label: 'Romance', query: 'romantic hindi songs' },
  { key: 'indie', label: 'Indie', query: 'indie india songs' },
  { key: 'sufi', label: 'Sufi', query: 'sufi songs' },
  { key: 'retro', label: 'Retro', query: 'old hindi songs' },
  { key: 'pop', label: 'Pop', query: 'indian pop hits' },
];

export function sanitizeArtistImage(url?: string): string {
  if (!url) return '';
  if (!url.includes('/artists/')) return '';
  return url.replace('150x150', '500x500').replace('50x50', '500x500');
}

export function cleanArtistName(raw: string): string {
  const a = raw
    .split(' feat')[0]!
    .split(' ft.')[0]!
    .split(',')[0]!
    .trim();
  if (!a || a === 'Unknown artist' || a.length > 26) return '';
  return a;
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const ALL = [...ARTIST_SEEDS, ...EXTRA_POOL];

export async function searchSaavnArtists(query: string, limit = 24): Promise<ArtistInfo[]> {
  await delay(150);
  const q = norm(query);
  const byName = ALL.filter((a) => norm(a.name).includes(q) && q.length >= 2);
  if (byName.length) return byName.slice(0, limit);
  // category queries → deterministic rotation of the extra pool
  const catIdx = ARTIST_CATEGORIES.findIndex((c) => norm(c.query) === q || norm(c.label) === q);
  if (catIdx >= 0) {
    const rot = EXTRA_POOL.slice(catIdx).concat(EXTRA_POOL.slice(0, catIdx));
    const seen = new Set<string>();
    return rot.filter((a) => (seen.has(a.name) ? false : (seen.add(a.name), true))).slice(0, limit);
  }
  return [];
}

export async function getArtistPhoto(artistId?: string): Promise<string> {
  if (!artistId) return '';
  await delay(80);
  return ALL.find((a) => a.id === artistId)?.image ?? '';
}

export async function lookupArtistPhoto(name: string): Promise<string> {
  await delay(80);
  const seed = ARTIST_SEEDS.find((a) => norm(a.name) === norm(name));
  if (seed?.image) return seed.image;
  return EXTRA_POOL.find((a) => norm(a.name) === norm(name))?.image ?? '';
}
