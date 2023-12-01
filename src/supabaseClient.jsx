import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qeuyljuyocsqnfvlgpfn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldXlsanV5b2NzcW5mdmxncGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEzMTQyMjksImV4cCI6MjAxNjg5MDIyOX0.UDhYQ0XvCEptJFWVJUG_FsPlpILLxU_JLpVrDMswsBE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

