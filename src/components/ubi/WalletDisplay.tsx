import { motion } from 'framer-motion';
import { QrCode, Wallet, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WalletDisplay() {
  const walletAddress = '0x1a2b...3c4d';
  const sovBalance = '1,000';
  const guapBalance = '10,000';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
        {/* Browser Header */}
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-sm text-gray-600">
            wallet.sovstates.com
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left Side - Wallet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 p-6 rounded-xl text-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-semibold opacity-90">Digital Wallet</h3>
                  <p className="text-sm opacity-75">Universal Basic Income</p>
                </div>
                <Wallet className="h-6 w-6 opacity-90" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-75">SOV Balance</p>
                  <p className="text-2xl font-bold">{sovBalance} SOV</p>
                </div>
                <div>
                  <p className="text-sm opacity-75">GUAP Balance</p>
                  <p className="text-2xl font-bold">{guapBalance} GUAP</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Wallet Address</h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 font-mono">{walletAddress}</p>
              
              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Next UBI Distribution</span>
                  <span className="text-gray-900">In 5 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Distribution Amount</span>
                  <span className="text-gray-900">100 SOV</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Digital Passport */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold gradient-text">Digital Passport</h3>
                <span className="text-sm text-gray-500">SOV-2024</span>
              </div>
              
              <div className="space-y-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="text-center space-y-1">
                  <p className="font-medium">Digital Citizen</p>
                  <p className="text-sm text-gray-500">{walletAddress}</p>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-48 h-48 bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                    <QrCode className="w-full h-full text-gray-800" />
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-gray-300" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-gray-300" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-gray-300" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-gray-300" />
                  </div>
                </div>

                {/* Gradient Barcode */}
                <div className="relative w-full h-16">
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[90%]">
                    <div className="absolute -top-1 -left-3 w-6 h-6 border-t-2 border-l-2 border-gray-300" />
                    <div className="absolute -top-1 -right-3 w-6 h-6 border-t-2 border-r-2 border-gray-300" />
                    <div className="absolute -bottom-1 -left-3 w-6 h-6 border-b-2 border-l-2 border-gray-300" />
                    <div className="absolute -bottom-1 -right-3 w-6 h-6 border-b-2 border-r-2 border-gray-300" />
                    
                    <div className="flex justify-between h-full py-2">
                      {[...Array(40)].map((_, i) => {
                        const width = Math.random() * 2 + 1;
                        const colors = ['#2ecc71', '#3498db', '#8e44ad', '#2c3e50'];
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        return (
                          <div
                            key={i}
                            style={{
                              width: `${width}px`,
                              height: '100%',
                              backgroundColor: color,
                              opacity: Math.random() * 0.3 + 0.7
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}