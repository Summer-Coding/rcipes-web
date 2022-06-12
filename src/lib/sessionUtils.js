/* eslint-disable no-unused-vars */
import { Session } from '@supabase/supabase-js';

export const isAdmin = (session) => {
  return userHasRole(session, 'admin');
};

export const userHasRole = (session, role) => {
  return (session?.user?.user_metadata?.roles ?? []).includes(role);
};
