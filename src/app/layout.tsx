import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Digital Companion - Government Services Made Simple",
    template: "%s | Digital Companion",
  },
  description:
    "Break language barriers and access government welfare schemes effortlessly. Voice-first AI companion helping citizens navigate benefits, applications, and services in their native language.",
  keywords: [
    "government services",
    "welfare schemes",
    "voice assistant",
    "multilingual support",
    "digital inclusion",
    "accessibility",
    "Hindi",
    "Punjabi",
    "Bengali",
    "Tamil",
    "Aadhaar",
    "ration card",
    "pension schemes",
    "housing schemes",
    "rural services",
    "citizen services",
  ],
  authors: [{ name: "Digital Companion Team" }],
  creator: "Digital Companion",
  publisher: "Digital Companion Initiative",
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
    title: "Digital Companion - Government Services Made Simple",
    description:
      "Voice-first AI companion helping citizens access welfare schemes and government services in their native language. No forms, no travel, no confusion.",
    siteName: "Digital Companion",
    images: [
      {
        url: "/voice-buddy-illustration.png",
        width: 1200,
        height: 630,
        alt: "Digital Companion - Accessible Government Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Companion - Government Services Made Simple",
    description:
      "Voice-first AI companion helping citizens access welfare schemes in their native language. Designed for everyone, everywhere.",
    images: ["/voice-buddy-illustration.png"],
    creator: "@digitalcompanion",
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
    // Add verification codes when ready for production
    // google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  colorScheme: "dark light",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* App icons and favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* DNS prefetch for potential API endpoints */}
        <link rel="dns-prefetch" href="https://api.openai.com" />

        {/* Security and privacy headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
        <meta httpEquiv="X-Frame-Options" content="DENY" />

        {/* Language and cultural meta tags */}
        <meta name="language" content="English,Hindi,Punjabi,Bengali,Tamil" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.country" content="India" />

        {/* Accessibility improvements */}
        <meta name="theme-color" content="#10b981" />
        <meta name="msapplication-TileColor" content="#10b981" />

        {/* Social impact and purpose */}
        <meta property="article:section" content="Social Impact" />
        <meta property="article:tag" content="Digital Inclusion" />
        <meta property="article:tag" content="Government Services" />
        <meta property="article:tag" content="Voice Technology" />
      </head>

      <body className="antialiased min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Skip navigation for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50 font-medium shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        {/* Language switcher for screen readers */}
        <div className="sr-only" aria-live="polite" id="language-announcer">
          Digital Companion supports multiple languages including Hindi,
          Punjabi, Bengali, and Tamil
        </div>

        {/* Main application container */}
        <div id="main-content" className="relative min-h-screen">
          {children}
        </div>

        {/* Emergency contact info (hidden but accessible) */}
        <div className="sr-only">
          <p>For emergency government services, call: 1800-XXX-XXXX</p>
          <p>Digital Companion helpline: 1800-XXX-YYYY</p>
        </div>

        {/* Loading indicator */}
        <div
          id="loading-indicator"
          className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 opacity-0 transition-all duration-300 z-50"
          style={{ transform: "scaleX(0)", transformOrigin: "left" }}
          role="progressbar"
          aria-label="Page loading"
        />

        {/* Voice accessibility announcement */}
        <div className="sr-only" aria-live="polite" id="voice-status">
          Voice assistance is available on this page
        </div>
      </body>
    </html>
  );
}
