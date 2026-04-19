import Image from 'next/image';
import {
  movies,
  albums,
  books,
  imagePath,
  type Category,
} from '@/data/favorites';

export const metadata = {
  title: 'Favorites — Max Davish',
  description: 'Some of my favorite movies, albums, and books.',
};

type Tile = {
  src: string;
  title: string;
  subtitle: string;
};

const movieTiles: Tile[] = movies.map((m) => ({
  src: imagePath('movies', m.title),
  title: m.title,
  subtitle: String(m.year),
}));

const albumTiles: Tile[] = albums.map((a) => ({
  src: imagePath('albums', a.title),
  title: a.title,
  subtitle: a.artist,
}));

const bookTiles: Tile[] = books.map((b) => ({
  src: imagePath('books', b.title),
  title: b.title,
  subtitle: b.author,
}));

export default function FavoritesPage() {
  return (
    <div className="w-full flex flex-col gap-y-10">
      <header className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-medium text-slate-800">Favorites</h1>
        <p className="text-slate-600">
          Some movies, albums, and books I come back to.
        </p>
      </header>

      <Grid title="Movies" category="movies" tiles={movieTiles} aspect="aspect-[2/3]" />
      <Grid title="Albums" category="albums" tiles={albumTiles} aspect="aspect-square" />
      <Grid title="Books" category="books" tiles={bookTiles} aspect="aspect-[2/3]" />
    </div>
  );
}

function Grid({
  title,
  category,
  tiles,
  aspect,
}: {
  title: string;
  category: Category;
  tiles: Tile[];
  aspect: string;
}) {
  return (
    <section className="flex flex-col gap-y-4">
      <h2 className="text-xl text-slate-800 font-medium">{title}</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {tiles.map((tile) => (
          <Poster key={`${category}-${tile.title}`} tile={tile} aspect={aspect} />
        ))}
      </div>
    </section>
  );
}

function Poster({ tile, aspect }: { tile: Tile; aspect: string }) {
  return (
    <div
      className={`group relative ${aspect} overflow-hidden rounded-md bg-slate-100 shadow-sm hover:shadow-lg transition-shadow`}
    >
      <Image
        src={tile.src}
        alt={`${tile.title} — ${tile.subtitle}`}
        fill
        sizes="(max-width: 768px) 33vw, 20vw"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <p className="text-white text-sm font-medium leading-tight">
          {tile.title}
        </p>
        <p className="text-white/80 text-xs mt-0.5">{tile.subtitle}</p>
      </div>
    </div>
  );
}
