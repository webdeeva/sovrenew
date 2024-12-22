import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { submitApplication } from '@/lib/api/founding-citizens';
import type { Tables } from '@/lib/database.types';

type FormData = Omit<Tables['founding_citizens']['Insert'], 'id' | 'user_id' | 'status' | 'created_at'>;

const initialFormData: FormData = {
  full_name: '',
  email: '',
  phone: '',
  city_state: '',
  country: '',
  occupation: '',
  bio: ''
};

export default function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitApplication(formData);
      toast.success('Application submitted successfully!');
      setFormData(initialFormData);
    } catch (error: any) {
      const message = error.message || 'Failed to submit application. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <Input
          name="full_name"
          value={formData.full_name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">City/State</label>
          <Input
            name="city_state"
            value={formData.city_state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Country</label>
          <Input
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Occupation</label>
        <Input
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Short Bio</label>
        <Textarea 
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          required
          placeholder="Tell us about yourself and why you want to become a founding citizen..."
          className="h-32"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-emerald-500 via-blue-600 to-violet-600 text-white hover:opacity-90"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}