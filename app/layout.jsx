  import './globals.css';

export const metadata = {
  title: 'Choizo — Your Personal AI Shopping Agent',
  description: 'Stop overpaying. Start saving. Upload a photo, find the lowest prices, and get instant discount links via WhatsApp.',
  keywords: 'AI shopping, price comparison, virtual fitting room, discount finder, WhatsApp deals',
  openGraph: {
    title: 'Choizo — AI Shopping Agent',
    description: 'Stop overpaying. Start saving. The future of AI shopping is here.',
    type: 'website',
  },
  themeColor: '#25D366',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
