import { Providers } from "@/providers/Providers";
import "./globals.css";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Content from "@/components/common/Content/Content";

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
            <Content>{children}</Content>
          </div>
        </Providers>
      </body>
    </html>
  );
}
