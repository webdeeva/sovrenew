import { motion, useAnimation } from 'framer-motion';
import { Coins, LineChart, ShieldCheck, Wallet } from 'lucide-react';
import WalletDisplay from '@/components/ubi/WalletDisplay';
import { useEffect } from 'react';

const benefits = [
  {
    icon: Coins,
    title: "Regular Income",
    description: "Receive consistent UBI payments through our blockchain network"
  },
  {
    icon: LineChart,
    title: "Economic Growth",
    description: "Participate in community economic development and wealth creation"
  },
  {
    icon: ShieldCheck,
    title: "Financial Security",
    description: "Build a stable financial foundation for your future"
  },
  {
    icon: Wallet,
    title: "Digital Assets",
    description: "Manage and grow your digital assets within the ecosystem"
  }
];

const GradientWaves = () => (
  <div className="absolute left-0 right-0 h-32 overflow-hidden">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="absolute w-full h-16 bg-gradient-to-r from-emerald-500/20 via-blue-600/20 to-violet-600/20"
        style={{
          top: i * 8,
          transform: `rotate(${i * 2}deg)`,
          opacity: 0.1 + i * 0.1
        }}
      />
    ))}
  </div>
);

export default function UBI() {
  const controls = useAnimation();

  useEffect(() => {
    const animateGradient = async () => {
      await controls.start({
        background: [
          'linear-gradient(45deg, #2ecc71, #3498db, #8e44ad)',
          'linear-gradient(45deg, #3498db, #8e44ad, #2ecc71)',
          'linear-gradient(45deg, #8e44ad, #2ecc71, #3498db)',
          'linear-gradient(45deg, #2ecc71, #3498db, #8e44ad)',
        ],
        transition: {
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }
      });
    };

    animateGradient();
  }, [controls]);

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <GradientWaves />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <h1 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Universal Basic Income</span>
            </h1>
            <p className="text-xl text-gray-600">
              Empowering our community through sustainable economic support
            </p>
          </motion.div>
        </div>

        {/* Wallet Display */}
        <WalletDisplay />

        {/* UBI Explanation Section */}
        <motion.div
          animate={controls}
          className="relative overflow-hidden py-24 text-white rounded-xl my-16"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 opacity-90" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                Understanding Universal Basic Income
              </h2>
              <div className="prose prose-lg prose-invert mx-auto">
                <p className="text-xl opacity-90 mb-8 leading-relaxed">
                  Universal Basic Income (UBI) is a revolutionary economic concept where all members 
                  of a community receive regular, unconditional financial distributions. In Sov States, 
                  we've reimagined UBI for the digital age, leveraging blockchain technology to ensure 
                  fair, transparent, and efficient distribution.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4">Core Principles</h3>
                    <ul className="space-y-3 opacity-90">
                      <li>• Universal: Available to all verified citizens</li>
                      <li>• Unconditional: No strings attached</li>
                      <li>• Regular: Predictable payment schedule</li>
                      <li>• Sustainable: Blockchain-powered distribution</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4">Community Benefits</h3>
                    <ul className="space-y-3 opacity-90">
                      <li>• Economic stability for all members</li>
                      <li>• Reduced financial anxiety</li>
                      <li>• Increased community participation</li>
                      <li>• Enhanced economic mobility</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-blue-600 to-violet-600 transform rotate-45" />
          </div>
          
          <h2 className="text-2xl font-bold mb-8">Distribution Process</h2>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-blue-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-2">Verification</h3>
                <p className="text-gray-600">Complete identity verification through your Digital Passport</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-2">Wallet Setup</h3>
                <p className="text-gray-600">Create and secure your digital wallet for UBI distributions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-2">Regular Payments</h3>
                <p className="text-gray-600">Receive automated UBI payments through smart contracts</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600 flex-shrink-0 flex items-center justify-center text-white font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-2">Asset Management</h3>
                <p className="text-gray-600">Access tools to manage and grow your digital assets</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}