import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/app/contexts/AuthContext";
import { Mail, ArrowLeft, CheckCircle, Copy, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resetUrl, setResetUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await forgotPassword(email);

    if (result.success) {
      setSuccess(true);
      if (result.resetUrl) {
        setResetUrl(result.resetUrl);
      }
    } else {
      setError(result.message || "Ошибка при отправке запроса");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    if (resetUrl) {
      navigator.clipboard.writeText(resetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Back link */}
          <Link
            to="/auth"
            className="inline-flex items-center text-gray-600 hover:text-[#FF6B35] mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к входу
          </Link>

          {!success ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-[#FF6B35]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Забыли пароль?
                </h2>
                <p className="text-gray-600">
                  Введите email, и мы отправим ссылку для сброса пароля
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                    <span>Отправка...</span>
                  ) : (
                    <span>Отправить ссылку для сброса</span>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Проверьте почту
              </h2>
              <p className="text-gray-600 mb-6">
                Если аккаунт с email <strong>{email}</strong> существует, мы отправили ссылку для сброса пароля.
              </p>

              {/* Demo: Show reset link directly */}
              {resetUrl && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                    <span className="mr-2">🔧</span>
                    Демо-режим: Ссылка для сброса
                  </p>
                  <p className="text-xs text-blue-700 mb-3">
                    В реальном приложении эта ссылка будет отправлена на email.
                  </p>
                  <div className="bg-white rounded border border-blue-200 p-2 break-all text-xs text-gray-700 mb-2">
                    {resetUrl}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors text-sm"
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Скопировано
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Копировать
                        </>
                      )}
                    </button>
                    <Link
                      to={resetUrl.replace('http://localhost:5173', '')}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-[#FF6B35] hover:bg-[#E55A2B] text-white rounded transition-colors text-sm"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Перейти
                    </Link>
                  </div>
                </div>
              )}

              <Link
                to="/auth"
                className="text-[#FF6B35] hover:underline"
              >
                Вернуться к входу
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
