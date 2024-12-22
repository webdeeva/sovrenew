import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Sov States?",
    answer: "Sov States is a federated platform that unites individuals globally through blockchain technology. We focus on promoting human sovereignty, digital identity management, and community governance through decentralized systems."
  },
  {
    question: "How do I become a Founding Citizen?",
    answer: "To become a Founding Citizen, you'll need to complete the verification process, set up your Digital Passport, and contribute to the initial community building phase. Visit our Founding Citizen page for detailed steps."
  },
  {
    question: "What is the Universal Basic Income (UBI) program?",
    answer: "Our UBI program provides regular economic support to community members through blockchain-based distribution. It's designed to ensure financial stability and promote economic growth within the ecosystem."
  },
  {
    question: "How does governance work?",
    answer: "Governance in Sov States is managed through DAOs (Decentralized Autonomous Organizations). Members can participate in decision-making through secure voting mechanisms and proposal submissions."
  },
  {
    question: "What is a Digital Passport?",
    answer: "A Digital Passport is your secure, blockchain-verified identity within the Sov States ecosystem. It enables participation in governance, UBI distribution, and community activities."
  },
  {
    question: "How is my data protected?",
    answer: "Your data is secured through blockchain technology and encryption. We prioritize privacy and give you complete control over your personal information."
  },
  {
    question: "What is Guapcoin X Chain?",
    answer: "Guapcoin X Chain is the blockchain infrastructure that powers Sov States, enabling secure transactions, identity verification, and governance mechanisms."
  },
  {
    question: "How can I participate in community decisions?",
    answer: "As a member, you can participate by submitting proposals, voting on community decisions, and joining discussions through our governance platform."
  }
];

const GradientDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.2
          }}
        />
      ))}
    </div>
  </div>
);

export default function FAQ() {
  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <GradientDots />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <h1 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h1>
            <p className="text-xl text-gray-600">
              Find answers to common questions about Sov States
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <Accordion type="single" collapsible className="divide-y">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}