import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/database.types';

type FoundingCitizen = Tables['founding_citizens']['Insert'];

export async function submitApplication(data: Omit<FoundingCitizen, 'user_id' | 'status' | 'created_at'>) {
  const { error } = await supabase
    .from('founding_citizens')
    .insert([data]);

  if (error) throw error;
}

export async function getApplications() {
  const { data, error } = await supabase
    .from('founding_citizens')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateApplicationStatus(id: string, status: Tables['founding_citizens']['Update']['status']) {
  const { error } = await supabase
    .from('founding_citizens')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
}