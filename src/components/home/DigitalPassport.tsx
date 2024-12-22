import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { QrCode } from 'lucide-react';

const profiles = [
  {
    image: "https://sheinteractive.com/3.png",
    alt: "African American man"
  },
  {
    image: "https://sheinteractive.com/9.png",
    alt: "African American woman"
  },
  {
    image: "https://sheinteractive.com/11.png",
    alt: "Latin woman"
  },
  {
    image: "https://sheinteractive.com/4.png",
    alt: "Latin man"
  },
  {
    image: "https://sheinteractive.com/1.png",
    alt: "Asian woman"
  },
  {
    image: "https://sheinteractive.com/13.png",
    alt: "Asian man"
  },
  {
    image: "https://sheinteractive.com/3.png",
    alt: "White woman"
  },
  {
    image: "https://sheinteractive.com/15.png",
    alt: "White man"
  }
];

const colors = [
  '#2ecc71', // emerald
  '#3498db', // blue
  '#8e44ad', // violet
  '#2c3e50', // midnight blue
];

const GradientBarcode = () => (
  <div className="relative w-full h-12 sm:h-16 mt-2 sm:mt-4">
    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[90%]">
      <div className="absolute -top-1 -left-2 sm:-left-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-l-2 border-gray-300" />
      <div className="absolute -top-1 -right-2 sm:-right-3 w-4 sm:w-6 h-4 sm:h-6 border-t-2 border-r-2 border-gray-300" />
      <div className="absolute -bottom-1 -left-2 sm:-left-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-l-2 border-gray-300" />
      <div className="absolute -bottom-1 -right-2 sm:-right-3 w-4 sm:w-6 h-4 sm:h-6 border-b-2 border-r-2 border-gray-300" />
      
      <div className="flex justify-between h-full py-2">
        {[...Array(40)].map((_, i) => {
          const width = Math.random() * 2 + 1;
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
);

interface DigitalPassportProps {
  animate?: boolean;
}

export default function DigitalPassport({ animate = false }: DigitalPassportProps) {
  const controls = useAnimation();
  const [currentProfile, setCurrentProfile] = useState(0);
  const isMounted = useRef(false);

  const animateSequence = useCallback(async () => {
    if (!animate || !isMounted.current) return;

    try {
      await controls.start({ rotateY: 180 });
      await new Promise(resolve => setTimeout(resolve, 3000));
      setCurrentProfile(prev => (prev + 1) % profiles.length);
      await controls.start({ rotateY: 0 });
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('Animation error:', error);
    }
  }, [controls, animate]);

  useEffect(() => {
    isMounted.current = true;
    let timeoutId: NodeJS.Timeout;

    const runAnimation = async () => {
      if (!isMounted.current || !animate) return;
      await animateSequence();
      if (isMounted.current && animate) {
        timeoutId = setTimeout(runAnimation, 0);
      }
    };

    if (animate) {
      runAnimation();
    }

    return () => {
      isMounted.current = false;
      clearTimeout(timeoutId);
      controls.stop();
    };
  }, [animateSequence, controls, animate]);

  return (
    <div className="relative w-full max-w-md mx-auto perspective">
      <motion.div
        animate={controls}
        initial={{ rotateY: 0 }}
        transition={{ duration: 1 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full aspect-[4/3]"
      >
        {/* Front - Digital Passport */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold gradient-text">Digital Passport</h3>
              <span className="text-xs sm:text-sm text-gray-500">SOV-2024</span>
            </div>
            <div className="space-y-2 sm:space-y-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full mx-auto mb-2 sm:mb-4 overflow-hidden">
                <motion.img
                  key={currentProfile}
                  src={profiles[currentProfile].image}
                  alt={profiles[currentProfile].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-center space-y-0.5 sm:space-y-1">
                <p className="font-medium text-sm sm:text-base">Digital Citizen</p>
                <p className="text-xs sm:text-sm text-gray-500">ID: 0x1a2b...3c4d</p>
              </div>
              <GradientBarcode />
            </div>
          </div>
        </div>

        {/* Back - QR Code */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border-2 border-gray-100">
            <div className="flex flex-col items-center justify-center h-full">
              <QrCode className="w-32 h-32 sm:w-48 sm:h-48 text-gray-800 mb-2 sm:mb-4" />
              <p className="text-xs sm:text-sm text-gray-500">Scan to verify identity</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}