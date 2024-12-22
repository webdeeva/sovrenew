import { motion } from 'framer-motion';
import { CircuitPattern } from '@/components/ui/circuit-pattern';

const roadmapData = [
  {
    period: "December 2024 - January 2025",
    title: "Initial Development and Recruitment",
    items: [
      "Platform Development Kickoff: Begin development of key components",
      "Recruit Founding Digital Citizens campaign launch",
      "Team Expansion: Hire developers and specialists"
    ],
    color: "from-emerald-500 to-emerald-600"
  },
  {
    period: "February 2025 - March 2025",
    title: "Platform and Governance Tools Development",
    items: [
      "Identity and Governance System Implementation",
      "Smart Contract Development and Deployment",
      "Establish Physical and Virtual Headquarters"
    ],
    color: "from-blue-500 to-blue-600"
  },
  {
    period: "April 2025",
    title: "Founding Citizen Engagement and Initial UBI Testing",
    items: [
      "Onboard Founding Citizens with exclusive access",
      "UBI Test Launch among founding members",
      "Community Training and Virtual Workshops"
    ],
    color: "from-violet-500 to-violet-600"
  },
  {
    period: "May 2025",
    title: "DAO Formation and Localized Governance",
    items: [
      "Establish Localized DAOs for regional management",
      "DAO Governance Activation for local initiatives",
      "AI Integration for decision-making support"
    ],
    color: "from-emerald-500 to-blue-600"
  },
  {
    period: "June 2025 - July 2025",
    title: "Marketing and Community Expansion",
    items: [
      "Launch global marketing campaign",
      "Release educational materials and host webinars",
      "Continue Secured Wallet Card development"
    ],
    color: "from-blue-600 to-violet-600"
  },
  {
    period: "August 2025",
    title: "Expansion of UBI and Community Programs",
    items: [
      "Full UBI Rollout to all members",
      "Launch community programs and initiatives",
      "Strengthen token economy and adoption"
    ],
    color: "from-violet-600 to-emerald-500"
  },
  {
    period: "September 2025",
    title: "Launch Secured Wallet Card and Digital Passport",
    items: [
      "Finalize and launch Secured Wallet Card",
      "Collect and implement community feedback",
      "Optimize DAO processes and governance"
    ],
    color: "from-emerald-500 to-violet-600"
  }
];

export default function Plan() {
  return (
    <div className="pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Development Roadmap</span>
            </h1>
            <p className="text-xl text-gray-600">
              Our strategic plan to build and grow the Sov States ecosystem
            </p>
          </motion.div>
          <div className="mt-8">
            <CircuitPattern animate />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative mt-24">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-500 via-blue-600 to-violet-600" />

          {roadmapData.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative mb-24 ${
                index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:ml-auto'
              }`}
            >
              {/* Connector Line */}
              <div 
                className={`absolute top-10 ${
                  index % 2 === 0 
                    ? 'right-0 lg:right-auto lg:left-[calc(100%_-_1px)]' 
                    : 'left-0 lg:left-auto lg:right-[calc(100%_-_1px)]'
                } w-full lg:w-[calc(50vw_-_50%_+_1px)] h-1 bg-gradient-to-r ${milestone.color}`}
              />

              {/* Content Card */}
              <div className={`relative rounded-xl shadow-lg p-6 lg:w-[calc(100%_-_24px)] overflow-hidden bg-gradient-to-r ${milestone.color} text-white`}>
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-20" />

                <div className="relative">
                  <span className="text-sm font-medium text-white/80">
                    {milestone.period}
                  </span>
                  <h3 className="text-xl font-bold mt-1 mb-4">{milestone.title}</h3>
                  <ul className="space-y-3">
                    {milestone.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.2 + itemIndex * 0.1 }}
                        className="flex items-start gap-2 text-white/90"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}