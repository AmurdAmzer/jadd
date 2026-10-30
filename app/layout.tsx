import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";
import "./globals.css";

const inter = { variable: "" };

export const metadata: Metadata = {
  title: brand.name,
  description: brand.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-page font-sans text-ink">
        <header className="border-b border-line">
          <div className="mx-auto max-w-[720px] px-4 py-3">
            <Link href="/" className="inline-block">
              <Image
                src={brand.logo.src}
                alt={brand.name}
                width={brand.logo.width}
                height={brand.logo.height}
                className="h-9 w-auto"
                priority
              />
            </Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
