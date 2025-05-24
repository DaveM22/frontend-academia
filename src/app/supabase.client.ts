import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xxxx.supabase.co'; // Tu URL
const SUPABASE_KEY = 'public-anon-key';          // Tu public key

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)