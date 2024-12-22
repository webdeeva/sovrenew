import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PlanSection {
  title: string;
  content: string;
}

interface PlanSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  sections: PlanSection[];
}

export default function PlanSection({ isOpen, onToggle, sections }: PlanSectionProps) {
  return (
    <div className="mb-8">
      <Button
        variant="outline"
        onClick={onToggle}
        className="w-full flex items-center justify-between"
      >
        <span>View Founding Citizens Plan</span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-white rounded-lg border p-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Founding Digital Citizens Plan for Sov States</h2>
                  {sections.map((section, index) => (
                    <section key={index}>
                      <h3 className="text-xl font-bold mb-4">{section.title}</h3>
                      <div className="text-gray-600 whitespace-pre-line">
                        {section.content}
                      </div>
                    </section>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}