import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#e1e6e7] text-[#191919]">
      <Navbar />
      <Hero />
    </main>
  );
}