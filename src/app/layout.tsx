import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Improves font loading performance
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Voice Buddy - AI Voice Assistant",
    template: "%s | Voice Buddy",
  },
  description:
    "A powerful AI voice assistant that responds to your voice commands with intelligent conversations and helpful responses.",
  keywords: [
    "voice assistant",
    "AI",
    "speech recognition",
    "voice commands",
    "artificial intelligence",
    "voice chat",
  ],
  authors: [{ name: "Voice Buddy Team" }],
  creator: "Voice Buddy",
  publisher: "Voice Buddy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Voice Buddy - AI Voice Assistant",
    description:
      "A powerful AI voice assistant that responds to your voice commands with intelligent conversations and helpful responses.",
    siteName: "Voice Buddy",
    images: [
      {
        url: "/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "Voice Buddy - AI Voice Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voice Buddy - AI Voice Assistant",
    description:
      "A powerful AI voice assistant that responds to your voice commands with intelligent conversations and helpful responses.",
    images: ["/og-image.png"],
    creator: "@voicebuddy", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow some zoom for accessibility
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark light",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning // Only for the html tag to prevent theme flash
    >
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* DNS prefetch for external APIs */}
        <link rel="dns-prefetch" href="https://api.together.xyz" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>

        {/* Main content wrapper */}
        <div id="main-content" className="relative">
          {children}
        </div>

        {/* Toast notifications */}
        <Toaster
          richColors
          position="top-center"
          expand={true}
          duration={4000}
          closeButton={true}
          toastOptions={{
            className: "text-sm",
            style: {
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />

        {/* Loading indicator for better UX */}
        <div
          id="loading-indicator"
          className="fixed top-0 left-0 w-full h-1 bg-primary opacity-0 transition-opacity duration-300 z-50"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
        />

        {/* Service worker registration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('SW registered: ', registration);
                  }).catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
