import type { Metadata, Viewport } from 'next';
import { Martian_Mono, Schibsted_Grotesk } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Header from '@/components/Header';
import Reveal from '@/components/Reveal';

const display = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--nf-display',
});
// the wdth axis is needed for font-stretch: 88%
const mono = Martian_Mono({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--nf-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://my-portfolio-sigma-tan-63.vercel.app'),
  title: 'Jesus Gonzalez | Software Engineer Intern Portfolio',
  description:
    'Full-stack and systems engineer building across web, embedded, and graphics. Computer science at UCF, expected July 2028.',
  openGraph: {
    title: 'Jesus Gonzalez | Software Engineer Intern Portfolio',
    description:
      'Full-stack and systems engineer building across web, embedded, and graphics.',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#2f3e46' };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${mono.variable}`}
    >
      <head>
        {/* Gate the .rv hide state on JS so content stays visible without it */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          themes={['dark', 'light']}
          storageKey="jg-theme"
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="absolute top-[-60px] left-[var(--gutter)] z-30 bg-fg px-3.5 py-2.5 mono text-[.8125rem] text-bg focus:top-2"
          >
            Skip to content
          </a>
          <Header />
          {children}
          <footer className="border-t border-line pt-7 pb-10">
            <div className="wrap flex flex-wrap justify-between gap-3 label">
              <span>&copy; 2026 Jesus Gonzalez</span>
              <a href="#main" className="underline underline-offset-4">
                Back to top
              </a>
            </div>
          </footer>
          <Reveal />
        </ThemeProvider>
      </body>
    </html>
  );
}
