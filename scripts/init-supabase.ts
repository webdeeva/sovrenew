import { createAdminUser } from '../src/lib/utils/supabase-admin';

async function initSupabase() {
  try {
    // Create initial admin user
    const result = await createAdminUser('admin@sovstates.com', 'SovStates2024!');
    
    if (result.success) {
      console.log('✅ Admin user created successfully');
    } else {
      console.error('❌ Failed to create admin user:', result.error);
    }
  } catch (error) {
    console.error('❌ Initialization failed:', error);
  }
}

initSupabase();