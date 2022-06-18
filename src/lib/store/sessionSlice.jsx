import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient.ts';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  token: undefined,
  refreshToken: undefined,
  expiresIn: undefined,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state) => {
      const session = supabase.auth.session();
      if (session) {
        const { access_token, refresh_token, expires_in } = session;
        state.token = access_token;
        state.refreshToken = refresh_token;
        state.expiresIn = expires_in;
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }

      state.isLoading = false;
    },
  },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;
