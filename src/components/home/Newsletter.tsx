import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { subscribeToNewsletter } from '@/lib/api/newsletter';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await subscribeToNewsletter(email);
      toast.success('Thank you for subscribing!');
      setEmail('');
    } catch (error: any) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dotted-bg opacity-30" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Stay Updated</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Join our newsletter to receive updates about Sov States development,
              community initiatives, and governance proposals.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white hover:opacity-90"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}