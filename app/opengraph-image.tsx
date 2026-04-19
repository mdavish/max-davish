import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import path from 'path';

export const alt = 'Max Davish - Personal Website';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const [interSemiBold, headshotBuffer] = await Promise.all([
    readFile(path.join(process.cwd(), 'public', 'Inter-SemiBold.ttf')),
    readFile(path.join(process.cwd(), 'public', 'headshot.jpeg')),
  ]);

  const headshotSrc = `data:image/jpeg;base64,${headshotBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: next/og requires plain img elements */}
          <img
            src={headshotSrc}
            alt=""
            width={200}
            height={200}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              fontSize: '64px',
              fontWeight: 600,
              color: '#0f172a',
            }}
          >
            Max Davish
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
      ],
    },
  );
}
