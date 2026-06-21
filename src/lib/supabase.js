import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qayclaepxapjwqfwpnzm.supabase.co';
const SUPABASE_API_KEY = process.env.REACT_APP_SUPABASE_API_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  auth: {
    // Recovery credentials are handled explicitly by the reset-password route.
    detectSessionInUrl: false,
  },
});

