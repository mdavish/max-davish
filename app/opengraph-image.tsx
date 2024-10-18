import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Max Davish - Personal Website';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const interRegular = fetch(
    new URL('@/public/Inter-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const interSemiBold = fetch(
    new URL('@/public/Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const myPhoto = fetch(
    new URL('@/public/headshot.jpeg', import.meta.url)
  ).then((res) => res.arrayBuffer());

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            // @ts-ignore
            src={await myPhoto}
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
              color: '#0f172a', // slate-900
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
          data: await interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
