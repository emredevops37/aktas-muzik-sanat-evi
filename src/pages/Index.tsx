import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import TeamServices from '@/components/TeamServices';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Products />
        <TeamServices />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
