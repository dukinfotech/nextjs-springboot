import Navbar from "../Navbar/Navbar";

export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="grow bg-gray-200">
      <Navbar />
      <div className="container w-full">{children}</div>
    </div>
  );
}
