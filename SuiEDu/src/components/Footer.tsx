import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, ExternalLink, ArrowUp, Heart } from "lucide-react";

// Sui Bear Mini Logo
const SuiBearLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="55" r="35" fill="url(#footerBearGrad)" />
    <circle cx="25" cy="30" r="12" fill="url(#footerBearGrad)" />
    <circle cx="25" cy="30" r="7" fill="#4CC9F0" />
    <circle cx="75" cy="30" r="12" fill="url(#footerBearGrad)" />
    <circle cx="75" cy="30" r="7" fill="#4CC9F0" />
    <ellipse cx="50" cy="60" rx="18" ry="14" fill="#FFECD2" />
    <circle cx="38" cy="50" r="6" fill="#1E293B" />
    <circle cx="40" cy="48" r="2" fill="white" />
    <circle cx="62" cy="50" r="6" fill="#1E293B" />
    <circle cx="64" cy="48" r="2" fill="white" />
    <ellipse cx="50" cy="60" rx="5" ry="4" fill="#1E293B" />
    <path d="M43 67 Q50 73 57 67" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M50 35 C50 35 43 42 43 46 C43 49 46 52 50 52 C54 52 57 49 57 46 C57 42 50 35 50 35Z" fill="#4CC9F0" />
    <defs>
      <linearGradient id="footerBearGrad" x1="20" y1="20" x2="80" y2="90" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00A3FF" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);

// Social Icons
const TelegramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const footerLinks = {
  courses: [
    { label: "Lập trình Move", href: "/courses?category=move" },
    { label: "DeFi", href: "/courses?category=defi" },
    { label: "NFT & Gaming", href: "/courses?category=nft" },
    { label: "Tất cả khóa học", href: "/courses" },
  ],
  resources: [
    { label: "Tài liệu", href: "#" },
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Hỗ trợ", href: "#" },
  ],
  legal: [
    { label: "Điều khoản", href: "#" },
    { label: "Bảo mật", href: "#" },
    { label: "Cookie", href: "#" },
  ],
};

const socialLinks = [
  { icon: TelegramIcon, href: "https://t.me/suiacademy", label: "Telegram" },
  { icon: XIcon, href: "https://x.com/suiacademy", label: "X" },
  { icon: DiscordIcon, href: "https://discord.gg/suiacademy", label: "Discord" },
];

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to Top Button - Fixed position */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center transition-all"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="bg-slate-900 text-white pb-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />
        </div>

        {/* Main Footer */}
        <div className="relative max-w-6xl mx-auto px-6 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-6 group">
                <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
                  <SuiBearLogo className="w-12 h-12" />
                </motion.div>
                <div>
                  <span className="text-xl font-extrabold block">Sui Academy</span>
                  <span className="text-xs text-blue-400 font-bold">Learn. Build. Earn.</span>
                </div>
              </Link>
              <p className="text-slate-400 mb-6 leading-relaxed max-w-sm">
                Nền tảng học tập blockchain hàng đầu. Học lập trình Move, xây dựng dApp, và nhận chứng chỉ NFT! 🚀
              </p>

              {/* Contact */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>contact@suiacademy.io</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Hà Nội, Việt Nam</span>
                </div>
              </div>
            </div>

            {/* Courses Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                📚 Khóa học
              </h4>
              <ul className="space-y-3">
                {footerLinks.courses.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                📖 Tài nguyên
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                ⚖️ Pháp lý
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="border-t border-slate-800 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">
                  📬 Đăng ký nhận tin mới
                </h4>
                <p className="text-sm text-slate-400">
                  Cập nhật khóa học và tin tức mới nhất!
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 md:w-64 px-4 py-3 bg-slate-800 rounded-l-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700 border-r-0"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-r-xl flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Gửi</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500 flex items-center">
                © 2024 Sui Academy. Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> in Vietnam
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Powered by Sui */}
              <a
                href="https://sui.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-slate-500 hover:text-blue-400 transition-colors text-sm"
              >
                <span>Powered by</span>
                <span className="font-bold">Sui Network</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;