import {
  About,
  ContactSection,
  Footer,
  Header,
  Hero,
  Services,
} from "@/components/site";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
