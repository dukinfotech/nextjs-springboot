import { Providers } from "@/providers/Providers";
import "./globals.css";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Navbar from "@/components/common/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>
          <div className="flex flex-row h-screen w-screen">
            <Sidebar />
            <div className="grow hidden sm:block bg-gray-200">
              <Navbar />
              <div className="container w-full">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
