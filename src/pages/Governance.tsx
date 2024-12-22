import { motion, useAnimation } from 'framer-motion';
import { Vote, Users, Shield, Scale, ArrowUpRight, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

const proposals = [
  {
    id: "PROP-2024-01",
    title: "Increase UBI Distribution Frequency",
    status: "Active",
    votes: { for: 782, against: 234 },
    endDate: "2024-04-01"
  },
  {
    id: "PROP-2024-02",
    title: "Add New Community Programs",
    status: "Active",
    votes: { for: 567, against: 123 },
    endDate: "2024-04-05"
  },
  {
    id: "PROP-2024-03",
    title: "Modify Governance Parameters",
    status: "Pending",
    votes: { for: 0, against: 0 },
    endDate: "2024-04-10"
  }
];

const features = [
  {
    icon: Vote,
    title: "Democratic Voting",
    description: "Secure and transparent voting mechanisms for all community decisions"
  },
  {
    icon: Users,
    title: "DAO Structure",
    description: "Decentralized autonomous organizations for local and global governance"
  },
  {
    icon: Shield,
    title: "Security",
    description: "Blockchain-based security ensuring tamper-proof decision making"
  },
  {
    icon: Scale,
    title: "Fair Representation",
    description: "Equal voting rights and representation for all community members"
  }
];

export default function Governance() {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Community Governance</span>
            </h1>
            <p className="text-xl text-gray-600">
              Empowering our community through decentralized decision-making
            </p>
          </motion.div>
        </div>

        {/* Mock Browser Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl border border-gray-200 mb-24"
        >
          {/* Browser Header */}
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 rounded-t-xl flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-sm text-gray-600">
              dao.sovstates.com
            </div>
          </div>

          {/* DAO Content */}
          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="text-sm text-gray-500 mb-1">Total SOV Staked</h3>
                <p className="text-2xl font-bold text-gray-900">1,234,567</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="text-sm text-gray-500 mb-1">Active Proposals</h3>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h3 className="text-sm text-gray-500 mb-1">Governance Power</h3>
                <p className="text-2xl font-bold text-gray-900">89.4%</p>
              </div>
            </div>

            {/* Proposals */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Active Proposals</h2>
                <Button className="bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white">
                  New Proposal
                </Button>
              </div>

              {proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-500">{proposal.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          proposal.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {proposal.status}
                        </span>
                      </div>
                      <h3 className="font-semibold">{proposal.title}</h3>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-green-600" />
                        <span>{proposal.votes.for}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsDown className="h-4 w-4 text-red-600" />
                        <span>{proposal.votes.against}</span>
                      </div>
                    </div>
                    <span className="text-gray-500">Ends {proposal.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* DAO Explanation Section */}
        <motion.div
          animate={controls}
          className="relative overflow-hidden py-24 text-white rounded-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 opacity-90" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                Understanding DAOs in Sov States
              </h2>
              <div className="prose prose-lg prose-invert mx-auto">
                <p className="text-xl opacity-90 mb-8 leading-relaxed">
                  A DAO (Decentralized Autonomous Organization) is a community-led entity with no 
                  central authority. In Sov States, DAOs form the backbone of our governance 
                  system, enabling transparent and democratic decision-making through smart contracts 
                  and blockchain technology.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-3 opacity-90">
                      <li>• Transparent voting mechanisms</li>
                      <li>• Automated execution of decisions</li>
                      <li>• Equal participation rights</li>
                      <li>• Immutable record of proposals</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                    <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                    <ul className="space-y-3 opacity-90">
                      <li>• Community-driven decisions</li>
                      <li>• Reduced bureaucracy</li>
                      <li>• Increased transparency</li>
                      <li>• Fair representation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}