import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON, SUPABASE_URL } from "../utils/constants/env";

export const supabase = createClient(
  SUPABASE_URL as string,
  SUPABASE_ANON as string
);
