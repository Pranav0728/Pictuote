import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/Home_Pages/Footer";
import Container from "@/components/Home_Pages/Container";
import HomeHeader from "@/components/Header";
import Script from "next/script"; // Import Script from next/script

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
  title: "Pictuote",
  description: "Generate post Automatically",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}
