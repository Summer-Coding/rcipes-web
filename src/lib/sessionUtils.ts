import { Session } from '@supabase/supabase-js';

export const isAdmin = (session: Session) => {
  return userHasRole(session, 'admin');
};

export const userHasRole = (session: Session, role: string) => {
  return (session?.user?.user_metadata?.roles ?? []).includes(role);
};
