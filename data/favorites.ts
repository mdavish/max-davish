export type Category = 'movies' | 'albums' | 'books';

export type Movie = {
  title: string;
  year: number;
};

export type Album = {
  title: string;
  artist: string;
};

export type Book = {
  title: string;
  author: string;
};

export const movies: Movie[] = [
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Casablanca', year: 1942 },
  { title: 'No Country for Old Men', year: 2007 },
  { title: 'The Empire Strikes Back', year: 1980 },
  { title: 'The Big Lebowski', year: 1998 },
  { title: 'Sicario', year: 2015 },
];

export const albums: Album[] = [
  { title: 'My Beautiful Dark Twisted Fantasy', artist: 'Kanye West' },
  { title: 'Channel Orange', artist: 'Frank Ocean' },
  { title: 'Discovery', artist: 'Daft Punk' },
  { title: 'The College Dropout', artist: 'Kanye West' },
  { title: 'Blonde', artist: 'Frank Ocean' },
  { title: 'Random Access Memories', artist: 'Daft Punk' },
  { title: 'Born to Run', artist: 'Bruce Springsteen' },
  { title: 'good kid, m.A.A.d city', artist: 'Kendrick Lamar' },
  { title: 'Rumours', artist: 'Fleetwood Mac' },
  { title: 'Take Care', artist: 'Drake' },
];

export const books: Book[] = [
  { title: 'Stoner', author: 'John Williams' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { title: 'Endurance', author: 'Alfred Lansing' },
  { title: 'Atonement', author: 'Ian McEwan' },
  { title: 'Steve Jobs', author: 'Walter Isaacson' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman' },
  { title: 'The Lessons of History', author: 'Will Durant' },
  { title: 'Great Expectations', author: 'Charles Dickens' },
  { title: 'Coming Apart', author: 'Charles Murray' },
  { title: 'The Innovators', author: 'Walter Isaacson' },
];

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function imagePath(category: Category, title: string): string {
  return `/favorites/${category}/${slugify(title)}.jpg`;
}
