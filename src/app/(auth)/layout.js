import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import PictureSlider from "@/components/sections/buyer/auth/Carousel";
import AuthWrapper from "@/hooks/authWrapper";

const inter = Inter({ subsets: ["latin"] });

const Login1 = "/images/login-1.png";
const Login2 = "/images/login-2.png";
const Login3 = "/images/login-3.png";

const importedImages = [Login1, Login2, Login3];

export const metadata = {
  title: "Afriva",
  description: "FIND CLOTHES THAT MATCHES YOUR STYLE",
};

export default function AuthLayout({ children }) {


  return (
    //<html lang="en">
    //<body className={`${inter.className} antialiased`}>
    //<Toaster position="top-center" richColors />
    <div className="flex gap-5 items-center justify-center">
      <div className="w-full lg:w-1/2">
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </div>
      {/* <AppProvider>{children}</AppProvider> */}
      <div className="w-1/2 lg:block hidden my-auto">
        <PictureSlider img={importedImages} />
      </div>
    </div>
    //</body>
    //</html>
  );
}
