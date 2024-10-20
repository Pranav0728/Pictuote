import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/Home_Pages/Footer";
import Container from "@/components/Home_Pages/Container";
import HomeHeader from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pictuote - Generate post Automatically",
  description: "Generate post Automatically",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9323981475219069"
          crossorigin="anonymous"
        ></script>
        <meta
          name="google-site-verification"
          content="3QBty7Cmfr6dR3bzPznw66C3867NrNLplv1bXQVRg1c"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HomeHeader />
          <Container>{children}</Container>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
