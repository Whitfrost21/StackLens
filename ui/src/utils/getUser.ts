import { supabase } from "../lib/supabase";

export const getUser = async (token: string) => {
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
};
