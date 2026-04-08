import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `${USERS_URL}/verify/${token}`,
        method: 'GET',
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgotpassword`,
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `${USERS_URL}/resetpassword/${token}`,
        method: 'PUT',
        body: { password },
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useRegisterMutation, 
  useProfileMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = usersApiSlice;
