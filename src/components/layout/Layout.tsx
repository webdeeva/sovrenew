import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main 
        className="flex-grow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}