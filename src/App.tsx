import Hero from './components/Hero';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ColorPicker from './components/ColorPicker';
import CookieBanner from './components/CookieBanner';

function App() {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-[url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center -z-10"></div>
      <Hero />
      <Services />
      <ContactForm />
      <Footer />
      <ColorPicker />
      <CookieBanner />
    </div>
  );
}

export default App;
