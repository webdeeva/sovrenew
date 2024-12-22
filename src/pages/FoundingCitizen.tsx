import { useState } from 'react';
import { motion } from 'framer-motion';
import ApplicationForm from '@/components/founding-citizen/ApplicationForm';
import PlanSection from '@/components/founding-citizen/PlanSection';
import { planSections } from '@/data/founding-citizen-plan';

export default function FoundingCitizen() {
  const [isPlanOpen, setIsPlanOpen] = useState(false);

  return (
    <div className="min-h-screen pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Form */}
        <div className="p-8 lg:p-12">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              <span className="gradient-text">Join as a Founding Citizen</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Be part of the foundation that shapes the future of digital sovereignty. 
              As a founding citizen, you'll have enhanced governance rights and play a 
              crucial role in building our community.
            </p>

            <PlanSection 
              isOpen={isPlanOpen} 
              onToggle={() => setIsPlanOpen(!isPlanOpen)} 
              sections={planSections}
            />

            <ApplicationForm />
          </div>
        </div>

        {/* Right Column - Animated Gradient */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-blue-600 to-violet-600">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, transparent 0%, #000 100%)',
                  'radial-gradient(circle at 100% 100%, transparent 0%, #000 100%)',
                  'radial-gradient(circle at 0% 100%, transparent 0%, #000 100%)',
                  'radial-gradient(circle at 100% 0%, transparent 0%, #000 100%)',
                  'radial-gradient(circle at 0% 0%, transparent 0%, #000 100%)',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-white text-center">
                <h1 className="text-4xl font-bold mb-6">Shape the Future of Digital Sovereignty</h1>
                <p className="text-xl opacity-90">
                  Join an exclusive group of pioneers building a decentralized future through 
                  blockchain technology and community-driven governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}