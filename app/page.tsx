import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoleSection from "@/components/RoleSection";
import Business from "@/components/Business";
import News from "@/components/News";
import Recruit from "@/components/Recruit";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <RoleSection />
        <Business />
        <News />
        <Recruit />
      </main>
      <Footer />
    </>
  );
}
