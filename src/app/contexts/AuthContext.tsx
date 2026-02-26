import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api, User as ApiUser } from "@/services/api";

interface User {
  id: number;
  email: string;
  role: "student" | "admin";
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (credential: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string, phone?: string, dateOfBirth?: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<{ success: boolean; resetUrl?: string; message?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const response = await api.getMe();
          if (response.success && response.data) {
            const userData: User = {
              id: response.data.id,
              email: response.data.email,
              name: response.data.name,
              role: response.data.role,
            };
            setUser(userData);
            localStorage.setItem("ketem_user", JSON.stringify(userData));
          } else {
            api.logout();
          }
        } catch {
          api.logout();
        }
      }
      setLoading(false);
    };

    // Also check localStorage for cached user data
    const storedUser = localStorage.getItem("ketem_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("ketem_user");
      }
    }

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.login(email, password);

      if (response.success && response.data) {
        const userData: User = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role,
        };
        setUser(userData);
        localStorage.setItem("ketem_user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const loginWithGoogle = async (credential: string): Promise<boolean> => {
    try {
      const response = await api.loginWithGoogle(credential);

      if (response.success && response.data) {
        const userData: User = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role,
        };
        setUser(userData);
        localStorage.setItem("ketem_user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Google login error:", error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone?: string,
    dateOfBirth?: string
  ): Promise<boolean> => {
    try {
      const response = await api.register(email, password, name, phone, dateOfBirth);

      if (response.success && response.data) {
        const userData: User = {
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          role: response.data.user.role,
        };
        setUser(userData);
        localStorage.setItem("ketem_user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Register error:", error);
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; resetUrl?: string; message?: string }> => {
    try {
      const response = await api.forgotPassword(email);

      if (response.success) {
        // For demo purposes, extract the reset URL from the demo field
        const demo = response.demo as { resetUrl?: string; userFound?: boolean } | undefined;
        return {
          success: true,
          resetUrl: demo?.resetUrl,
          message: response.message,
        };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error("Forgot password error:", error);
      return { success: false, message: "Ошибка при запросе сброса пароля" };
    }
  };

  const resetPassword = async (token: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await api.resetPassword(token, password);
      return { success: response.success, message: response.message };
    } catch (error) {
      console.error("Reset password error:", error);
      return { success: false, message: "Ошибка при сбросе пароля" };
    }
  };

  const logout = () => {
    setUser(null);
    api.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        logout,
        register,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
