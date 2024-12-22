import { supabase } from '@/lib/supabase';

export async function subscribeToNewsletter(email: string) {
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{
      email,
      subscribed: true
    }]);

  if (error) throw error;
}

export async function getSubscribers() {
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}