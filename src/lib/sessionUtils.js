/* eslint-disable no-unused-vars */
import { Session } from '@supabase/supabase-js';

export const isAdmin = (session) => {
  return userHasRole(session, 'ADMIN');
};

export const userHasRole = (session, role) => {
  return (session?.user?.user_metadata?.roles ?? [])
    .map((r) => r.toUpperCase())
    .includes(role.toUpperCase());
};
