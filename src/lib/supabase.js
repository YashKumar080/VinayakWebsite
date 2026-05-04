import { createClient } from '@supabase/supabase-js';

// We fall back to hardcoded values provided by user if environment variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wnwmlaxcdepdeilsgiss.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indud21sYXhjZGVwZGVpbHNnaXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTQ4MDcsImV4cCI6MjA5MzQ3MDgwN30.7Y4SzV4mCCDeONXQ4ZXKByBTrRrToZuQHi1BldQxeUc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
