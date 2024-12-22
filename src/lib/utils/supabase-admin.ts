import { createClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';

// Create a Supabase client with admin privileges
const supabaseAdmin = createClient<Database>(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
);

export async function createAdminUser(email: string, password: string) {
  try {
    // Create user with email/password
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });

    if (authError) throw authError;

    // Create admin record
    const { error: adminError } = await supabaseAdmin
      .from('admins')
      .insert([{
        username: email.split('@')[0],
        user_id: authUser.user.id
      }]);

    if (adminError) throw adminError;

    return { success: true };
  } catch (error) {
    console.error('Error creating admin:', error);
    return { success: false, error };
  }
}