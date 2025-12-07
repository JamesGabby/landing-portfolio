import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  project_type?: string;
  budget?: string;
  timeline?: string;
  message: string;
  created_at?: string;
  status?: "new" | "read" | "replied" | "archived";
  source?: string;
}

export interface NewsletterSubscription {
  id?: string;
  email: string;
  created_at?: string;
  status?: "active" | "unsubscribed";
}