import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DigitalPassport from './DigitalPassport';

export default function Hero() {
  return (
    <div className="min-h-[90vh] relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 dotted-bg opacity-30" />
      
      {/* Merge Image Background */}
      <div className="absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none">
        <div 
          className="absolute inset-0 bg-contain bg-right bg-no-repeat opacity-20"
          style={{ 
            backgroundImage: 'url(https://sheinteractive.com/merge.png)',
            filter: 'brightness(0.8)',
            maskImage: 'linear-gradient(to left, transparent, black 50%), linear-gradient(to top, transparent, black 25%), linear-gradient(to bottom, transparent, black 25%)',
            WebkitMaskImage: 'linear-gradient(to left, transparent, black 50%), linear-gradient(to top, transparent, black 25%), linear-gradient(to bottom, transparent, black 25%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Empowering Digital</span>
              <br />
              <span className="gradient-text">Sovereignty</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join a global community of digital citizens building a decentralized future.
              Take control of your digital identity, assets, and governance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white hover:opacity-90"
              >
                <Link to="/founding-citizen">Become a Founding Citizen</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2"
              >
                <Link to="/whitepaper">Read Whitepaper</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Digital Passport */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <DigitalPassport animate={true} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}