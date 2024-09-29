import Image from "next/image";
import About from "@/app/components/homepage/About";
import Achievements from "@/app/components/homepage/Achievements";
import Hero from "@/app/components/homepage/Hero";
import What from "@/app/components/homepage/What";

export default function Home() {
  return (
      <main className="">
          <Hero />
          <About />
          <What />
          <Achievements />
      </main>
  );
}
