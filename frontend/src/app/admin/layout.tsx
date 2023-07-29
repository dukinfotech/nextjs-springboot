import { Providers } from "@/providers/Providers";
import "../globals.css";
import Sidebar from "@/components/admin/Sidebar/Sidebar";
import Content from "@/components/admin/Content/Content";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body>
        <Providers>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <div className="flex flex-row h-screen w-screen">
            <Sidebar />
            <Content>{children}</Content>
          </div>
        </Providers>
      </body>
    </html>
  );
}
