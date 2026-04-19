import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';
import { getBlogPost } from '@/utils/files';

export const alt = 'Max Davish Blog';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  const [interSemiBold, interRegular] = await Promise.all([
    fetch(new URL('@/public/Inter-SemiBold.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(new URL('@/public/Inter-Regular.ttf', import.meta.url)).then((res) =>
      res.arrayBuffer(),
    ),
  ]);

  let imageSrc: string | null = null;
  if (post.image) {
    const imagePath = path.join(process.cwd(), 'public', post.image);
    const buffer = await readFile(imagePath);
    const mimeType =
      post.image.endsWith('.jpg') || post.image.endsWith('.jpeg')
        ? 'image/jpeg'
        : post.image.endsWith('.webp')
        ? 'image/webp'
        : 'image/png';
    imageSrc = `data:${mimeType};base64,${buffer.toString('base64')}`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0f172a',
          fontFamily: 'Inter',
        }}
      >
        {imageSrc && (
          // biome-ignore lint/performance/noImgElement: next/og requires plain img elements
          <img
            src={imageSrc}
            alt=""
            width={1200}
            height={630}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '72px',
          }}
        >
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.75)',
              fontSize: '28px',
              fontWeight: 400,
              marginBottom: '20px',
              letterSpacing: '0.02em',
            }}
          >
            Max Davish
          </div>
          <div
            style={{
              color: 'white',
              fontSize: '72px',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            {post.title}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 600,
        },
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
