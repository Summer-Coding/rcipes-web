import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient';

const initialState = {
  session: {
    token: undefined,
    refreshToken: undefined,
    expiresIn: undefined,
  },
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state) => {
      const session = supabase.auth.session();
      state.session.token = session.access_token;
      state.session.refreshToken = session.refresh_token;
      state.session.expiresIn = session.expires_in;
    },
    refreshSession: async (state) => {
      const { data: session } = await supabase.auth.refreshSession();
      state.session.token = session.access_token;
      state.session.refreshToken = session.refresh_token;
      state.session.expiresIn = session.expires_in;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSession, refreshSession } = sessionSlice.actions;

export default sessionSlice.reducer;
