import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Afriva",
  description: "FIND CLOTHES THAT MATCHES YOUR STYLE",
  icons: {
    icon: '/images/logo_small.png',
    shortcut: '/logo_small.png',
    apple: '/images/logo_small.png'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
