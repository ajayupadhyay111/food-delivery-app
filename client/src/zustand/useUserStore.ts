import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import type { UserLoginState, UserSignupState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
  fullname: string;
  email: string;
  contact: string;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  loading: boolean;
  isVerified: boolean;
  signup: (input: UserSignupState) => Promise<void>;
  login: (input: UserLoginState) => Promise<void>;
  verifyEmail: (verificationToken: string) => Promise<void>;
  checkAuthentication: () => Promise<boolean | undefined>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      loading: false,
      isVerified: false,
      signup: async (input: UserSignupState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            console.log(response.data);
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message);
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Something went wrong");
          }
        } finally {
          set({ loading: false });
        }
      },
      login: async (input: UserLoginState) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.data.success) {
            console.log(response.data);
            toast.success(response.data.message);
            set({
              user: response.data.user,
              isAuthenticated: true,
              isVerified: true,
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message);
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Something went wrong");
          }
        } finally {
          set({ loading: false });
        }
      },
      verifyEmail: async (verificationToken: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/verify-email`,
            { verificationToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ isVerified: true });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message);
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Something went wrong");
          }
        } finally {
          set({ loading: false });
        }
      },
      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const response = await axios.get(`${API_END_POINT}/check-auth`);
          if (response.data.success) {
            set({
              user: response.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message);
          } else if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error("Something went wrong");
          }
          set({ isAuthenticated: false });
          return false;
        } finally {
          set({ loading: false, isCheckingAuth: false });
        }
      },
      logout: async () => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}/logout`);
          if (response.data.success) {
            set({ laoding: false, isAuthenticated: false, user: null });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error.response?.data?.message);
          } else if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log("Something went wrong");
          }
          set({ loading: false });
        }
      },
      forgotPassword: async (email: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/forgot-password`,
            { email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.log(error.response?.data?.message);
          } else if (error instanceof Error) {
            console.log(error.message);
          } else {
            console.log("Something went wrong");
          }
          set({ loading: false });
        }
      },
      resetPassword: async (token: string, newPassword: string) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/reset-password/${token}`,
            { newPassword }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({ loading: false });
          }
        } catch (error: any) {
          console.log(error.response.data.message || error.message);
          set({ loading: false });
        }
      },
      updateProfile: async (input: any) => {
        try {
          set({ loading: false });
          const response = await axios.post(
            `${API_END_POINT}/profile/update`,
            input,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success) {
            toast.success(response.data.message);
            set({
              loading: false,
              user: response.data.user,
              isAuthenticated: true,
            });
          }
        } catch (error: any) {
          console.log(error.response?.data?.message || error.message);
          set({
            loading: false,
          });
        }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
