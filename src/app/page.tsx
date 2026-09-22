import {
  About,
  ContactSection,
  Footer,
  Header,
  Hero,
  Services,
  WorkStrip,
} from "@/components/site";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WorkStrip />
        <About />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
