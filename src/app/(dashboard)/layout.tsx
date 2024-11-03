import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <div className="h-screen flex overflow-scroll">
          {/* left */}
          <div className="w-1/6 md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
          <Link href={'/'} className="flex justify-center items-center lg:justify-start gap-2">
          <Image src='/logo.png' alt="logo" width={32} height={32}/>
          <span className="font-extrabold text-black hidden lg:block">SchoolBama</span>
          </Link>
          <Menu/>
          </div>
          {/* right */}
          <div className="w-5/6 md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA]  flex flex-col">
          <Navbar/>
          {children}
          </div>
        </div>
    </html>
  );
}