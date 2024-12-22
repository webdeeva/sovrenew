import { execSync } from 'child_process';
import * as dotenv from 'dotenv';

dotenv.config();

try {
  // Generate types from Supabase
  execSync('npx supabase gen types typescript --project-id rysbmhfhnkjhmesrwqrs > src/lib/database.types.ts', {
    stdio: 'inherit',
    env: {
      ...process.env,
      SUPABASE_ACCESS_TOKEN: process.env.SUPABASE_ACCESS_TOKEN
    }
  });

  console.log('✅ Types generated successfully');
} catch (error) {
  console.error('❌ Failed to generate types:', error);
}