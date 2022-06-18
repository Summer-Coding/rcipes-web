/* eslint-disable no-unused-vars */
import { Session } from '@supabase/supabase-js';

export const isAdmin = (user) => {
  return userHasRole(user, 'ADMIN');
};

export const userHasRole = (user, role) => {
  return (user?.roles ?? []).includes(role.toUpperCase());
};
