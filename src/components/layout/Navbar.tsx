import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'Plan', href: '/plan' },
  { name: 'Governance', href: '/governance' },
  { name: 'UBI', href: '/ubi' },
  { name: 'SOVconnect', href: '/sovconnect' },
  { name: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src="https://sheinteractive.com/sslogo.png" alt="Sov States" className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold gradient-text">Sov States</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-emerald-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                className="ml-4 bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white hover:opacity-90 transition-opacity"
              >
                <Link to="/founding-citizen">Become a Founding Citizen</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-500 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 md:hidden overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <img src="https://sheinteractive.com/sslogo.png" alt="Sov States" className="h-8 w-8" />
                  <span className="ml-2 text-xl font-bold gradient-text">Sov States</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:text-emerald-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-emerald-500 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white"
                  >
                    <Link to="/founding-citizen" onClick={() => setIsOpen(false)}>
                      Become a Founding Citizen
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}