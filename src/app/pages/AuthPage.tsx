import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/app/contexts/AuthContext";
import { GoogleAuthButton } from "@/app/components/GoogleAuthButton";
import {
  LogIn,
  UserPlus,
  Mail,
  Lock,
  User as UserIcon,
} from "lucide-react";
import { motion } from "motion/react";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(email, password);
        if (success) {
          // Get user from localStorage to check role
          const storedUser = localStorage.getItem("ketem_user");
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            navigate(userData.role === "admin" ? "/admin" : "/dashboard");
          } else {
            navigate("/dashboard");
          }
        } else {
          setError("Неверный email или пароль");
        }
      } else {
        if (!name.trim()) {
          setError("Введите имя");
          setLoading(false);
          return;
        }
        const success = await register(email, password, name);
        if (success) {
          navigate("/dashboard");
        } else {
          setError("Ошибка регистрации. Возможно, email уже используется.");
        }
      }
    } catch (err) {
      setError("Произошла ошибка. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = () => {
    const storedUser = localStorage.getItem("ketem_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      navigate(userData.role === "admin" ? "/admin" : "/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const handleGoogleError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? "Войти в аккаунт" : "Создать аккаунт"}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? "Добро пожаловать обратно!"
                : "Начните путь к образованию мечты"}
            </p>
          </div>

          {/* Google Sign In */}
          <div className="mb-6">
            <GoogleAuthButton
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">или</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Имя
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                    placeholder="Ваше имя"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Пароль
                </label>
                {isLogin && (
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#FF6B35] hover:underline"
                  >
                    Забыли пароль?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6B35] text-white py-3 rounded-lg hover:bg-[#E55A2B] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Загрузка...</span>
              ) : isLogin ? (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Войти</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Зарегистрироваться</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-[#FF6B35] hover:underline"
            >
              {isLogin
                ? "Нет аккаунта? Зарегистрироваться"
                : "Уже есть аккаунт? Войти"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
