import { Providers } from "@/providers/Providers";
import "../globals.css";
import Sidebar from "@/components/admin/Sidebar/Sidebar";
import Content from "@/components/admin/Content/Content";

export default function AdminLayout({
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
