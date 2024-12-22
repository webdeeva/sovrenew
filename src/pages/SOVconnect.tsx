import { motion } from 'framer-motion';
import { Search, Lock, Shield, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const profiles = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Digital Citizen",
    address: "0x1a2b...3c4d",
    connectionCost: "100 SOV",
    status: "Available"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Community Leader",
    address: "0x4d3c...2b1a",
    connectionCost: "250 SOV",
    status: "Available"
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Governance Delegate",
    address: "0x5e4d...3c2b",
    connectionCost: "150 SOV",
    status: "Available"
  }
];

export default function SOVconnect() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6">
              <span className="gradient-text">SOVconnect</span>
            </h1>
            <p className="text-xl text-gray-600">
              Connect with verified identities in the Sov States ecosystem
            </p>
          </motion.div>
        </div>

        {/* Browser Window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Browser Header */}
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center text-sm text-gray-600">
              connect.sovstates.com
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
            {/* Left Sidebar - Profile List */}
            <div className="lg:col-span-1 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search profiles..."
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {profiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{profile.name}</h3>
                      <span className="text-sm text-gray-500">{profile.connectionCost}</span>
                    </div>
                    <div className="text-sm text-gray-500">{profile.role}</div>
                    <div className="text-sm font-mono text-gray-400 mt-1">{profile.address}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Selected Profile */}
            <div className="lg:col-span-2 p-6">
              {/* Cover Image */}
              <div className="relative h-64 rounded-xl mb-16">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 opacity-75" />
                <img
                  src="https://sheinteractive.com/9.png"
                  alt="Profile"
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>

              {/* Profile Info */}
              <div className="text-center mb-8 mt-16">
                <h2 className="text-2xl font-bold">Wanda Thompson</h2>
                <p className="text-gray-600 mt-1">Digital Identity Pioneer</p>
                <p className="font-mono text-sm text-gray-500 mt-2">0x8f9c...2d1e</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1,234</div>
                  <div className="text-sm text-gray-500">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-500">Trust Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">250 SOV</div>
                  <div className="text-sm text-gray-500">Connection Cost</div>
                </div>
              </div>

              {/* Connection Request */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Lock className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Encrypted Profile</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Request access to view full profile details and initiate direct communication.
                    </p>
                    <Button className="bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white">
                      Request Decryption
                    </Button>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="rounded-xl border border-gray-200 divide-y divide-gray-200">
                <div className="p-4 flex items-center gap-3">
                  <Shield className="h-5 w-5 text-emerald-500" />
                  <div className="flex-grow">
                    <h4 className="font-medium">Identity Verified</h4>
                    <p className="text-sm text-gray-500">Profile verified by SovereignID Protocol</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-2">Connection Terms</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Access to private profile information</li>
                    <li>• Direct messaging capabilities</li>
                    <li>• Participation in exclusive content</li>
                    <li>• Connection is valid for 12 months</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}