import fs from 'fs/promises';
import path from 'path';
import {
  movies,
  albums,
  books,
  slugify,
  type Category,
} from '../data/favorites';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public', 'favorites');
const USER_AGENT = 'max-davish-favorites/1.0 ( max@getquotient.ai )';

async function loadDotenvLocal(): Promise<void> {
  try {
    const raw = await fs.readFile(path.resolve(process.cwd(), '.env.local'), 'utf-8');
    for (const line of raw.split('\n')) {
      const match = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      const value = rawValue.replace(/^["']|["']$/g, '');
      if (process.env[key] === undefined) process.env[key] = value;
    }
  } catch {
    // no .env.local, fine
  }
}

async function ensureDir(dir: string): Promise<void> {
  await fs.mkdir(dir, { recursive: true });
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function download(
  url: string,
  dest: string,
  headers: Record<string, string> = {},
): Promise<void> {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, ...headers },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function fetchBookCover(
  title: string,
  author: string,
): Promise<string | null> {
  const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(
    title,
  )}&author=${encodeURIComponent(author)}&limit=1`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`Open Library HTTP ${res.status}`);
  const data = (await res.json()) as { docs?: Array<{ cover_i?: number }> };
  const coverId = data.docs?.[0]?.cover_i;
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
}

async function fetchAlbumCover(
  title: string,
  artist: string,
): Promise<string | null> {
  const query = `artist:"${artist}" AND releasegroup:"${title}"`;
  const url = `https://musicbrainz.org/ws/2/release-group?query=${encodeURIComponent(
    query,
  )}&fmt=json&limit=1`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) throw new Error(`MusicBrainz HTTP ${res.status}`);
  const data = (await res.json()) as {
    'release-groups'?: Array<{ id: string }>;
  };
  const mbid = data['release-groups']?.[0]?.id;
  if (!mbid) return null;
  return `https://coverartarchive.org/release-group/${mbid}/front-500`;
}

async function wikipediaInfoboxWikitext(title: string): Promise<string | null> {
  const params = new URLSearchParams({
    action: 'parse',
    page: title,
    prop: 'wikitext',
    section: '0',
    redirects: '1',
    format: 'json',
  });
  const url = `https://en.wikipedia.org/w/api.php?${params.toString()}`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    parse?: { wikitext?: { '*': string } };
    error?: { code?: string };
  };
  if (data.error) return null;
  return data.parse?.wikitext?.['*'] ?? null;
}

async function wikipediaFileUrl(fileName: string): Promise<string | null> {
  const params = new URLSearchParams({
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url',
    iiurlwidth: '1000',
    format: 'json',
    formatversion: '2',
  });
  const url = `https://en.wikipedia.org/w/api.php?${params.toString()}`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    query?: {
      pages?: Array<{
        imageinfo?: Array<{ url?: string; thumburl?: string }>;
      }>;
    };
  };
  const info = data.query?.pages?.[0]?.imageinfo?.[0];
  return info?.thumburl ?? info?.url ?? null;
}

async function fetchMoviePoster(
  title: string,
  year: number,
): Promise<string | null> {
  const candidates = [
    `${title} (${year} film)`,
    `${title} (film)`,
    title,
  ];
  for (const candidate of candidates) {
    const wikitext = await wikipediaInfoboxWikitext(candidate);
    if (!wikitext) continue;
    const match = wikitext.match(/\n\s*\|\s*image\s*=\s*([^\n|}]+)/i);
    if (!match) continue;
    const fileName = match[1].trim().replace(/^File:/i, '');
    if (!fileName) continue;
    const url = await wikipediaFileUrl(fileName);
    if (url) return url;
  }
  return null;
}

async function processCategory<T>(
  category: Category,
  items: T[],
  getTitle: (item: T) => string,
  lookup: (item: T) => Promise<string | null>,
  throttleMs: number,
): Promise<{ ok: number; skipped: number; missed: string[]; errors: string[] }> {
  const dir = path.join(PUBLIC_DIR, category);
  await ensureDir(dir);

  let ok = 0;
  let skipped = 0;
  const missed: string[] = [];
  const errors: string[] = [];

  for (const item of items) {
    const title = getTitle(item);
    const slug = slugify(title);
    const dest = path.join(dir, `${slug}.jpg`);

    if (await fileExists(dest)) {
      console.log(`  skip  ${category}/${slug}.jpg`);
      skipped++;
      continue;
    }

    try {
      const url = await lookup(item);
      if (!url) {
        console.log(`  miss  ${category}/${slug} (no match)`);
        missed.push(title);
        continue;
      }
      await download(url, dest);
      console.log(`  ok    ${category}/${slug}.jpg`);
      ok++;
    } catch (err) {
      const msg = (err as Error).message;
      console.log(`  err   ${category}/${slug}: ${msg}`);
      errors.push(`${title}: ${msg}`);
    }

    if (throttleMs > 0) {
      await new Promise((r) => setTimeout(r, throttleMs));
    }
  }

  return { ok, skipped, missed, errors };
}

async function main(): Promise<void> {
  await loadDotenvLocal();
  await ensureDir(PUBLIC_DIR);

  console.log('Books (Open Library)');
  const bookResult = await processCategory(
    'books',
    books,
    (b) => b.title,
    (b) => fetchBookCover(b.title, b.author),
    200,
  );

  console.log('\nAlbums (Cover Art Archive)');
  const albumResult = await processCategory(
    'albums',
    albums,
    (a) => a.title,
    (a) => fetchAlbumCover(a.title, a.artist),
    1100, // MusicBrainz asks for <=1 req/sec
  );

  console.log('\nMovies (Wikipedia)');
  const movieResult = await processCategory(
    'movies',
    movies,
    (m) => m.title,
    (m) => fetchMoviePoster(m.title, m.year),
    200,
  );

  const summary = [bookResult, albumResult, movieResult];
  const totalOk = summary.reduce((n, r) => n + r.ok, 0);
  const totalSkipped = summary.reduce((n, r) => n + r.skipped, 0);
  const allMissed = summary.flatMap((r) => r.missed);
  const allErrors = summary.flatMap((r) => r.errors);

  console.log('\n---');
  console.log(`downloaded: ${totalOk}  skipped: ${totalSkipped}  missed: ${allMissed.length}  errors: ${allErrors.length}`);
  if (allMissed.length) {
    console.log('\nNo match:');
    for (const title of allMissed) console.log(`  - ${title}`);
  }
  if (allErrors.length) {
    console.log('\nErrors:');
    for (const e of allErrors) console.log(`  - ${e}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
