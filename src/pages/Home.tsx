import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Newsletter from '@/components/home/Newsletter';
import Chatbot from '@/components/home/Chatbot';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <About />
      <Newsletter />
      <Chatbot />
    </div>
  );
}