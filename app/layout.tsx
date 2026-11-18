import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "हिंदी मित्र — श, स और ड़ सीखो",
  description: "भोजपुरी-भाषी विद्यार्थियों के लिए हिंदी वर्तनी ऐप | ET 617 | 24B1297",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-amber-50 text-gray-900 min-h-screen flex flex-col" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-orange-700 text-white text-center py-2 text-sm">
          <p>🆔 24B1297 | ET 617 End-Semester Examination | हिंदी मित्र</p>
        </footer>
      </body>
    </html>
  );
}
