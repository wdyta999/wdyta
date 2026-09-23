import "./globals.css";

export const metadata = {
  title: "Sito Voti Attualità",
  description: "Testi di attualità con votazione della community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
