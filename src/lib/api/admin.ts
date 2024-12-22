import { supabase } from '@/lib/supabase';

export async function isAdmin(userId: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return !!data;
}

export async function getAdmins() {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}