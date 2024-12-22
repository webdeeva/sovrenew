import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight, Clock, Hash, Database } from 'lucide-react';
import whitepaperData from '@/data/whitepaper.json';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const transactionData = [
  { time: '12:00', value: 2500 },
  { time: '13:00', value: 3200 },
  { time: '14:00', value: 2800 },
  { time: '15:00', value: 3600 },
  { time: '16:00', value: 3100 },
  { time: '17:00', value: 3800 },
  { time: '18:00', value: 4200 },
];

const transactions = [
  {
    hash: '0x1a2b...3c4d',
    type: 'Transfer',
    amount: '1,000 SOV',
    from: '0x4d3c...2b1a',
    to: '0x5e4d...3c2b',
    time: '2 mins ago',
    status: 'success'
  },
  {
    hash: '0x2b3c...4d5e',
    type: 'UBI Distribution',
    amount: '100 SOV',
    from: 'Treasury',
    to: '0x6f5e...4d3c',
    time: '5 mins ago',
    status: 'success'
  },
  {
    hash: '0x3c4d...5e6f',
    type: 'Governance',
    amount: '500 SOV',
    from: '0x7g6f...5e4d',
    to: 'DAO Contract',
    time: '8 mins ago',
    status: 'success'
  }
];

export default function Whitepaper() {
  const [activeSection, setActiveSection] = useState('overview');

  const currentContent = whitepaperData.sections
    .flatMap(section => section.subsections)
    .find(subsection => subsection.id === activeSection);

  return (
    <div className="pt-16">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold">
            <span className="gradient-text">Whitepaper</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Technical documentation and vision for Sov States
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row py-8 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <ScrollArea className="h-[calc(100vh-12rem)] lg:sticky lg:top-20 pr-4">
              <nav className="space-y-1">
                {whitepaperData.sections.map((section) => (
                  <div key={section.id} className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.subsections.map((subsection) => (
                        <button
                          key={subsection.id}
                          onClick={() => setActiveSection(subsection.id)}
                          className={cn(
                            "flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                            activeSection === subsection.id
                              ? "bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          <ChevronRight className={cn(
                            "h-4 w-4 transition-transform",
                            activeSection === subsection.id && "rotate-90"
                          )} />
                          {subsection.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>

          {/* Main Content */}
          <main className="lg:flex-1 min-w-0">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold mb-6">{currentContent?.title}</h2>
                <div className="text-gray-600 whitespace-pre-wrap">
                  {currentContent?.content}
                </div>

                {/* Blockchain Explorer */}
                {activeSection === 'blockchain' && (
                  <div className="mt-8">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                      {/* Browser Header */}
                      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 text-center text-sm text-gray-600">
                          explorer.sovstates.com
                        </div>
                      </div>

                      {/* Explorer Content */}
                      <div className="p-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                              <Database className="h-4 w-4" />
                              <span className="text-sm">Total Blocks</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">1,234,567</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">Avg Block Time</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">2.5s</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-gray-500 mb-1">
                              <Hash className="h-4 w-4" />
                              <span className="text-sm">Network Hash Rate</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">156 TH/s</p>
                          </div>
                        </div>

                        {/* Transaction Chart */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-8">
                          <h3 className="text-lg font-semibold mb-4">Transaction Volume (24h)</h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={transactionData}>
                                <XAxis 
                                  dataKey="time" 
                                  stroke="#94a3b8"
                                  fontSize={12}
                                />
                                <YAxis 
                                  stroke="#94a3b8"
                                  fontSize={12}
                                />
                                <Tooltip />
                                <Line 
                                  type="monotone" 
                                  dataKey="value" 
                                  stroke="url(#gradient)" 
                                  strokeWidth={2}
                                  dot={false}
                                />
                                <defs>
                                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#2ecc71" />
                                    <stop offset="50%" stopColor="#3498db" />
                                    <stop offset="100%" stopColor="#8e44ad" />
                                  </linearGradient>
                                </defs>
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Recent Transactions */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                          <div className="space-y-4">
                            {transactions.map((tx) => (
                              <div
                                key={tx.hash}
                                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-mono text-gray-500">{tx.hash}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                                      tx.status === 'success' 
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                      {tx.status}
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-500">{tx.time}</span>
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sm font-semibold">{tx.type}</span>
                                  <span className="text-sm text-gray-500">•</span>
                                  <span className="text-sm text-gray-900">{tx.amount}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <span>From: {tx.from}</span>
                                  <ArrowRightIcon className="h-4 w-4" />
                                  <span>To: {tx.to}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}