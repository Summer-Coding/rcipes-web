import { createSlice } from '@reduxjs/toolkit';
import { supabase } from '../supabaseClient';

const initialState = {
  username: undefined,
  roles: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
      const userMetadata = supabase.auth.user()?.user_metadata;
      state.username = userMetadata?.username;
      state.roles = (userMetadata?.roles ?? []).map((role) =>
        role.toUpperCase(),
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
