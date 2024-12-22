import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://api.vectorshift.ai/api/chatbots/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': 'sk_jXicDcv2hbRUdM7gCksvKo8QwooJ8Xw6IsFC9a3e0sNXkOpM'
        },
        body: JSON.stringify({
          input: userMessage,
          chatbot_name: 'SovChat',
          username: 'Aquariusmaximus',
          conversation_id: null
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-4 w-[350px]"
          >
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 p-4 flex justify-between items-center">
                <h3 className="text-white font-semibold">Sov States Assistant</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-white/80"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="h-[400px] p-4 overflow-y-auto">
                {messages.length === 0 ? (
                  <div className="text-gray-500 text-center">
                    How can I help you today?
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-800">
                          Typing...
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="icon"
        className={`h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white hover:opacity-90 ${
          isOpen ? 'opacity-90' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}