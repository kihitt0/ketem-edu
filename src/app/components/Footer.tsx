import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Send, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import logo from '@/assets/5d1f3f5386e6b1c115764a48cc9f62478cd86a60.png';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-[#1a1a1a] via-[#2C2C2C] to-[#1a1a1a] text-gray-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAyIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="KETEM edu" className="h-12 w-auto" />
              <span className="font-bold text-2xl bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                KETEM edu
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Ваш путь к образованию мирового класса начинается здесь. Мы создаем будущих лидеров.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Работаем 24/7</span>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Навигация
              <div className="ml-3 h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Главная' },
                { to: '/about', label: 'О нас' },
                { to: '/goals', label: 'Мой путь' },
                { to: '/social', label: 'Соц. сети' },
                { to: '/psychology', label: 'Псих. поддержка' }
              ].map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link 
                    to={link.to} 
                    className="group flex items-center text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    <span>{link.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Контакты
              <div className="ml-3 h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </h3>
            <ul className="space-y-4">
              <li className="group">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Mail className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <a href="mailto:info@ketemedu.com" className="text-gray-300 hover:text-orange-400 transition-colors">
                      info@ketemedu.com
                    </a>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <Phone className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Телефон</p>
                    <a href="tel:+78001234567" className="text-gray-300 hover:text-orange-400 transition-colors">
                      +7 (800) 123-45-67
                    </a>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Адрес</p>
                    <p className="text-gray-300">
                      Астана, проспект<br />Улы Дала 39
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Social Media & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              Соц. сети
              <div className="ml-3 h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent" />
            </h3>
            <div className="flex space-x-3 mb-8">
              {[
                { icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
                { icon: <MessageCircle className="w-5 h-5" />, label: 'WhatsApp' },
                { icon: <Send className="w-5 h-5" />, label: 'Telegram' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] hover:from-orange-500 hover:to-amber-500 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-white font-semibold mb-2">Начните сейчас</p>
              <p className="text-sm text-gray-400 mb-4">Получите бесплатную консультацию</p>
              <Link
                to="/login"
                className="block w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-center rounded-lg transition-all duration-300 font-semibold shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30"
              >
                Записаться
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-gray-500"
            >
              &copy; {currentYear} KETEM edu. Все права защищены.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6 text-sm text-gray-500"
            >
              <a href="#" className="hover:text-orange-400 transition-colors">
                Политика конфиденциальности
              </a>
              <span className="text-gray-700">•</span>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Условия использования
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};
