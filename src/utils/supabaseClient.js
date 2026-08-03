import { createClient } from "@supabase/supabase-js";

//Replace with actual values from dashboard.
const SUPABASE_URL = "https://qcycgtcyqpdemfvjuoru.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjeWNndGN5cXBkZW1mdmp1b3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3MTk1NjksImV4cCI6MjEwMTI5NTU2OX0.AGiBysSkrDAJJLfGdW6yGSt3Ldi_IG7N2C4y_9ZnfdA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
//This acts as the bridge between React and the Supabase backend.

