import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AuthWrapper from "@/hooks/authWrapper";
// import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Afriva",
  description: "FIND CLOTHES THAT MATCHES YOUR STYLE",
};

export default function BuyerLayout({ children }) {
  return (
    //<html lang="en">
    //<body className={`${inter.className} antialiased`}>
    //  <Toaster position="top-center" richColors />
    <> <Navbar />
      <AuthWrapper>
        {children}
      </AuthWrapper>
      <Footer /></>
    //</body>
    //</html>
  );
}
