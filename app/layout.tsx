import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import "./globals.css";

const inter = { variable: "" };

export const metadata: Metadata = {
  title: site.name,
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-page font-sans text-ink">
        <header className="border-b border-line">
          <div className="mx-auto max-w-[720px] px-4 py-3">
            <Link href="/" className="inline-block">
              <Image
                src="/brand/jadd-lockup-horizontal.svg"
                alt={site.name}
                width={399}
                height={160}
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
