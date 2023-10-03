import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export const getGroups = async () => {
  const { data, error: groupError } = await supabase.from("groups").select("*");
  console.log(JSON.stringify(data));
  return data;
}