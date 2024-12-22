import { motion } from 'framer-motion';
import { Shield, Users, Coins, Globe2 } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Digital Identity',
    description: 'Secure and sovereign control over your digital presence with blockchain-based identity verification.',
  },
  {
    icon: Users,
    title: 'Community Governance',
    description: 'Participate in democratic decision-making through transparent and decentralized voting systems.',
  },
  {
    icon: Coins,
    title: 'Universal Basic Income',
    description: 'Access to fair economic opportunities through our innovative UBI program.',
  },
  {
    icon: Globe2,
    title: 'Global Network',
    description: 'Connect with like-minded individuals in a worldwide community of digital citizens.',
  },
];

export default function About() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Building the Future</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sov States empowers individuals to take control of their digital future through
            decentralized technology and community-driven governance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}