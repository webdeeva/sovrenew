import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Whitepaper', href: '/whitepaper' },
    { name: 'Plan', href: '/plan' },
    { name: 'Governance', href: '/governance' },
    { name: 'UBI', href: '/ubi' },
    { name: 'FAQ', href: '/faq' },
  ],
  social: [
    { name: 'Discord', href: 'https://discord.gg/5YgJuXaXwY', icon: MessageSquare },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="https://sheinteractive.com/sslogo.png" alt="Sov States" className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold gradient-text">Sov States</span>
          </div>
          <nav className="flex gap-6">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-emerald-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 Sov States. All rights reserved.
            </p>
            <div className="flex gap-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-emerald-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}