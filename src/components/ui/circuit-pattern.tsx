import { motion } from 'framer-motion';

interface CircuitPatternProps {
  className?: string;
  animate?: boolean;
}

export function CircuitPattern({ className = "", animate = false }: CircuitPatternProps) {
  const lines = [
    { x1: "10%", y1: "20%", x2: "30%", y2: "20%" },
    { x1: "30%", y1: "20%", x2: "30%", y2: "40%" },
    { x1: "30%", y1: "40%", x2: "70%", y2: "40%" },
    { x1: "70%", y1: "40%", x2: "70%", y2: "20%" },
    { x1: "70%", y1: "20%", x2: "90%", y2: "20%" },
    { x1: "20%", y1: "60%", x2: "40%", y2: "60%" },
    { x1: "40%", y1: "60%", x2: "40%", y2: "80%" },
    { x1: "40%", y1: "80%", x2: "60%", y2: "80%" },
    { x1: "60%", y1: "80%", x2: "60%", y2: "60%" },
    { x1: "60%", y1: "60%", x2: "80%", y2: "60%" },
  ];

  const nodes = [
    { cx: "30%", cy: "20%" },
    { cx: "30%", cy: "40%" },
    { cx: "70%", cy: "40%" },
    { cx: "70%", cy: "20%" },
    { cx: "40%", cy: "60%" },
    { cx: "40%", cy: "80%" },
    { cx: "60%", cy: "80%" },
    { cx: "60%", cy: "60%" },
  ];

  return (
    <div className={`relative w-full h-24 ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2ecc71" />
            <stop offset="50%" stopColor="#3498db" />
            <stop offset="100%" stopColor="#8e44ad" />
          </linearGradient>
        </defs>
        
        {/* Circuit Lines */}
        {lines.map((line, index) => (
          <motion.line
            key={`line-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            strokeLinecap="round"
            initial={animate ? { pathLength: 0, opacity: 0 } : undefined}
            animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{
              duration: 1.5,
              delay: index * 0.1,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Circuit Nodes */}
        {nodes.map((node, index) => (
          <motion.circle
            key={`node-${index}`}
            cx={node.cx}
            cy={node.cy}
            r="1"
            fill="url(#lineGradient)"
            initial={animate ? { scale: 0, opacity: 0 } : undefined}
            animate={animate ? { scale: 1, opacity: 1 } : undefined}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
}