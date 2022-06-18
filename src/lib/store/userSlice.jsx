import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient.ts';

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  id: undefined,
  username: undefined,
  roles: undefined,
  email: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
      const user = supabase.auth.user();
      if (user) {
        const {
          id,
          user_metadata: { username, roles },
          email,
        } = user;

        state.id = id;
        state.username = username;
        state.email = email;
        state.roles = (roles ?? []).map((role) => role.toUpperCase());
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }

      state.isLoading = false;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
